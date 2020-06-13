import { obfuscateDocument, WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";
import { flatten } from "../PrivacyFilter";
import { RecommendationsTable } from "../RecommendationsTable";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";

interface RecommendationsDisplayProps {
  document?: WrappedDocument;
  fileName?: string;
}

export const RecommendationsDisplay: React.FunctionComponent<RecommendationsDisplayProps> = ({
  document,
  fileName,
}) => {
  if (!document) {
    return (
      <>
        ✅ Looks good! It seems like your OpenAttestation file doesn't contain any potentially sensitive information.
        You might still want to review your OpenAttestation contents below though.
      </>
    );
  } else {
    const data = flatten(document.data, "");
    const sensitiveFields = sensitiveFieldsFinder(data);
    console.log(sensitiveFields);

    const download = () => {
      const redacted = obfuscateDocument(document, sensitiveFields);
      const blob = new Blob([JSON.stringify(redacted, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, fileName);
    };
    return (
      <div>
        Recommendations 🔍 Looks like we found something... We detected some fields that may potentially reveal
        sensitive information if you were to share this OpenAttestation file publicly.
        <RecommendationsTable data={sensitiveFields} />
      </div>
    );
  }
};

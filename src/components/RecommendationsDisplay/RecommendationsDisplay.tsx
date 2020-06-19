import React from "react";
import { RecommendationsTable } from "../RecommendationsTable";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";
import { flatten } from "../shared";

interface RecommendationsDisplayProps {
  document?: any;
  fileName?: string;
}

export const RecommendationsDisplay: React.FunctionComponent<RecommendationsDisplayProps> = ({ document }) => {
  if (!document) {
    return (
      <>
        <span role="img" aria-label="valid">
          ✅
        </span>{" "}
        Looks good! It seems like your OpenAttestation file doesn't contain any potentially sensitive information. You
        might still want to review your OpenAttestation contents below though.
      </>
    );
  } else {
    const data = flatten(document, "");
    const sensitiveFields = sensitiveFieldsFinder(data);
    console.log(sensitiveFields);

    // const download = () => {
    //   const redacted = obfuscateDocument(document, sensitiveFields);
    //   const blob = new Blob([JSON.stringify(redacted, null, 2)], {
    //     type: "application/json",
    //   });
    //   saveAs(blob, fileName);
    // };
    return (
      <div>
        Recommendations{" "}
        <span role="img" aria-label="magnifying glass">
          🔍
        </span>{" "}
        Looks like we found something... We detected some fields that may potentially reveal sensitive information if
        you were to share this OpenAttestation file publicly.
        <RecommendationsTable data={sensitiveFields} />
      </div>
    );
  }
};

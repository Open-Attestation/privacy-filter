import { WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";
import { Data } from "../PrivacyFilter";
import { RecommendationsTable } from "../RecommendationsTable";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";

interface RecommendationsDisplayProps {
  document?: WrappedDocument;
  fileName?: string;
}

const flatten = (value: any, path: string): Data[] => {
  if (Array.isArray(value)) {
    return value.flatMap((v, index) => flatten(v, `${path}[${index}]`));
  }
  // Since null values are allowed but typeof null === "object", the "&& value" is used to skip this
  if (typeof value === "object" && value) {
    return Object.keys(value).flatMap((key) => flatten(value[key], path ? `${path}.${key}` : key));
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
    return [{ path: path, value: value }];
  }
  throw new Error(`Unexpected value '${value}' in '${path}'`);
};

export const RecommendationsDisplay: React.FunctionComponent<RecommendationsDisplayProps> = ({ document }) => {
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

    // const download = () => {
    //   const redacted = obfuscateDocument(document, sensitiveFields);
    //   const blob = new Blob([JSON.stringify(redacted, null, 2)], {
    //     type: "application/json",
    //   });
    //   saveAs(blob, fileName);
    // };
    return (
      <div>
        Recommendations 🔍 Looks like we found something... We detected some fields that may potentially reveal
        sensitive information if you were to share this OpenAttestation file publicly.
        <RecommendationsTable data={sensitiveFields} />
      </div>
    );
  }
};

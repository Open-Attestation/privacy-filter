import React from "react";
import { RecommendationsTable } from "../RecommendationsTable";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";
import { flatten } from "../shared";

interface RecommendationsDisplayProps {
  document?: any;
  fileName?: string;
}

export const RecommendationsDisplay: React.FunctionComponent<RecommendationsDisplayProps> = ({ document }) => {
  if (Object.keys(document).length === 0) {
    return <>No document found.</>;
  } else {
    const data = flatten(document, "");
    const sensitiveFields = sensitiveFieldsFinder(data);

    // const download = () => {
    //   const redacted = obfuscateDocument(document, sensitiveFields);
    //   const blob = new Blob([JSON.stringify(redacted, null, 2)], {
    //     type: "application/json",
    //   });
    //   saveAs(blob, fileName);
    // };

    if (sensitiveFields.length) {
      return (
        <div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-2" role="alert">
            <p className="font-bold">
              <span role="img" aria-label="warning sign">
                ⚠️
              </span>{" "}
              Sensitive information detected
            </p>
          </div>
          We found some fields below that may contain sensitive information. Redact this data in your OpenAttestation
          file if you would like to keep it private when sharing your OpenAttestation file publicly.
          <RecommendationsTable data={sensitiveFields} />
        </div>
      );
    } else {
      return (
        <>
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-2" role="alert">
            <p className="font-bold">
              <span role="img" aria-label="valid">
                ✅
              </span>{" "}
              No sensitive information detected
            </p>
          </div>
          Seems like your OpenAttestation file doesn't contain any potentially sensitive information. You might still
          want to review your OpenAttestation contents below though.
        </>
      );
    }
  }
};

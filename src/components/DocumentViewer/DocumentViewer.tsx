import { obfuscateDocument, WrappedDocument } from "@govtechsg/open-attestation";
import { saveAs } from "file-saver";
import React from "react";
import { flatten } from "../PrivacyFilter";
import { RecommendationsDisplay } from "../RecommendationsDisplay";
import { sensitiveFieldsFinder } from "../SensitiveFieldsFinder";

interface DocumentViewerProps {
  document?: WrappedDocument;
  fileName?: string;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document, fileName }) => {
  if (document) {
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
      <>
        <RecommendationsDisplay data={sensitiveFields} />
        <table>
          <thead>
            <tr>
              <th>Path</th>
              <th>Value</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.path}>
                  <td>{row.path}</td>
                  <td>
                    <code>{row.value}</code>
                  </td>
                  <td>Remove button</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  return <></>;
};

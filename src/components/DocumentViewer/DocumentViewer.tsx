import { WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";
import { flatten } from "../PrivacyFilter";

interface DocumentViewerProps {
  document?: WrappedDocument;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document }) => {
  if (document) {
    const data = flatten(document.data, "");
    return (
      <>
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

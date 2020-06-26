import React from "react";
import { flatten } from "../shared";

interface DocumentViewerProps {
  document?: any;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document }) => {
  if (Object.keys(document).length) {
    const data = flatten(document, "");
    return (
      <>
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="px-4 py-2">Path</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.path}>
                  <td className="border px-4 py-2">
                    <pre>{row.path}</pre>
                  </td>
                  <td className="border px-4 py-2">
                    <code>{row.value}</code>
                  </td>
                  <td className="border px-4 py-2">Remove button</td>
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

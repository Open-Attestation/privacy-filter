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
        <div className="bg-gray-300 font-bold rounded-t px-4 py-2">Document Viewer</div>
        <div className="border border-t-0 border-gray-200 rounded-b px-4 py-3">

          <table className="table-auto">
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
                    <td className="border px-4 py-2">{row.path?.replace(/\./g, " > ")}</td>
                    <td className="border px-4 py-2 break-words">
                      <p className="break-words">{row.value}</p>
                    </td>
                    <td className="border px-4 py-2">Remove button</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return <></>;
};

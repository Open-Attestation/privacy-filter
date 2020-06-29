import React from "react";
import { flatten } from "../shared";

interface DocumentViewerProps {
  document?: any;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document }) => {
  // const textEllipsis = {
  //   whiteSpace: "nowrap",
  //   textOverflow: "ellipsis",
  //   overflow: "hidden",
  //   maxWidth: "100px",
  // } as React.CSSProperties;

  const tableFixed = {
    tableLayout: "fixed",
    width: "100%",
  } as React.CSSProperties;

  if (Object.keys(document).length) {
    const data = flatten(document, "");
    return (
      <>
        <div className="bg-gray-300 font-bold rounded-t px-4 py-2">Document Viewer</div>
        <div className="border border-t-0 border-gray-200 rounded-b px-4 py-3 overflow-auto">
          <table style={tableFixed}>
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
                      <span className="break-words">{row.path}</span>
                    </td>
                    <td className="border px-4 py-2 break-words">
                      <pre className="truncate">{row.value}</pre>
                    </td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Redact
                      </button>
                    </td>
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

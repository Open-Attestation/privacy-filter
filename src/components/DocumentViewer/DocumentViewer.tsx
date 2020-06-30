import React from "react";
import { RecommendationsDisplay } from "../RecommendationsDisplay";
import { findAllSensitiveFields } from "../SensitiveFieldsFinder";
import { flatten } from "../shared";

interface DocumentViewerProps {
  document?: any;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document }) => {
  // const download = () => {
  //   const redacted = obfuscateDocument(document, sensitiveFields);
  //   const blob = new Blob([JSON.stringify(redacted, null, 2)], {
  //     type: "application/json",
  //   });
  //   saveAs(blob, fileName);
  // };
  if (Object.keys(document).length) {
    const data = flatten(document, "");
    const sensitiveFields = findAllSensitiveFields(data);
    const hasSensitiveFields = sensitiveFields.length ? true : false;

    return (
      <>
        <div className="bg-gray-300 font-bold rounded-t px-4 py-2">Document Viewer</div>
        <div className="border border-t-0 border-gray-200 rounded-b px-4 py-3 overflow-auto">
          <RecommendationsDisplay hasSensitiveFields={hasSensitiveFields} />
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="md:w-3/12 px-2 py-2">Path</th>
                <th className="md:w-7/12 px-2 py-2">Value</th>
                <th className="md:w-2/12 px-2 py-2" />
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                if (sensitiveFields.includes(row)) {
                  return (
                    <tr key={row.path}>
                      <td className="border px-2 py-2">
                        <span className="break-words">
                          <mark className="line-through">{row.path}</mark>
                        </span>
                      </td>
                      <td className="border px-2 py-2">
                        <mark className="line-through">{row.value}</mark>
                      </td>
                      <td className="border px-2 py-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Redacted
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={row.path}>
                      <td className="border px-2 py-2">
                        <span className="break-words">{row.path}</span>
                      </td>
                      <td className="border px-2 py-2">
                        <pre className="truncate">{row.value}</pre>
                      </td>
                      <td className="border px-2 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Redact
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return <></>;
};

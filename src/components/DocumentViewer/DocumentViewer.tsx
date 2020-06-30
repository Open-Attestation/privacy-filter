import React, { useState } from "react";
import { RecommendationsDisplay } from "../RecommendationsDisplay";
import { findAllSensitiveFields } from "../SensitiveFieldsFinder";
import { flatten } from "../shared";

interface DocumentViewerProps {
  document?: any;
  fileName?: string;
}

interface ButtonProps {
  path: string;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ document }) => {
  // const download = () => {
  //   const redacted = obfuscateDocument(document, sensitiveFields);
  //   const blob = new Blob([JSON.stringify(redacted, null, 2)], {
  //     type: "application/json",
  //   });
  //   saveAs(blob, fileName);
  // };

  const [redactionList, setRedactionList] = useState<string[]>([]);
  const toggleChoice = (path: string): void => {
    const _redactionList: string[] = [...redactionList];
    console.log(path);

    const index = _redactionList.indexOf(path, 0);
    if (index > -1) {
      _redactionList.splice(index, 1);
    } else {
      _redactionList.push(path);
    }
    // console.log(_redactionList);
    setRedactionList(_redactionList);
    console.log(redactionList);
  };
  const RedactButton: React.FunctionComponent<ButtonProps> = ({ path }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => toggleChoice(path)}
      >
        Redact
      </button>
    );
  };
  const UndoRedactButton: React.FunctionComponent<ButtonProps> = ({ path }) => {
    return (
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => toggleChoice(path)}
      >
        Undo Redact
      </button>
    );
  };
  if (Object.keys(document).length) {
    const data = flatten(document, "");
    const sensitiveFields = findAllSensitiveFields(data);
    const hasSensitiveFields = sensitiveFields.length > 0;

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
                // if (sensitiveFields.includes(row)) {
                //   toggleChoice(row.path as string);
                // }

                // <mark className="line-through">{row.path}</mark>

                const button = redactionList.includes(row.path as string) ? (
                  <UndoRedactButton path={row.path as string} />
                ) : (
                  <RedactButton path={row.path as string} />
                );

                return (
                  <tr key={row.path}>
                    <td className="border px-2 py-2">
                      <p className="break-words">{row.path}</p>
                    </td>
                    <td className="border px-2 py-2">
                      <p className="truncate">{row.value}</p>
                    </td>
                    <td className="border px-2 py-2">{button}</td>
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

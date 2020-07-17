import { obfuscateDocument, getData } from "@govtechsg/open-attestation";
import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { RecommendationsDisplay } from "../RecommendationsDisplay";
import { flatten } from "../shared";

interface DocumentViewerProps {
  wrappedDocument?: any;
  fileName?: string;
  sensitiveFields: string[];
  redactionList: string[];
  setRedactionList: (redactionList: string[]) => void;
}

interface ButtonProps {
  path: string;
}

export const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({
  wrappedDocument,
  fileName,
  sensitiveFields,
  redactionList,
  setRedactionList,
}) => {
  const toggleChoice = (path: string): void => {
    const _redactionList: string[] = [...redactionList];
    const index = _redactionList.indexOf(path, 0);
    if (index > -1) {
      _redactionList.splice(index, 1);
    } else {
      _redactionList.push(path);
    }
    setRedactionList(_redactionList);
  };

  useEffect(() => {
    console.log("In DocumentViewer.tsx", redactionList);
  }, [redactionList]);

  const download = (): void => {
    const redacted = obfuscateDocument(wrappedDocument, redactionList);
    console.log(redactionList, redacted);
    const blob = new Blob([JSON.stringify(redacted, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, fileName);
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
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => toggleChoice(path)}
      >
        Undo
      </button>
    );
  };
  if (Object.keys(wrappedDocument).length) {
    const data = flatten(getData(wrappedDocument), "");
    return (
      <>
        <div className="bg-gray-300 font-bold rounded-t px-4 py-2">Document Viewer</div>
        <div className="border border-t-0 border-gray-200 rounded-b px-4 py-3 overflow-auto">
          <RecommendationsDisplay sensitiveFields={sensitiveFields} />
          <hr className="my-4" />
          <p className="mb-2">We recommend you to still check through the data.</p>
          <table className="table-fixed w-full mb-2">
            <thead>
              <tr>
                <th className="md:w-3/12 px-2 py-2">Path</th>
                <th className="md:w-7/12 px-2 py-2">Value</th>
                <th className="md:w-2/12 px-2 py-2" />
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                let button, path, value;
                if (redactionList.includes(row.path as string)) {
                  button = <UndoRedactButton path={row.path as string} />;
                  path = <p className="line-through break-words mark">{row.path}</p>;
                  value = <p className="line-through truncate mark">{row.value}</p>;
                } else {
                  button = <RedactButton path={row.path as string} />;
                  path = <p className="break-words">{row.path}</p>;
                  value = <p className="truncate">{row.value}</p>;
                }

                return (
                  <tr key={row.path}>
                    <td className="border px-2 py-2">{path}</td>
                    <td className="border px-2 py-2">{value}</td>
                    <td className="border px-2 py-2">{button}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => download()}
          >
            Redact
          </button>
        </div>
      </>
    );
  }
  return <></>;
};

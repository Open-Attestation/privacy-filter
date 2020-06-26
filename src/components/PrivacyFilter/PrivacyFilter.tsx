import { getData, WrappedDocument } from "@govtechsg/open-attestation";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentViewer } from "../DocumentViewer";
import { RecommendationsDisplay } from "../RecommendationsDisplay";

export const PrivacyFilter: React.FunctionComponent = () => {
  const [document, setDocument] = useState<WrappedDocument>();
  const [fileName, setFileName] = useState<string>();

  const rawDocument = document ? getData(document) : {};

  const selectFilesButton = {
    display: "flex",
    flexDirection: "row",
    padding: "12px 20px",
    background: "#459EDB",
    borderRadius: "4px",
    color: "white",
  } as React.CSSProperties;
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#555555",
    outline: "none",
    transition: "border .24s ease-in-out",
  } as React.CSSProperties;
  const activeStyle = {
    borderColor: "#2196f3",
  } as React.CSSProperties;
  const acceptStyle = {
    borderColor: "#00e676",
  } as React.CSSProperties;
  const rejectStyle = {
    borderColor: "#ff1744",
  } as React.CSSProperties;
  const onDropAccepted = (files: File[]): void => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      // Event handlers
      reader.onabort = () => console.log("File reading was aborted.");
      reader.onerror = () => console.log("File reading has failed.");
      reader.onloadend = () => {
        const contents = reader.result as string; // Need to typecast even though we readAsText, otherwise JSON parse will throw an error
        setDocument(JSON.parse(contents));
        setFileName(file.name);
      };

      reader.readAsText(file);
    });
  };
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    multiple: false,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [baseStyle, isDragActive, activeStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]
  );

  // TODO: Change this to follow tradetrust.io's dropzone
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <div {...getRootProps({ style })} className="flex flex-col">
            <input {...getInputProps()} />
            <div className="text-gray-700 text-center px-4 py-2 m-4">Drag and drop any OpenAttestation file here</div>
            <div className="text-gray-700 text-center">or</div>
            <div className="text-gray-700 text-center m-4">
              <div style={selectFilesButton}>Select file</div>
            </div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div role="alert">
            <div className="bg-gray-200 font-bold rounded-t px-4 py-2">Recommendations</div>
            <div className="border border-t-0 border-gray-200 rounded-b px-4 py-3">
              <RecommendationsDisplay document={rawDocument} fileName={fileName} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 p-2">
          <DocumentViewer document={rawDocument} />
        </div>
      </div>
    </>
  );
};

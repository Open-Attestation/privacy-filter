import { WrappedDocument } from "@govtechsg/open-attestation";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentViewer } from "../DocumentViewer";

export const PrivacyFilter: React.FunctionComponent = () => {
  const [document, setDocument] = useState<WrappedDocument>();
  const [fileName, setFileName] = useState<string>();
  const [redactionList, setRedactionList] = useState<string[]>([]);

  const handleRedactionList = (redactionList: string[]): void => {
    setRedactionList(redactionList);
  };

  const rawDocument = document ? document : {};

  const baseStyle: React.CSSProperties = {
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
  };
  const activeStyle: React.CSSProperties = {
    borderColor: "#2196f3",
  };
  const acceptStyle: React.CSSProperties = {
    borderColor: "#00e676",
  };
  const rejectStyle: React.CSSProperties = {
    borderColor: "#ff1744",
  };
  const onDropAccepted = (files: File[]): void => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      // Event handlers
      reader.onabort = () => console.log("File reading was aborted.");
      reader.onerror = () => console.log("File reading has failed.");
      reader.onloadend = () => {
        // Reset redaction list
        setRedactionList([]);
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
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="col-span-2">
          <div {...getRootProps({ style })} className="flex flex-col">
            <input {...getInputProps()} />
            <div className="text-gray-700 text-center px-4 py-2 m-4">Drag and drop any OpenAttestation file here</div>
            <div className="text-gray-700 text-center">or</div>
            <div className="text-gray-700 text-center m-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select file
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <DocumentViewer
            document={rawDocument}
            fileName={fileName}
            redactionList={redactionList}
            setRedactionList={handleRedactionList}
          />
        </div>
      </div>
    </>
  );
};

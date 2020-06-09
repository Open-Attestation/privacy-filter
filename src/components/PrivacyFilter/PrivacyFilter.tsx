import { WrappedDocument } from "@govtechsg/open-attestation";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentViewer } from "../DocumentViewer";
import { RecommendationsTable } from "../RecommendationsTable";

export const PrivacyFilter: React.FunctionComponent = () => {
  const [document, setDocument] = useState<WrappedDocument>();
  const [fileName, setFileName] = useState<string>();

  const selectFilesButton = {
    display: "flex",
    flexDirection: "row",
    padding: "12px 20px",
    position: "absolute",
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
  };
  const acceptStyle = {
    borderColor: "#00e676",
  };
  const rejectStyle = {
    borderColor: "#ff1744",
  };
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

  return (
    // TODO: Change this to follow tradetrust.io's dropzone
    <>
      <div {...getRootProps({ style })} className="mb-4 p-5">
        <input {...getInputProps()} />
        Drag and drop any OpenAttestation file here or
        <div className="row">
          <div style={selectFilesButton}>Select file</div>
        </div>
      </div>

      <DocumentViewer document={document} fileName={fileName} />
    </>
  );
};

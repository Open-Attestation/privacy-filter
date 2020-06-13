import { WrappedDocument } from "@govtechsg/open-attestation";
import { includes, mapValues, map, identity } from "lodash";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import isUUID from "validator/lib/isUUID";
import { DocumentViewer } from "../DocumentViewer";
import { RecommendationsDisplay } from "../RecommendationsDisplay";

export interface Data {
  path?: string;
  value?: string;
}

export const flatten = (value: any, path: string): Data[] => {
  if (Array.isArray(value)) {
    return value.flatMap((v, index) => flatten(v, `${path}[${index}]`));
  }
  // Since null values are allowed but typeof null === "object", the "&& value" is used to skip this
  if (typeof value === "object" && value) {
    return Object.keys(value).flatMap((key) => flatten(value[key], path ? `${path}.${key}` : key));
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
    return [{ path: path, value: value }];
  }
  throw new Error(`Unexpected value '${value}' in '${path}'`);
};

const UUIDV4_LENGTH = 37;
const PRIMITIVE_TYPES = ["string", "number", "boolean", "undefined"];

/* eslint-disable no-use-before-define */
/**
 * Curried function that takes (iteratee)(value),
 * if value is a collection then recurse into it
 * otherwise apply `iteratee` on the primitive value
 */
const recursivelyApply = (iteratee: (arg: any) => any) => (value: any) => {
  if (includes(PRIMITIVE_TYPES, typeof value) || value === null) {
    return iteratee(value);
  }
  return deepMap(value, iteratee); // eslint-disable-line @typescript-eslint/no-use-before-define
};

/**
 * Applies `iteratee` to all fields in objects, goes into arrays as well.
 * Refer to test for example
 */
export const deepMap = (collection: any, iteratee: (arg: any) => any = identity): any => {
  if (collection instanceof Array) {
    return map(collection, recursivelyApply(iteratee));
  }
  if (typeof collection === "object") {
    return mapValues(collection, recursivelyApply(iteratee));
  }
  return collection;
};

const startsWithUuidV4 = (input: any) => {
  if (input && typeof input === "string") {
    const elements = input.split(":");
    return isUUID(elements[0], 4);
  }
  return false;
};
/**
 * Value salted string in the format "salt:type:value", example: "ee7f3323-1634-4dea-8c12-f0bb83aff874:number:5"
 * Returns an appropriately typed value when given a salted string with type annotation
 */
export function unsalt(value: string) {
  if (startsWithUuidV4(value)) {
    const untypedValue = value.substring(UUIDV4_LENGTH).trim();
    return typedStringToPrimitive(untypedValue);
  }
  return value;
}

export const unsaltData = (data: any) => deepMap(data, unsalt);

/**
 * Returns an appropriately typed value given a string with type annotations, e.g: "number:5"
 */
export function typedStringToPrimitive(input: string) {
  const [type, ...valueArray] = input.split(":");
  const value = valueArray.join(":"); // just in case there are colons in the value

  switch (type) {
    case "number":
      return Number(value);
    case "string":
      return String(value);
    case "boolean":
      return value === "true";
    case "null":
      return null;
    case "undefined":
      return undefined;
    default:
      throw new Error(`Parsing error, type annotation not found in string: ${input}`);
  }
}

export const PrivacyFilter: React.FunctionComponent = () => {
  const [document, setDocument] = useState<WrappedDocument>();
  const [fileName, setFileName] = useState<string>();

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
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <div {...getRootProps({ style })} className="flex flex-col">
            <input {...getInputProps()} />
            <div className="text-gray-700 text-center px-4 py-2 m-4">Drag and drop any OpenAttestation file here</div>
            <div className="text-gray-700 text-center">or</div>
            <div className="text-gray-700 text-center m-4">
              <div style={selectFilesButton}>Select file</div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <RecommendationsDisplay document={unsaltData(document)} fileName={fileName} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <DocumentViewer document={unsaltData(document)} />
      </div>
    </>
  );
};

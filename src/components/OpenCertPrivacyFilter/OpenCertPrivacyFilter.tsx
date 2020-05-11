import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentTreeView } from '../DocumentTreeView';


export const OpenCertPrivacyFilter = () => {
  const [json, setJson] = useState()
  const [fileName, setFileName] = useState()

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#555555',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  } as React.CSSProperties;
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  const onDropAccepted = (files) => {
    files.forEach(file => {
      const reader = new FileReader()

      // Event handlers
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onloadend = () => {
        const contents = reader.result as string // Need to typecast even though we readAsText(), otherwise JSON parse will throw an error...
        setJson(JSON.parse(contents))
        setFileName(file.name.split('.')[0])
      }

      // Actually reading it
      reader.readAsText(file)
    });
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDropAccepted, multiple: false })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <>
      <div {...getRootProps({style})} className="mb-4 p-5">
        <input {...getInputProps()} />
        Drag and drop your .opencert file here, or click to select the file.
      </div>

      <DocumentTreeView document={json} fileName={fileName} />
    </>
  )
}
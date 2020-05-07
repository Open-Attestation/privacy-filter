import React from 'react';
import Dropzone from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

// Handle on drop event
const onDrop = (files) => {
  files.forEach(file => {
    const reader = new FileReader()

    // Event handlers
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onloadend = () => {
      // Do whatever you want with the file contents
      const contents = reader.result as string // Need to typecast even though we readAsText(), otherwise JSON parse will throw an error...
      const json = JSON.parse(contents)
      console.log(json)
    }

    // Actually reading it
    reader.readAsText(file)
  });
}

export const DocumentDropzone = () => {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
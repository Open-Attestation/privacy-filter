import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import JSONTree from 'react-json-tree';

function valueRenderer(raw) {
  return (
    <span>
      {raw} <Button variant="danger" size="sm">Redact</Button>
    </span>
  )
}

function redactValue(path) {
  return true
}

export const DocumentTreeView = (props) => {
  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  };
  console.log(props)

  if (props.document) {
    const data = props.document.data;

    return (
      <Card>
        <Card.Header>OpenCerts Viewer</Card.Header>
        <Card.Body>
          <Card.Text>
            <JSONTree
              data={data}
              theme={theme}
              invertTheme={true}
              valueRenderer={(raw) => valueRenderer(raw)} />
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  else {
    return (
      <Card>
        <Card.Header>OpenCerts Viewer</Card.Header>
        <Card.Body>
          <Card.Text>
            No document found.
        </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}
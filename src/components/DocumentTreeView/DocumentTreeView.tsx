import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import JSONTree from 'react-json-tree';
import OpenCert from '@govtechsg/open-certificate';

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

  if (props.document) {
    const document = props.document;
    const data = document.data;


    const DisplayRecommendations = () => {

      if (!data) {
        return (
          <></>
        )
      }

      const recipient = ['nric', 'email', 'email_address', 'phone', 'phone_number']

      const detectedFields = [] as any

      const RemovalList = () => {
        return (
          <></>
        )
      }

      const accessor = (path, obj) => {
        path.split('.').reduce(function(o, k) {
          return o[k]
        }, obj)
      }

      const RecommendationsTable = (props) => {
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </Table>
        )
      }

      recipient.forEach(function (field) {
        if (field in data.recipient) {
          console.log("recipient.%s exists", field)
          detectedFields.push("recipient." + field)
          accessor("recipient." + field, data)
        }
      })

      if (detectedFields.length) {
        console.log(detectedFields)
        return (
          <Alert variant="warning">
            <Alert.Heading>
              🔍 Hold up
            </Alert.Heading>
            <p>
              We detected some fields that may potentially reveal some sensitive info if you were to share this OpenCert file.
              {detectedFields}
            </p>
            <RemovalList></RemovalList>
            <hr />
            <p className="mb-0">
              Accept recommendations and remove ...
            </p>
          </Alert>
        )
      }
      else {
        return (
          <></>
        )
      }
    }

    return (
      <Card>
        <Card.Header>OpenCerts Viewer</Card.Header>
        <Card.Body>
          <DisplayRecommendations />
          <JSONTree
            data={data}
            theme={theme}
            invertTheme={true}
            valueRenderer={(raw) => valueRenderer(raw)}
            shouldExpandNode={() => false}
            hideRoot />
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
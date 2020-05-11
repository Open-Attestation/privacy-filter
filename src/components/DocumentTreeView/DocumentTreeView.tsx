import React, { useState } from 'react';
import * as _ from 'lodash'
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { obfuscateDocument } from '@govtechsg/open-attestation';
import { saveAs } from 'file-saver';
import ReactJson from 'react-json-view';

const RecommendationsTable = (props) => {
  const list = _.zip(props.fields, props.values) as any

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Data Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {list.map(row => {
          return (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td><code>{row[1].split(':')[2]}</code></td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export const DocumentTreeView = (props) => {
  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#000000',
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

    const recipient = ['nric', 'email', 'email_address', 'phone', 'phone_number']
    const detectedFields = [] as any
    const detectedValues = [] as any

    const copy = (copy) => {
      // Handle onClick event to remove the particular field
      console.log(copy);
    }

    const download = () => {
      const redacted = obfuscateDocument(document, detectedFields)
      const blob = new Blob([JSON.stringify(redacted, null, 2)], {
        type: "application/json"
      })
      saveAs(blob, `${props.fileName}-redacted.opencert`)
    }

    const DisplayRecommendations = () => {

      if (!data) {
        return (
          <></>
        )
      }

      // Might need to rework this some day to search the entire object
      recipient.forEach(function (field) {
        if (field in data.recipient) {
          console.log("recipient.%s exists", field)
          detectedFields.push("recipient." + field)
          detectedValues.push(data.recipient[field])
        }
      })

      if (detectedFields.length) {
        return (
          <Card className="mb-4">
            <Card.Header>My Recommendations</Card.Header>
            <Card.Body>
              <Alert variant="warning">
                <Alert.Heading>
                  🔍 Looks like we found something...
                </Alert.Heading>
                We detected some fields that may potentially reveal some sensitive information if you were to share this OpenCert file publicly.
                Your OpenCert file is still valid even though certain fields have been filtered. If you want to know how it works,&nbsp;
                <a href="https://docs.opencerts.io/v1/appendix_data_obfuscation.html" target="_blank">check the documentation here</a>.
              </Alert>

              <RecommendationsTable
                data={data}
                fields={detectedFields}
                values={detectedValues} />
              <Button onClick={download} className="mt-2" variant="success">Redact and download</Button>
            </Card.Body>
          </Card>
        )
      }
      else {
        return (
          <Card className="mb-4">
            <Card.Header>My Recommendations</Card.Header>
            <Card.Body>
              <Alert variant="success">
                <Alert.Heading>
                  ✅ Looks good!
                </Alert.Heading>
                It seems like your OpenCert file doesn't contain any potentially sensitive information.
                You might still want to review your OpenCert contents below though.
              </Alert>
            </Card.Body>
          </Card>
        )
      }
    }

    return (
      <>
        <DisplayRecommendations></DisplayRecommendations>
        <Card>
          <Card.Header>OpenCerts Viewer</Card.Header>
          <Card.Body>
            <ReactJson
              src={data}
              enableClipboard={copy} // Event handler
              collapseStringsAfterLength={100} />
          </Card.Body>
        </Card>
      </>
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
import React, { useState } from 'react';
import * as _ from 'lodash'
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { obfuscateDocument } from '@govtechsg/open-attestation';
import { saveAs } from 'file-saver';
import ReactJson from 'react-json-view';

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

      // Check signature
      // if ("signature" in data.additionalData.certSignatories[0]) {
      //   data.additionalData.certSignatories[0].signature = "This field has been hidden."
      // }

      if (detectedFields.length) {
        return (
          <Card className="mb-4">
            <Card.Header>🔍 Hold up</Card.Header>
            <Card.Body>
              <Alert variant="warning">
                <Alert.Heading>
                  Before you continue...
                </Alert.Heading>
                We detected some fields that may potentially reveal some sensitive info if you were to share this OpenCert file publicly.
              </Alert>
              <RecommendationsTable data={data} fields={detectedFields} values={detectedValues}></RecommendationsTable>
            </Card.Body>
          </Card>
        )
      }
      else {
        return (
          <></>
        )
      }
    }

    const copy = (copy) => {
      // Handle onClick event to remove the particular field
      console.log(copy);
    }

    const download = () => {
      const redacted = obfuscateDocument(document, detectedFields)
      const blob = new Blob([JSON.stringify(redacted, null, 2)], {
        type: "application/json"
      })
      saveAs(blob, "certificate.opencert")
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

            <Button onClick={download} className="mt-2">Download</Button>
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
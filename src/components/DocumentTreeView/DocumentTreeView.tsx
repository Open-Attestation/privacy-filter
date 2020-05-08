import React, { useState } from 'react';
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

function redact(data, fields) {
  return OpenCert.obfuscateFields(data, [
    "recipient.nric",
    "recipient.email"
  ])
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

      const getValue = (path, obj) => {
        path.split('.').reduce(function (o, k) {
          return (
            <td>{o[k]}</td>
          )
        }, obj)
      }

      // Might need to rework this some day to search the entire object
      recipient.forEach(function (field) {
        if (field in data.recipient) {
          console.log("recipient.%s exists", field)
          detectedFields.push("recipient." + field)
        }
      })

      const RecommendationsTable = (props) => {
        return (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Data Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {props.fields.map(row => {
                const value = getValue(row, props.data)
                console.log(row, value)
                return (
                  <tr key={row}>
                    <td>{row}</td>
                    <td></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )
      }

      // Check signature
      if ("signature" in data.additionalData.certSignatories[0]) {
        data.additionalData.certSignatories[0].signature = "This field has been hidden."
      }

      if (detectedFields.length) {
        console.log(detectedFields)
        return (
          <Card className="mb-4">
            <Card.Header>🔍 Hold up</Card.Header>
            <Card.Body>
              <Alert variant="warning">
                <Alert.Heading>
                  Before you continue...
                </Alert.Heading>
                We detected some fields that may potentially reveal some sensitive info if you were to share this OpenCert file.
                Below is a preview.
              </Alert>
              <RecommendationsTable data={data} fields={detectedFields}></RecommendationsTable>
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

    return (
      <>
        <DisplayRecommendations></DisplayRecommendations>
        <Card>
          <Card.Header>OpenCerts Viewer</Card.Header>
          <Card.Body>
            <JSONTree
              data={data}
              theme={theme}
              invertTheme={true}
              valueRenderer={(raw) => valueRenderer(raw)}
              shouldExpandNode={() => true}
              hideRoot />
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
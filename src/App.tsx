import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { DocumentMasterView } from './components/DocumentMasterView';

function App() {
  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header"><a href="https://opencerts.io">📜 OpenCerts</a> Privacy Filter</h1>
          <p>This tool helps you to 🔍 find potential fields in your certificate that you can ⬛ redact.</p>
        </Jumbotron>
        <Row>
          <Col>
            <DocumentMasterView />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

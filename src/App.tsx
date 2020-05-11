import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { OpenCertPrivacyFilter } from './components/OpenCertPrivacyFilter';

function App() {
  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header"><a href="https://opencerts.io" target="_blank">📜 OpenCerts</a> Privacy Filter</h1>
          <p>
            This tool helps you to 🔍 locate potential fields in your OpenCerts that may reveal sensitive information,
            so that you can ⬛ redact them before sharing with others.
          </p>
          <em>PS. This app is all client-side, you can <a href="https://github.com/gjj/opencerts-privacy-filter" target="_blank">inspect the codebase</a> on GitHub if you'd like!</em>
        </Jumbotron>
        <Row>
          <Col>
            <OpenCertPrivacyFilter />
          </Col>
        </Row>
        <hr />
        <a href="https://github.com/gjj/opencerts-privacy-filter" target="_blank">GitHub</a>
      </Container>
    </div>
  );
}

export default App;

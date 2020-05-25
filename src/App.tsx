import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { PrivacyFilter } from './components/PrivacyFilter';

function App() {
  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header"><a href="https://openattestation.com" target="_blank" rel="noopener noreferrer"><span role="img" aria-labelledby="document">📜</span> OpenAttestation</a> Privacy Filter</h1>
          <p>
            This tool helps you to <span role="img" aria-labelledby="magnifyingGlass">🔍</span> locate potential fields in your OpenAttestation document that may reveal sensitive information,
            so that you can  <span role="img" aria-labelledby="redact">⬛</span> redact them before sharing with others.
          </p>
          <em>PS. This app is all client-side, you can <a href="https://github.com/gjj/privacy-filter" target="_blank" rel="noopener noreferrer">inspect the codebase</a> on GitHub if you'd like!</em>
        </Jumbotron>
        <Row>
          <Col>
            <PrivacyFilter />
          </Col>
        </Row>
        <hr />
        <a href="https://github.com/gjj/privacy-filter" target="_blank" rel="noopener noreferrer">GitHub</a>
      </Container>
    </div>
  );
}

export default App;

import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import { PrivacyFilter } from "./components/PrivacyFilter";

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">
            <a href="https://openattestation.com" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-labelledby="document">
                📜
              </span>{" "}
              OpenAttestation
            </a>{" "}
            Privacy Filter
          </h1>
          <p>
            This tool helps you to 🔍 locate potential fields in your OpenAttestation document that may reveal sensitive
            information, so that you can ⬛ redact them before sharing with others.
          </p>
        </Jumbotron>
        <Row>
          <Col>
            <PrivacyFilter />
          </Col>
        </Row>
        <hr />
        <a href="https://github.com/Open-Attestation/privacy-filter" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Container>
    </div>
  );
};

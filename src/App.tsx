import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PrivacyFilter } from "./components/PrivacyFilter";

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <h1>
        <a href="https://openattestation.com" target="_blank" rel="noopener noreferrer">
          📜 OpenAttestation
        </a>{" "}
        Privacy Filter
      </h1>
      <p>
        This tool helps you to 🔍 locate potential fields in your OpenAttestation document that may reveal sensitive
        information, so that you can ⬛ redact them before sharing with others.
      </p>
      <Row>
        <Col>
          <PrivacyFilter />
        </Col>
      </Row>
    </div>
  );
};

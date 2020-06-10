// import { css } from "emotion";
import React from "react";
import { PrivacyFilter } from "./components/PrivacyFilter";
import document from "./document.svg";

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="container mx-auto px-4">
        <div className="grid grid-flow-col sm:grid-flow-row md:grid-flow-col-dense lg:grid-flow-row-dense xl:grid-flow-col">
          <div>
            <h1>
              <a href="https://openattestation.com" target="_blank" rel="noopener noreferrer">
                📜 OpenAttestation
              </a>{" "}
              Privacy Filter
            </h1>
            <p>
              This tool helps you to 🔍 locate potential fields in your OpenAttestation document that may reveal
              sensitive information, so that you can ⬛ redact them before sharing with others.
            </p>
          </div>
          <div>
            <img src={document} />
          </div>
        </div>
        <PrivacyFilter />
      </div>
    </div>
  );
};

// import { css } from "emotion";
import React from "react";
import { PrivacyFilter } from "./components/PrivacyFilter";
import document from "./document.svg";

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8">
            <h1>
              <a href="https://openattestation.com" target="_blank" rel="noopener noreferrer">
                <span role="img" aria-label="document">
                  📜
                </span>{" "}
                OpenAttestation
              </a>{" "}
              Privacy Filter
            </h1>
            <p>
              This tool helps you to{" "}
              <span role="img" aria-label="magnifying glass">
                🔍
              </span>{" "}
              locate potential fields in your OpenAttestation document that may reveal sensitive information, so that
              you can{" "}
              <span role="img" aria-label="censor">
                ⬛
              </span>{" "}
              redact them before sharing with others.
            </p>
          </div>
          <div className="col-span-4">
            <img className="object-contain h-48 w-full" src={document} alt="" />
          </div>
        </div>
        <PrivacyFilter />
      </div>
    </div>
  );
};

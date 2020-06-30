import React from "react";
import { PrivacyFilter } from "./components/PrivacyFilter";
import document from "./document.svg";

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 md:col-span-8">
            <h1 className="text-xl md:text-2xl font-semibold mb-2">
              <span role="img" aria-label="document">
                📜
              </span>{" "}
              <a href="https://openattestation.com" target="_blank" rel="noopener noreferrer">
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
            <img className="hidden md:block object-contain h-48 w-full" src={document} alt="" />
          </div>
        </div>
        <PrivacyFilter />
      </div>
    </div>
  );
};

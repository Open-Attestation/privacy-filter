import { render } from "@testing-library/react";
import React from "react";
import { App } from "./App";

describe("app", () => {
  it("should render document", () => {
    expect.assertions(1);
    const { getByText } = render(<App />);
    expect(getByText(/Privacy Filter/i)).toBeInTheDocument();
  });
  it("should render the dropzone component", () => {
    expect.assertions(1);
    const { getByText } = render(<App />);
    expect(getByText(/Drag and drop any OpenAttestation file here/i)).toBeInTheDocument();
  });
});

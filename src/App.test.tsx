import { render } from "@testing-library/react";
import React from "react";
import { App } from "./App";

describe("app", () => {
  it("renders learn react link", () => {
    expect.assertions(1);
    const { getByText } = render(<App />);
    expect(getByText(/Privacy Filter/i)).toBeInTheDocument();
  });
});

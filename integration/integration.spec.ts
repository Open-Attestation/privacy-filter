import { Selector } from "testcafe";

fixture("Counter Game").page`http://localhost:3000`;

const Header = Selector("h1").nth(0);

test("Custom certificate is rendered correctly", async (t) => {
  await t.expect(Header.textContent).contains("OpenAttestation Privacy Filter");
});

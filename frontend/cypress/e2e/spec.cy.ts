/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
const testEmail1 = "testemail1@mail.com";
const testEmail2 = "testemail2@mail.com";

describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("./sw.js", {
      body: undefined,
    });
  });
  it("login user 1", function () {
    cy.visit("https://localhost");
    cy.get('input[placeholder="Email"]').type(testEmail1);
    cy.get('input[placeholder="Password"]').type(testEmail1);
    cy.get('button[type="submit"]').click();
    cy.get('input[placeholder="Password"]').should("not.exist");
  });
  it("login user 2", function () {
    cy.visit("https://localhost");
    cy.get('input[placeholder="Email"]').type(testEmail2);
    cy.get('input[placeholder="Password"]').type(testEmail2);
    cy.get('button[type="submit"]').click();
    cy.get('input[placeholder="Password"]').should("not.exist");
  });
  it("send messages", function () {
    cy.visit("https://localhost", {
      onBeforeLoad(win) {
        const file = {
          text: cy
            .stub()
            .resolves(JSON.stringify({ x: 1, y: 1 }))
            .as("text"),
        };
        const fileHandle = {
          getFile: cy.stub().resolves(file).as("file"),
        };
        cy.stub(win, "showOpenFilePicker")
          .resolves([fileHandle])
          .as("showOpenFilePicker");
      },
    });
    cy.get('input[placeholder="Email"]').type(testEmail1);
    cy.get('input[placeholder="Password"]').type(testEmail1);
    cy.get('button[type="submit"]').click();
    cy.contains("New Chat").click();

    cy.get('input[placeholder="Freja Johnsen"]').type(testEmail2);
    cy.get('input[name="email"]').type(testEmail2);
    cy.get('input[placeholder="Hi!"]').type(testEmail2);
    cy.get('input[placeholder="Hi!"]').blur();
    cy.contains("Send").click();
    cy.contains(testEmail2).click();

    cy.get('button[aria-haspopup="dialog"]').click();
    const sendGPS = cy.get(".rt-PopperContent > div > button:nth-of-type(1)");
    sendGPS.click();
    const sendJSON = cy.get(".rt-PopperContent > div > button:nth-of-type(2)");
    sendJSON.click();

    const sendImage = cy.get(
      ".rt-PopperContent > div > button:nth-of-type(3) > input",
    );
    sendImage.selectFile(
      {
        contents: Cypress.Buffer.from("", "base64"),
        fileName: "file.jpg",
        mimeType: "image/jpeg",
        lastModified: Date.now(),
      },
      { force: true },
    );
    cy.get("Location", { timeout: 10000 });
  });
  it("receive messages", function () {
    cy.visit("https://localhost");

    cy.get('input[placeholder="Email"]').type(testEmail2);
    cy.get('input[placeholder="Password"]').type(testEmail2);
    cy.get('button[type="submit"]').click();
    cy.contains(testEmail1).click();
    cy.contains("Location");
    cy.contains('"x":1');
  });
  it("logout", function () {
    cy.visit("google.com");
  });
});

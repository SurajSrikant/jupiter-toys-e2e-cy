/// <reference types="cypress" />
import PageObjectManager from "../../support/pageobject/pageObjectManager";

const selectors = new PageObjectManager().getContactPage();

describe("Contact page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Checks validation errors", () => {
    cy.intercept("GET", "views/contact.html").as("contactPage");

    selectors.contactTabBtn().should("have.text", "Contact").click();

    cy.wait("@contactPage").then((res) =>
      expect(res.response?.statusCode).to.eq(200)
    );

    //Assert the required fields (*)
    selectors.requiredFields().should("have.length", 3);

    selectors.submitButton().click();

    assertInvalidForm();

    cy.fillContactForm();

    //Assert valid form
    selectors.inlineHelpText().should("not.exist");
    selectors.submitErrorAlert().should("not.exist");
  });
});

function assertInvalidForm() {
  selectors
    .submitErrorAlert()
    .invoke("text")
    .then((text) => {
      expect(text).to.have.string(
        "We welcome your feedback - but we won't get it unless you complete the form correctly."
      );
    });

  selectors.forenameError().should("be.visible");

  selectors
    .forenameError()
    .invoke("text")
    .should("have.string", "Forename is required");

  selectors.emailError().should("be.visible");

  selectors.emailError().invoke("text").and("have.string", "Email is required");

  selectors.messageError().should("be.visible");

  selectors
    .messageError()
    .invoke("text")
    .and("have.string", "Message is required");

  cy.get(".ng-invalid").should("have.length", 4);
}

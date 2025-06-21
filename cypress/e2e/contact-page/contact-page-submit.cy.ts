/// <reference types="cypress" />
import PageObjectManager from "../../support/pageobject/pageObjectManager";

const selectors = new PageObjectManager().getContactPage();

Cypress._.times(5, () => {
  describe("Contact page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Submit contract form", () => {
      cy.intercept("GET", "views/contact.html").as("contactPage");
      selectors.contactTabBtn().click();

      cy.wait("@contactPage").then((res) =>
        expect(res.response?.statusCode).to.eq(200)
      );

      cy.fillContactForm();

      selectors.submitButton().click();

      assertFormSubmitted();
    });
  });
});

function assertFormSubmitted() {
  selectors.submitFeedbackModal().should("be.visible");
  cy.get(".modal-header > h1")
    .invoke("text")
    .should("have.string", "Sending Feedback");

  selectors.successFormSubmit().should("be.visible");
  selectors
    .successFormSubmit()
    .invoke("text")
    .then((text) => {
      expect(text).to.have.string("Thanks John, we appreciate your feedback.");
    });
}

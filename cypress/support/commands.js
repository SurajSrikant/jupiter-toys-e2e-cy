// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import PageObjectManager from "../support/pageobject/pageObjectManager";

const selectors = new PageObjectManager().getContactPage();

Cypress.Commands.add("fillContactForm", () => {
  selectors.forenameInput().type("John", { delay: 100 });
  selectors.forenameInput().should("have.class", "ng-valid");

  selectors.emailInput().type("john.example@planit.net.au", { delay: 100 });
  selectors.emailInput().should("have.class", "ng-valid");

  selectors.messageInput().type("message", { delay: 100 });
  selectors.messageInput().should("have.class", "ng-valid");
});

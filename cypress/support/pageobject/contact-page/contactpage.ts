class ContactPage {
  contactTabBtn() {
    return cy.get("#nav-contact");
  }

  requiredFields() {
    return cy.get(".req");
  }

  submitButton() {
    return cy.get(".btn-primary");
  }

  submitErrorAlert() {
    return cy.get(".alert-error");
  }

  inlineHelpText() {
    return cy.get(".help-inline");
  }

  forenameError() {
    return cy.get("#forename-err");
  }

  emailError() {
    return cy.get("#email-err");
  }

  messageError() {
    return cy.get("#message-err");
  }

  forenameInput() {
    return cy.get("#forename");
  }

  emailInput() {
    return cy.get("#email");
  }

  messageInput() {
    return cy.get("#message");
  }

  submitFeedbackModal() {
    return cy.get(".modal-header");
  }

  successFormSubmit() {
    return cy.get(".alert-success");
  }
}

export default ContactPage;

/// <reference types="cypress" />

describe("HTTP use", () => {
  console.log(Cypress.env());
  it("todo tests", () => {
    cy.visit("/todos");
  });
});

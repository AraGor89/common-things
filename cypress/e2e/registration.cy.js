/// <reference types="cypress" />
import { loginPage } from "../pages/login";
import { signinPage } from "../pages/signin";
describe("Test signIn and logIn", () => {
  it("signIn and logIn", () => {
    cy.visit("/signin");

    signinPage.fillValidData();

    signinPage.submitSignin();

    cy.location("pathname").should("eq", "/login");

    loginPage.fillValidData();

    loginPage.submitLogin();

    cy.get('[data-cy="logout"]').click();
  });
});

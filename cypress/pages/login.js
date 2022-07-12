import { logIn } from "../valid-data/info/info";

export const loginPage = {
  fillValidData() {
    for (let prop in logIn) {
      cy.get(`[data-cy="${prop}"]`).type(logIn[prop]);
    }
  },

  submitLogin() {
    cy.get('[data-cy="Submit"]').click();
  },
};

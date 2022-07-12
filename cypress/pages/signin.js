import { signIn } from "../valid-data/info/info";

export const signinPage = {
  fillValidData() {
    for (let prop in signIn) {
      cy.get(`[data-cy="${prop}"]`).type(signIn[prop]);
    }
  },

  submitSignin() {
    cy.get('[data-cy="Submit"]').click();
  },
};

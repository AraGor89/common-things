/// <reference types="cypress" />

const {
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_SHEETS_ID,
  REACT_APP_GOOGLE_SHEETS_API_URL,
} = Cypress.env();

console.log(Cypress.env());
describe("HTTP use", () => {
  const URL = `${REACT_APP_GOOGLE_SHEETS_API_URL}${REACT_APP_GOOGLE_SHEETS_ID}/values:batchGet?ranges=Sheet1!A2:Z10000&key=${REACT_APP_GOOGLE_API_KEY}`;
  it("get words for alias game from google sheet", () => {
    cy.request({
      method: "GET",
      url: URL,
    }).then((res) => {
      expect(res).have.property("status").eq(200);
      console.log(res);
    });
  });
});

// describe("HTTP use", () => {
//   it("visits base url", () => {
//     cy.visit("/");
//     cy.then(() => {
//       expect(Cypress.config("baseUrl")).to.eq("https://example.cypress.io");
//     });
//   });

//   it("visits local file - test-override", { baseUrl: null }, () => {
//     cy.then(() => {
//       expect(Cypress.config("baseUrl")).to.be.null;
//     });
//     cy.visit("https://www.netflix.com");
//   });

//   it("resets baseUrl", () => {
//     cy.then(() => {
//       Cypress.config("baseUrl", "https://example.cypress.io");
//       expect(Cypress.config("baseUrl")).to.eq("https://example.cypress.io");
//     });
//     cy.visit("/");
//   });

//   it("visits local file -  inline override", () => {
//     cy.then(() => {
//       expect(Cypress.config("baseUrl")).to.eq("https://example.cypress.io");
//       Cypress.config("baseUrl", null);
//       expect(Cypress.config("baseUrl")).to.be.null;
//     });

//     cy.get(
//       ":nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > ul > :nth-child(1) > a"
//     ).click();
//   });
// });

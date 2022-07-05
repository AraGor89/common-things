/// <reference types="cypress" />

const sheet_id = "1D3zHrSbk8ZlJS7frCs_N-XEgMfuFyoiOGgTQYF43F1Y";
const api_key = "AIzaSyCZCrntP9xxaWiE-ZF75qoBFsJW7XX0IzE";
console.log(Cypress.env());
describe("HTTP use", () => {
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values:batchGet?ranges=Sheet1!A2:Z10000&key=${api_key}`;
  it("get words for alias game from google sheet", () => {
    cy.request({
      method: "GET",
      url: URL,
    }).then((res) => {
      expect(res).have.property("status").eq(200);
    });
  });
});

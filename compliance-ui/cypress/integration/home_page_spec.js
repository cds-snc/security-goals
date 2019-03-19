/* eslint-disable */

describe("The Index Page (Releases Page)", function() {
  it("successfully loads...", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/");
  });
});

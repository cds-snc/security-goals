/* eslint-disable */

describe("Back to Top Button focuses top of page (mouse)", function() {
  // testing page navigation by selecting first item in each list
  it("Index Page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='back-to-top']")
      .first()
      .click();

    cy.focused().should("have.attr", "data-testid", "print-link");
  });

  it("Single Release Page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='back-to-top']")
      .first()
      .click();

    cy.focused().should("have.attr", "data-testid", "print-link");
  });

  it("Details Page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='control-box']")
      .first()
      .click();

    cy.url().should("contain", "/controls/AU-6");

    cy.get("[data-testid='back-to-top']")
      .first()
      .click();

    cy.focused().should("have.attr", "data-testid", "print-link");
  });
});

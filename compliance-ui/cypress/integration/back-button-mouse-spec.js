/* eslint-disable */

describe("Back Button links Single Release (mouse)", function() {
  // testing page navigation by selecting first item in each list
  it("Top Back Button - Single Release Page brings you to the home page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='back-button']")
      .first()
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });

  it("Bottom Back Button - Single Release Page brings you to the home page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='back-button']")
      .last()
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });
});

describe("Back Button links Details Page (mouse)", function() {
  // testing page navigation by selecting first item in each list
  it("Top Back Button - Details Page brings you to the home page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='control-box']")
      .first()
      .click();

    cy.url().should("contain", "/controls/AU-6");

    cy.get("[data-testid='back-button']")
      .first()
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });

  it("Bottom Back Button - Details Page brings you to the home page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='control-box']")
      .first()
      .click();

    cy.url().should("contain", "/controls/AU-6");

    cy.get("[data-testid='back-button']")
      .last()
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });
});

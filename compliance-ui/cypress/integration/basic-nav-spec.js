/* eslint-disable */

describe("Basic navigation", function() {
  // testing page navigation by selecting first item in each list
  it("Index >> 1546522884800 >> AU-6 >> 1546522884800", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='control-box']")
      .first()
      .click();

    cy.url().should("contain", "/controls/AU-6");

    cy.get("[data-testid='release-link']")
      .first()
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");
  });

  it("Index >> 80e61288-ef33-11e8-908e-06d86cf01138 >> SI-10 >> 80e61288-ef33-11e8-908e-06d86cf01138 ", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='release-box-list-item']")
      .eq(2)
      .click();

    cy.url().should(
      "contain",
      "/singlerelease/80e61288-ef33-11e8-908e-06d86cf01138"
    );

    cy.get("[data-testid='control-box']")
      .first()
      .click();

    cy.url().should("contain", "/controls/SI-10");

    cy.get("[data-testid='release-link']")
      .first()
      .click();

    cy.url().should(
      "contain",
      "/singlerelease/80e61288-ef33-11e8-908e-06d86cf01138"
    );
  });
});

describe("Keyboard navigation", function() {
  // testing page navigation by selecting first item in each list
  it("Index >> 1546522884800 >> AU-6 >> 1546522884800", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='print-link']").tab();

    cy.focused().should("have.attr", "data-testid", "index-h1");
    cy.focused().tab();

    cy.focused()
      .should("have.attr", "data-testid", "release-list")
      .trigger("keydown", { key: " " });
    cy.focused().should("have.attr", "data-testid", "release-box-link");

    /*

    Unfortunately due to cypress' keydown handling, I need to shift focus to a new
    item because there is no implementation for the Enter button as a click. Pressing
    Enter at the point above, would progress you to the singleRelease page

    Cypress is working on a Native Browser Events release that will probably solve this,
    but for now this is my only work-around

    */

    cy.get("[data-testid='release-box-list-item']")
      .first()
      .click(); //this is the mouse click talked about above

    cy.url().should("contain", "/singlerelease/1546522884800");

    cy.get("[data-testid='print-link']").tab();
    cy.focused().should("have.attr", "data-testid", "back-button");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "status-bar");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "control-list")
      .trigger("keydown", { key: " ", force: true });

    cy.focused().should("have.attr", "data-testid", "control-box-link");

    /*

    Same issue with Enter button event in cypress. Unfortunately need to focus shift to new element to progress

    */

    cy.get("[data-testid='control-box']")
      .first()
      .click(); //this is the mouse click talked about above

    cy.url().should("contain", "/controls/AU-6");

    cy.get("[data-testid='print-link']").tab();

    cy.focused().should("have.attr", "data-testid", "back-button");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "toggle-read");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "release-link")
      .click();

    cy.url().should("contain", "/singlerelease/1546522884800");
  });
});

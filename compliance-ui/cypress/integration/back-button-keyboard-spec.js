/* eslint-disable */

describe("Back Button links Single Release (keyboard)", function() {
  // testing page navigation by selecting first item in each list
  it("Top Back Button - Single Release Page brings you to the home page", function() {
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
    cy.focused()
      .should("have.attr", "data-testid", "back-button")
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });

  it("Bottom Back Button - Single Release Page brings you to the home page", function() {
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
      .should("have.attr", "data-testid", "control-list");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "back-button");

    /*

    Unfortunately due to cypress' keydown handling, I need to shift focus to a new
    item because there is no implementation for the Enter button as a click. Pressing
    Enter at the point above, would progress you to the singleRelease page

    Cypress is working on a Native Browser Events release that will probably solve this,
    but for now this is my only work-around

    */

    cy.focused().click(); //this is the mouse click talked about above

    cy.url().should("eq", "http://localhost:4000/");
  });
});

describe("Back Button links Details Page (keyboard)", function() {
  // testing page navigation by selecting first item in each list
  it("Top Back Button - Details Page brings you to the home page", function() {
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

    cy.focused()
      .should("have.attr", "data-testid", "back-button")
      .click();
    cy.url().should("eq", "http://localhost:4000/");
  });

  it("Bottom Back Button - Details Page brings you to the home page", function() {
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
      .should("have.attr", "data-testid", "release-link");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "control-list");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "back-button")
      .click();

    cy.url().should("eq", "http://localhost:4000/");
  });
});

/* eslint-disable */

describe("Keyboard List Item Navigation", function() {
  // testing page navigation by selecting first item in each list
  it("Index Page", function() {
    cy.visit("http://localhost:4000");
    cy.get("[data-testid='print-link']").tab();

    cy.focused().should("have.attr", "data-testid", "index-h1");
    cy.focused().tab();

    cy.focused()
      .should("have.attr", "data-testid", "release-list")
      .trigger("keydown", { key: " " });

    cy.focused().should("have.attr", "data-testid", "release-box-link");

    // Again, issue here with cypress so I have to use get to trigger the event properly

    cy.get("[data-testid='release-box-list-item']")
      .first()
      .trigger("keydown", {
        key: "ArrowDown"
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/43c61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowRight",
        force: true
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/80e61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowDown",
        force: true
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/60e61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowRight",
        force: true
      });

    cy.focused()
      .should("have.attr", "href", "/singlerelease/1546522884800")
      .trigger("keydown", {
        key: "ArrowLeft",
        force: true
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/60e61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowUp",
        force: true
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/80e61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowLeft",
        force: true
      });

    cy.focused()
      .should(
        "have.attr",
        "href",
        "/singlerelease/43c61288-ef33-11e8-908e-06d86cf01138"
      )
      .trigger("keydown", {
        key: "ArrowUp",
        force: true
      });

    cy.focused()
      .should("have.attr", "href", "/singlerelease/1546522884800")
      .trigger("keydown", {
        key: "ArrowLeft",
        force: true
      });

    cy.focused().should(
      "have.attr",
      "href",
      "/singlerelease/60e61288-ef33-11e8-908e-06d86cf01138"
    );
  });
});

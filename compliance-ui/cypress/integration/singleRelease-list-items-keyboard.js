/* eslint-disable */

describe("Keyboard List Item Navigation", function() {
  // testing page navigation by selecting first item in each list
  it("Single Release Page", function() {
    cy.visit(
      "http://localhost:4000/singlerelease/60e61288-ef33-11e8-908e-06d86cf01138"
    );

    cy.get("[data-testid='print-link']").tab();

    cy.focused().should("have.attr", "data-testid", "back-button");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "status-bar");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "control-list")
      .trigger("keydown", { key: " ", force: true });

    cy.focused()
      .should("have.attr", "data-testid", "control-box-link")
      .and("have.attr", "href", "/controls/CM-8")
      .trigger("keydown", { key: "ArrowDown", force: true });

    cy.focused()
      .should("have.attr", "href", "/controls/CM-8 (1)")
      .trigger("keydown", { key: "ArrowRight", force: true });

    cy.focused()
      .should("have.attr", "data-testid", "control-box-link")
      .and("have.attr", "href", "/controls/CM-8 (4)")
      .trigger("keydown", { key: "ArrowDown", force: true });

    cy.focused()
      .should("have.attr", "href", "/controls/CM-8")
      .trigger("keydown", { key: "ArrowRight", force: true });

    cy.focused()
      .should("have.attr", "data-testid", "control-box-link")
      .and("have.attr", "href", "/controls/CM-8 (1)")
      .trigger("keydown", { key: "ArrowUp", force: true });

    cy.focused()
      .should("have.attr", "href", "/controls/CM-8")
      .trigger("keydown", { key: "ArrowLeft", force: true });

    cy.focused()
      .should("have.attr", "data-testid", "control-box-link")
      .and("have.attr", "href", "/controls/CM-8 (4)")
      .trigger("keydown", { key: "ArrowUp", force: true });

    cy.focused()
      .should("have.attr", "href", "/controls/CM-8 (1)")
      .trigger("keydown", { key: "ArrowRight", force: true });
  });
});

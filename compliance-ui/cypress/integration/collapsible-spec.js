/* eslint-disable */

describe("<Collapsible />'s toggle button expands and closes the <MainDescription /> (mouse)", function() {
  it("successfully loads...", function() {
    cy.visit("http://localhost:4000/controls/AU-6");

    // assert that there is no main-description on the page at this point in time
    cy.get("[data-testid='main-description']").should("not.be.visible");

    // assert that page contains toggle-read button and that it matches the right description
    cy.get("[data-testid='toggle-read']").should(
      "contain",
      "Read the AU-6 description"
    );

    // assert that toggle-hide is not on the page at this point in time
    cy.get("[data-testid='toggle-hide']").should("not.exist");

    // click the toggle-read button to expand the description
    cy.get("[data-testid='toggle-read']").click();

    // assert that toggle-read disappears and toggle-hide appears after button click
    cy.get("[data-testid='toggle-read']").should("not.exist");
    cy.get("[data-testid='toggle-hide']")
      .should("exist")
      .and("contain", "Hide the AU-6 description");

    // assert that main description is now visible and matches the proper description
    cy.get("[data-testid='main-description']")
      .should(
        "contain",
        "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity]."
      )
      .and(
        "contain",
        "(B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
      )
      .and("be.visible");

    // click toggle-hide to collapse the description
    cy.get("[data-testid='toggle-hide']").click();

    // assert description has collapsed
    cy.get("[data-testid='toggle-hide']").should("not.exist"); // toggle-hide should be gone
    cy.get("[data-testid='toggle-read']").should("exist"); // toggle-read should have replaced it on click
    cy.get("[data-testid='main-description']").should("not.be.visible"); // main description should not be visible anymore
  });
});

describe("<Collapsible />'s toggle button expands and closes the <MainDescription /> (keyboard)", function() {
  it("successfully loads...", function() {
    cy.visit("http://localhost:4000/controls/AU-6");

    // tab() requires an element to already be focused so making entry point the first tabbable item (Print PDF)

    //assert that main-description is hidden
    cy.get("[data-testid='main-description']").should("not.be.visible");
    // tab twice to reach toggle button
    cy.get("[data-testid='print-link']")
      .tab()
      .tab();

    // assert that you have landed on the toggle button and press Enter button
    cy.focused()
      .should("contain", "Read the AU-6 description")
      .and("have.attr", "data-testid", "toggle-read")
      .trigger("keydown", { key: "Enter" });

    // assert that focus has shifted to the main description and is the proper description
    cy.focused()
      .should("have.attr", "data-testid", "main-description")
      .and(
        "contain",
        "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity]."
      )
      .and(
        "contain",
        "(B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
      )
      .and("be.visible");

    // tab to toggle button and assert that text has changed from Read to Hide press Enter to toggle once more
    cy.focused().tab();
    cy.focused()
      .should("contain", "Hide the AU-6 description")
      .and("have.attr", "data-testid", "toggle-hide")
      .trigger("keydown", { key: "Enter" });

    // assert that the button has toggled back to Read description
    cy.get("[data-testid='toggle-read']").should("exist");

    // assert that toggle hide and main description are not visible
    cy.get("[data-testid='toggle-hide']").should("not.exist");
    cy.get("[data-testid='main-description']").should("not.be.visible");
  });
});

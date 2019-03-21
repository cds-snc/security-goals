/* eslint-disable */

/* describe("<Collapsible />'s toggle button expands and closes the <MainDescription /> (mouse)", function() {
  it("successfully loads...", function() {
    cy.visit("http://localhost:4000/controls/AU-6");

    cy.get("[data-testid='toggle-read']").should(
      "contain",
      "Read the AU-6 description"
    );
    cy.get("[data-testid='toggle-read']").click();

    cy.get("[data-testid='toggle-read']").should("not.exist");

    cy.get("[data-testid='main-description']")
      .should(
        "contain",
        "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity]."
      )
      .and(
        "contain",
        "(B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
      );

    cy.get("[data-testid='toggle-hide']").should(
      "contain",
      "Hide the AU-6 description"
    );

    cy.get("[data-testid='toggle-hide']").click();
    cy.get("[data-testid='toggle-hide']").should("not.exist");

    cy.get("[data-testid='toggle-read']").should("exist");
  });
});

*/

describe("<Collapsible />'s toggle button expands and closes the <MainDescription /> (keyboard)", function() {
  it("successfully loads...", function() {
    cy.visit("http://localhost:4000/controls/AU-6");
    cy.get("[data-testid='print-link']")
      .tab()
      .tab()
      .trigger("keydown", { key: "Enter" });
  });
});

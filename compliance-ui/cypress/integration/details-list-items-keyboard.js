/* eslint-disable */

describe("Keyboard List Item Navigation", function() {
  // testing page navigation by selecting first item in each list
  it("Details Page", function() {
    cy.visit("http://localhost:4000/controls/CM-8");

    cy.get("[data-testid='print-link']")
      .tab()
      .tab();

    cy.focused()
      .should("contain", "Read the CM-8 description")
      .and("have.attr", "data-testid", "toggle-read");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "release-link");

    cy.focused()
      .tab()
      .should("have.attr", "data-testid", "control-list")
      .trigger("keydown", { key: " ", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 10:21:19 AM, 23-11-2018, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowRight", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 08:41:37 AM, 03-01-2019, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowDown", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 08:41:36 AM, 03-01-2019, description of check: The application uses a packages.json to manage the information inventory in source control with a log of changes by users., verification reference: https://github.com/cds-snc/mrpinchy-confession-box/blob/master/package.json, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowRight", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 10:21:19 AM, 23-11-2018, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowDown", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 08:41:37 AM, 03-01-2019, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowLeft", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 10:21:19 AM, 23-11-2018, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowUp", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 08:41:36 AM, 03-01-2019, description of check: The application uses a packages.json to manage the information inventory in source control with a log of changes by users., verification reference: https://github.com/cds-snc/mrpinchy-confession-box/blob/master/package.json, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowLeft", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 08:41:37 AM, 03-01-2019, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowUp", force: true });

    cy.focused()
      .should(
        "have.attr",
        "aria-label",
        "Verification passed: 10:21:19 AM, 23-11-2018, description of check: The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users., verification reference: https://raw.githubusercontent.com/cds-snc/mrpinchy-confession-box/master/manifests/base/kustomization.yaml, component category: Source code"
      )
      .trigger("keydown", { key: "ArrowLeft", force: true });

    cy.focused().should(
      "have.attr",
      "aria-label",
      "Verification passed: 08:41:36 AM, 03-01-2019, description of check: The application uses a packages.json to manage the information inventory in source control with a log of changes by users., verification reference: https://github.com/cds-snc/mrpinchy-confession-box/blob/master/package.json, component category: Source code"
    );
  });
});

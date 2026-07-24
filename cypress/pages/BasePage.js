class BasePage {
  visit(path = "/") {
    cy.visit(path);
    return this;
  }

  allLinks() {
    return cy.get(SELECTORS.allLinks);
  }
}

export default BasePage;
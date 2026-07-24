import BasePage from "./BasePage";

const SELECTORS = {
  trialButtons: 'a[href*="signup"]',
  demoButtons: 'a[href*="get-demo"]',
  allLinks: "a",
  mainHeading: "h1",
  tabs: ".w-tab-link",
  activeTab: ".w-tab-link.w--current",
  tabPanes: ".w-tab-pane",
};

class HomePage extends BasePage {
  trialButtons() {
    return cy.get(SELECTORS.trialButtons);
  }

  demoButtons() {
    return cy.get(SELECTORS.demoButtons);
  }

    allLinks() {
    return cy.get(SELECTORS.allLinks);
  }

  tabs() {
    return cy.get(SELECTORS.tabs);
  }

  activeTab() {
    return cy.get(SELECTORS.activeTab);
  }

  visibleTabPanes() {
    return cy.get(SELECTORS.tabPanes).filter(":visible");
  }

  selectTab(label) {
    cy.contains(SELECTORS.tabs, label).click();
    return this;
  }

  visibleTabContent() {
    return cy.get(SELECTORS.tabPanes).filter(":visible");
  }
}

export default new HomePage();
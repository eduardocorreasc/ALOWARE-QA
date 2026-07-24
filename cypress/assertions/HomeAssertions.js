import BaseAssertions from "./BaseAssertions";
import homePage from "../pages/HomePage";
import { ROUTES } from "../support/routes";

class HomeAssertions extends BaseAssertions {
  trialButtonsLeadToSignup() {
    this.allLinksPointTo(homePage.trialButtons(), ROUTES.signup);
  }

  demoButtonsLeadToDemoPage() {
    this.allLinksPointTo(homePage.demoButtons(), ROUTES.demo);
  }

  homepageHasNoDeadLinks() {
    this.noDeadLinks(homePage.allLinks());
  }

  homepageHasNoDuplicateDestinations() {
    this.noDuplicateDestinations(homePage.allLinks());
  }

  exactlyOneTabIsSelected() {
    homePage.activeTab().should("have.length", 1);
  }

  selectedTabIs(label) {
    homePage.activeTab().should("contain.text", label);
  }

  exactlyOneTabPaneIsVisible() {
    homePage.visibleTabPanes().should("have.length", 1);
  }

  visibleTabContentMentions(text) {
    homePage.visibleTabContent().should("contain.text", text);
  }
}

export default new HomeAssertions();
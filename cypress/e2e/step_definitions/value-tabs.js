import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../pages/HomePage";
import homeAssertions from "../../assertions/HomeAssertions";

Given("exactly one tab is selected in the value proposition section", () => {
  homeAssertions.exactlyOneTabIsSelected();
});

When("the visitor selects the {string} tab", (label) => {
  homePage.selectTab(label);
});

Then("the {string} tab is the selected one", (label) => {
  homeAssertions.selectedTabIs(label);
});

Then("exactly one tab panel is visible", () => {
  homeAssertions.exactlyOneTabPaneIsVisible();
});

Then("the visible tab content mentions {string}", (text) => {
  homeAssertions.visibleTabContentMentions(text);
});
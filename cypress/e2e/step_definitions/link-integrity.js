import { Then } from "@badeball/cypress-cucumber-preprocessor";
import homeAssertions from "../../assertions/HomeAssertions";

Then("no link on the page is missing a destination", () => {
  homeAssertions.homepageHasNoDeadLinks();
});

Then("no two items on the page with different labels point to the same destination", () => {
  homeAssertions.homepageHasNoDuplicateDestinations();
});
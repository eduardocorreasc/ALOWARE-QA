import { Then } from "@badeball/cypress-cucumber-preprocessor";
import homeAssertions from "../../assertions/HomeAssertions";

Then("every free trial button leads to the signup page", () => {
  homeAssertions.trialButtonsLeadToSignup();
});

Then("every demo button leads to the demo booking page", () => {
  homeAssertions.demoButtonsLeadToDemoPage();
});
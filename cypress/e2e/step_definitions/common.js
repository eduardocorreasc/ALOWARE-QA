import { Given } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../pages/HomePage";

Given("a visitor opens the Aloware homepage", () => {
  homePage.visit();
});
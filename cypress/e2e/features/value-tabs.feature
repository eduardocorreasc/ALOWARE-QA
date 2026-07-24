Feature: Value proposition tabs

  The tab section carries the product story. If a tab does not switch,
  the visitor reads the wrong content and never notices.

  Scenario: P-11 Selecting a tab replaces the content of the previous one
    Given a visitor opens the Aloware homepage
    And exactly one tab is selected in the value proposition section
    When the visitor selects the "Automate outreach" tab
    Then the "Automate outreach" tab is the selected one
    And exactly one tab panel is visible
    And the visible tab content mentions "Automate outreach with CRM data"
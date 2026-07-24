Feature: Conversion call to action buttons

  The homepage exists to move a visitor into one of two conversion paths.
  Every call to action must lead where it promises.

  Scenario: P-04 Every free trial button leads to the signup page
    Given a visitor opens the Aloware homepage
    Then every free trial button leads to the signup page

   Scenario: P-05 Every demo button leads to the demo booking page
    Given a visitor opens the Aloware homepage
    Then every demo button leads to the demo booking page
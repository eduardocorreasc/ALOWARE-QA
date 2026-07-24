Feature: Link integrity

  A link that leads nowhere, or somewhere unexpected, wastes the visit
  that was already paid for.

  # Both scenarios below fail on purpose. They report defects that are
  # open on the live site, documented in the test scenarios document.

  @known-issue @bug-02
  Scenario: P-16 No link on the homepage is missing a destination
    This scenario is expected to fail. It reports BUG-02, the "Marketing"
    card in the "Built for teams" section, which has no destination. It
    also reports the carousel controls and the testimonial logos, which
    are anchors used as buttons.

    Given a visitor opens the Aloware homepage
    Then no link on the page is missing a destination

  @known-issue @bug-01
  Scenario: P-16 No two links share a destination under different labels
    This scenario is expected to fail. It reports BUG-01, where the Zapier
    entry in the Integrations menu resolves to the Facebook integration page.

    Given a visitor opens the Aloware homepage
    Then no two items on the page with different labels point to the same destination
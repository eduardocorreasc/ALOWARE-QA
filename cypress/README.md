# Aloware.com Landing Page: E2E Test Automation

Cypress automation for the `https://aloware.com/` homepage, written in JavaScript with Cucumber (Gherkin) and a Page Object architecture.

This repository is the automation part of a three part deliverable:

| Document | Content |
|---|---|
| `01-Aloware-Landing-Page-Test-Scenarios` | The 32 test scenarios, in Given/When/Then, with the defects found |
| `02-Aloware-Landing-Page-Test-Plan` | Strategy, environments, risks, entry and exit criteria, defect workflow, metrics |
| This repository | The automated subset of those scenarios |

---

## What is automated

Five scenarios are automated, covering the three cases selected in the test plan plus one that came free from the same helper.

| ID | Scenario | Feature file | Result |
|---|---|---|---|
| P-04 | Every free trial button leads to the signup page | `conversion-ctas.feature` | Passing |
| P-05 | Every demo button leads to the demo booking page | `conversion-ctas.feature` | Passing |
| P-11 | Selecting a tab replaces the content of the previous one | `value-tabs.feature` | Passing |
| P-16 | No link on the homepage is missing a destination | `link-integrity.feature` | **Failing by design** |
| P-16 | No two links share a destination under different labels | `link-integrity.feature` | **Failing by design** |

The two failing scenarios report open defects on the live site. See [Known defects](#known-defects).

### Why these

**P-04** protects the primary revenue path. It also demonstrates asserting over a collected set of elements rather than a single fixed button.

**P-11** is the most state dependent component on the page and the likeliest place for a regression to go unnoticed.

**P-16** catches both reported defects and the same check runs unchanged on any page of the site.

---

## Getting started

### Prerequisites

- Node.js 22 or later
- npm

### Install

```bash
git clone https://github.com/eduardocorreasc/ALOWARE-QA.git
cd ALOWARE-QA
npm ci
```

`npm ci` installs the exact versions locked in `package-lock.json`. Use it instead of `npm install` so that a local run and a CI run resolve to the same dependency tree.

### Run

| Command | What it does |
|---|---|
| `npm run cy:open` | Opens the Cypress runner, with the browser visible |
| `npm test` | Runs everything headless, including the known defects |
| `npm run test:regression` | Runs everything except the known defects. This is what CI runs |
| `npm run test:known-issues` | Runs only the scenarios that report open defects |

Reports are written to `cypress/reports/` and are not versioned. Open `cypress/reports/cucumber-report.html` after a headless run.

---

## Project structure

```
cypress/
├── e2e/
│   ├── features/              Gherkin scenarios, one file per subject
│   │   ├── conversion-ctas.feature
│   │   ├── link-integrity.feature
│   │   └── value-tabs.feature
│   └── step_definitions/      Glue between a sentence and the code
│       ├── common.js          Steps shared across features
│       ├── conversion-ctas.js
│       ├── link-integrity.js
│       └── value-tabs.js
├── pages/                     How to reach and interact with a page
│   ├── BasePage.js
│   └── HomePage.js
├── assertions/                What must be true
│   ├── BaseAssertions.js
│   └── HomeAssertions.js
├── support/
│   ├── helpers/urls.js        Pure functions, no page access
│   └── routes.js              Route constants
└── fixtures/                  Static test data
```

The flow of a single scenario:

```
feature  →  step definition  →  assertion  →  page object  →  the page
 what          the glue        the criteria    the access
```

Each layer has one reason to change. A moved selector is a page object edit. A changed acceptance criterion is an assertion edit. Reworded business language is a feature file edit. None of the three touches the others.

---

## Architecture decisions

### Page Object, and why not App Actions

Cypress' own guidance often favours App Actions over Page Objects, on the grounds that page objects couple tests to the UI and hide what is being exercised. That criticism is fair when it applies.

It does not apply here. App Actions require access to the application's internal state, and this suite tests a public marketing site from the outside, with no hooks available. Page Object is the appropriate pattern in this context.

### A separate assertion layer

Page objects answer *how do I reach this*. Assertions answer *what must be true*. Keeping them apart means a selector change never touches acceptance criteria, and a criteria change never touches selectors.

Both layers use the same base and specialisation split (`BasePage`/`HomePage`, `BaseAssertions`/`HomeAssertions`), so the project reads predictably.

One known cost: an assertion behind a named method produces a poorer failure message than an inline one. This is mitigated by passing an explicit message to every assertion, so failures read as `link "Marketing" has no destination` rather than a generic comparison.

### Cucumber

The `.feature` files are a literal copy of the scenarios in document 01. A reviewer can put the document and the code side by side and match them sentence by sentence, which is the point of separating the two deliverables in the first place.

The alternative, structuring Given/When/Then inside plain `describe` blocks, avoids a dependency but loses that literal correspondence.

### Selector strategy

The site exposes no `data-cy` or `data-testid` attributes and is tested from the outside, so selectors follow this order of preference:

1. **Destination attributes** such as `href`. Changes only when behaviour changes.
2. **Framework classes** such as `.w-tab-link`. Stable because altering them would break the component.
3. **Visible text**, via `cy.contains()`. Readable, but breaks on a copy edit.

Selecting the demo buttons by `href` rather than by text was not a habit. The five buttons carry three different labels (`Get a Demo`, `Book your demo`, `Book a demo`), so a text based selector would need three patterns and would break on any copy change. The destination is what the scenario actually verifies.

### Attribute or property

`.attr()` returns the raw HTML value. `.prop()` returns the value the browser resolved. The suite uses both, deliberately:

- **P-04 and P-05 use `.prop()`.** The trial buttons mix relative and absolute URLs in the markup, so the resolved value is the only one that normalises across all three.
- **P-16 uses `.attr()`.** An `href="#"` resolves to the full current URL as a property, which would hide the defect entirely. Only the raw value exposes it.

### Guarding against vacuous passes

Every assertion over a collection is preceded by a length check. Without it, a selector that matches nothing iterates zero times, asserts nothing, and reports green. A suite that passes without testing anything is worse than no suite, because it produces false confidence.

---

## Known defects

Both were found during exploratory testing and both are reproduced by the automation. They are tagged so they can be excluded from a regression run without being removed from the code.

### BUG-01: the Zapier integration link opens the Facebook page

**Severity:** High · **Tag:** `@bug-01` · **Covered by:** P-16, duplicate destinations

Open the homepage, open the Integrations menu, click Zapier. The Facebook integration page opens. Both menu entries resolve to `/integrations/facebook`.

Zapier is a high intent term for this audience. A visitor evaluating that specific integration lands on the wrong product.

The automation reports it as:

```
"Zapier" and "Facebook" both point to /integrations/facebook
```

### BUG-02: the Marketing card does nothing when clicked

**Severity:** High · **Tag:** `@bug-02` · **Covered by:** P-16, dead links

Open the homepage, scroll to "Built for teams that value connection", click the Marketing card. Nothing happens. The card is rendered with `href="#"`, while Sales, Operation and Support all link to their solutions pages.

One of four audience segments has no way forward from a section built specifically to route visitors by role.

The same scenario also reports the testimonial carousel controls and the testimonial logo thumbnails, which are anchors used as buttons. Those are a lower severity accessibility concern rather than a broken path, and are classified separately when reported. The automation stays strict and reports everything; deciding impact is the tester's job, not the script's.

---

## Continuous integration

`.github/workflows/e2e.yml` runs on every pull request and can be triggered manually from the Actions tab.

The pipeline runs `npm run test:regression`, which excludes the two scenarios tagged `@known-issue`.

**Why exclude them.** A suite that is permanently red stops being read. After a couple of weeks of "that's just the usual failure", nobody notices when a new one appears. The defects stay documented in the code, stay executable through `npm run test:known-issues`, and are described above. What the pipeline reports is whether a *new* regression was introduced, which is the only thing it can usefully mean.

Excluded scenarios appear as **pending** in the run summary rather than vanishing, so the count still signals that something is being skipped on purpose.

The Cucumber report is published as a build artifact on every run, and screenshots are published when a run fails.

---

## Pointing the suite at another environment

`baseUrl` reads from an environment variable and falls back to production:

```js
baseUrl: process.env.CYPRESS_BASE_URL || "https://aloware.com",
```

```bash
# macOS and Linux
CYPRESS_BASE_URL=https://staging.example.com npm test

# Windows PowerShell
$env:CYPRESS_BASE_URL="https://staging.example.com"; npm test
```

Route paths are constants in `cypress/support/routes.js`, since they are the same across environments. Expected URLs are composed from `baseUrl` plus a route at runtime, so no full URL is hardcoded in any test.

---

## Notes from the investigation

Observations gathered while building the suite. None are defects, but each one informed a decision in the code.

**The trial CTAs mix relative and absolute URLs.** Two are written as `/signup`, one as `https://aloware.com/signup`. Visitors reach the same page either way, so there is no user impact, but an exact match selector finds only two of the three. The suite uses partial matching on the attribute and exact matching on the resolved property.

**There is only one tab component on the page.** `.w-tab-link` matches exactly six elements, so the selector needs no container scoping. The mega menu uses `tab` in several class names but not that one.

**The active state is exposed by the framework.** `w--current` marks the selected tab and `w--tab-active` marks the visible panel, which is what P-11 asserts against.

**P-11 asserts on visible copy.** Checking that only one panel is visible does not prove the *right* panel is visible, so the scenario also asserts on text specific to the selected tab. This couples the test to marketing copy and will need an update if that heading is rewritten. That was accepted knowingly: a test that passes without verifying what it claims to verify is worse than one that needs occasional maintenance.

**Site wide link checking is out of scope for this suite.** P-16 reads the DOM of one page, which is fast and stable and catches both reported defects. Requesting every destination across every page is a crawler's job, and keeping it out of Cypress keeps the suite fast and free of failures caused by third party sites.

---

## Tech stack

| Tool | Purpose |
|---|---|
| Cypress | Browser automation |
| @badeball/cypress-cucumber-preprocessor | Gherkin support and reporting |
| @bahmutov/cypress-esbuild-preprocessor | Bundling |
| GitHub Actions | CI |

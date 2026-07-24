# Aloware.com Landing Page Test Plan

**Scope:** `https://aloware.com/` homepage
**Version:** 1.0

---

## 1. Objective and scope

The purpose of testing this page is narrow and measurable: confirm that a visitor who arrives can reliably reach one of the two conversion paths the page exists to serve, and that this holds on the browsers, devices and network conditions the audience actually uses.

**In scope**

- The homepage and every interactive component on it
- The first successful submission on the signup page and on the demo booking page
- Non-functional attributes: responsive layout, accessibility, loading speed, marketing tracking, cross-browser consistency

**Out of scope**

- The rest of the signup funnel and the Aloware product itself
- The admin and agent applications, the knowledge base and the blog

**Test basis:** the live page, the business goal of lead capture, WCAG 2.1 AA, and Core Web Vitals thresholds.

The scenario set is "01-Aloware-Landing-Page-Test-Scenarios". This plan describes how that set is used.

---

## 2. Test strategy

The approach is risk-based. The 32 scenarios are prioritised P0 to P2 by their effect on lead capture, not by how visible the defect is. A misaligned image is obvious and costs nothing. A trial button pointing to the wrong page is invisible in a screenshot and costs every lead that clicked it.

**Levels of execution**

| Level | Contents | When it runs |
|---|---|---|
| Smoke | P0 scenarios only | On every publish and on a schedule |
| Regression | The full suite | Before any planned release |
| Exploratory | Timeboxed session against changed sections | Suggested after a significant content change |

**What is automated and what is not**

Automated: navigation and menu behaviour, CTA destinations, link and image integrity, tab switching, accessibility scanning, responsive layout at each breakpoint.

Manual: visual correctness, copy review, screen reader behaviour, and anything that requires a judgement about whether the page looks right rather than whether it works.

The division is deliberate. Automation defends against regression; it does not discover problems nobody anticipated. A suite of only automated checks will pass happily on a page that has become ugly, confusing or off-brand.

**Beyond the interface.** The two form submissions in scope are not only screen behaviour. Each one sends a request to an endpoint and reacts to the response, which means a submission can look successful on screen while the request never reached its destination, or look like a failure while the lead was in fact created. Asserting on the request and the response alongside the visible result closes that gap, and Cypress can intercept both without any additional tooling.

---

## 3. Environments and coverage

**Environment.** To be confirmed with the team. If a pre-production environment is available, it is the correct target for anything that writes data, and the form submission tests belong there. Until that is settled, this plan assumes production as the target, which carries two consequences: every check is read-only apart from form submissions, and those submissions use a dedicated QA identity agreed with marketing operations in advance, so that test data does not reach the sales pipeline as real leads.

**Browsers.** Chrome, Firefox, Edge and Safari, latest two versions of each. The automated suite runs on Chrome; the others are covered by the cross-browser scenario before each release.

**Viewports.** The breakpoints defined in the site's own stylesheet, cross-checked against the most common screen sizes in the site analytics. Until both are confirmed, the suite runs at 320, 375, 768, 1024, 1440 and 1920 pixels wide as a starting point.

**Tooling.** Cypress for functional automation, which includes checking the links on the homepage itself. Covering the remaining pages of the site is a separate job and is handled by a dedicated link crawler, described in the daily coverage strategy; sweeping an entire site is what a crawler is built for, and keeping that outside the test suite keeps the suite fast.

For accessibility, no tool is imposed here. If one is needed, cypress-axe is the natural candidate given that the automation already runs on Cypress. For performance, the plan uses whichever tool the team already relies on rather than introducing another one alongside it.

---

## 4. Risks and mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Page content changes between test cycles without notice, so tests break or a defect reaches visitors unnoticed | High | High | Scheduled smoke run with failure alerting, so the gap between publish and detection is hours rather than weeks |
| The page has no dedicated test attributes, so selectors depend on visible text and link targets | Medium | High | Prefer role and destination over text where possible, and keep every selector in one file so a copy change is a one-line fix |
| Test submissions pollute the sales pipeline with fake leads | High | Medium | Dedicated QA email identity, filtered out by agreement with marketing operations |
| Automated coverage runs on Chrome, so a Safari-specific layout defect can ship | Medium | Medium | Manual cross-browser pass before each release, weighted towards Safari on iOS |

---

## 5. Entry and exit criteria

**Entry criteria**

- The change is published and the page loads
- The QA test identity is available for form submissions
- The scenario set has been reviewed against any new or changed section, and extended if the change introduced something the suite does not cover

**Exit criteria**

- Every P0 scenario passes
- No open P0 defect
- Open P1 defects are accepted explicitly and in writing by the product owner
- Open P2 defects are recorded in the backlog with an owner and a target date
- The accessibility scan reports no critical or serious violations, or each remaining violation is documented as an accepted exception

**Why not zero defects.** A gate that demands zero open defects tends to fail in one of two ways: it blocks a release over something cosmetic, or it gets waived the first time it becomes inconvenient, and after that it no longer means anything. Graduated tolerance keeps the gate enforceable, and an enforceable gate is the only kind that changes what actually ships.

---

## 6. Defect workflow and levels

Defect levels use the same scale as scenario priority, so the test set and the defect tracker share one vocabulary.

| Level | Definition | Expected response |
|---|---|---|
| P0 | A conversion path is broken, the page does not load, or tracking is dead | Fixed immediately, outside the normal cycle |
| P1 | A section is unusable, or a link sends the visitor to the wrong place | Fixed within the current cycle |
| P2 | A visible defect that the visitor can work around, or a cosmetic issue | Backlog, with an owner and a date |

**Flow.** A defect is logged with steps to reproduce, expected result, actual result, evidence, and a sentence on the business impact. It is then triaged with the product owner, assigned, fixed, retested, and closed.

Closing carries one extra obligation: if the defect was not caught by an existing scenario, the scenario set is updated before the defect is closed. Every escape is a gap in the suite, and a gap that nobody closes will be found again by a customer rather than by us.

---

## 7. Metrics and reporting

Reported on every run:

- **Pass rate, split by priority.** An overall pass rate is misleading on its own. A run at 97% with one failing P0 is a failed run.
- **Defects found, by severity and by source.** Tracking whether automation or exploratory testing found each defect shows which of the two is actually earning its time.
- **Suite duration and flaky test count.** A slow or unreliable suite gets ignored, and an ignored suite is worse than none, because it creates false confidence.
- **Accessibility violations over time.** A single count means little; the trend shows whether the page is drifting.
- **Core Web Vitals trend**, measured on a mobile profile rather than a desktop one.

**Cadence.** An automated summary is published by the reporting tool on every run. A short written summary goes to the product owner before each release, covering what was tested, what failed, and what is being accepted knowingly.

# Aloware.com Landing Page Test Scenarios

**Scope:** `https://aloware.com/` homepage
**Version:** 1.0

---

## 1. Scope and approach

The homepage exists to turn a visitor into a lead. Everything on it, from the hero to the menus, the tabs and the testimonials, serves one of two outcomes: starting a free trial or booking a demo. I prioritised the scenarios accordingly: **the conversion paths first**, then the interactive components most likely to break, then the qualities that quietly cost conversions (a page that is slow, unreadable on a phone, or unusable with a keyboard).

Thirty-two scenarios are listed below. This is not exhaustive coverage. It is the set I would run as the gate before releasing a change to this page, selected by risk rather than by completeness.

**Where the scope ends.** The homepage is responsible up to the first successful submission on each of the two pages it feeds: the signup form and the demo form. A page that sends all of its traffic into a broken form has failed at its purpose, even when every button on it works. Everything past that first submission, meaning the rest of the signup funnel and the product itself, is out of scope here.

**Priority:**

| | |
|---|---|
| **P0** | Breaks the path to becoming a lead |
| **P1** | Damages the experience or the credibility of the page |
| **P2** | Noticeable problem, but the visitor can still get where they need to go |


---

## 2. Positive functional scenarios

The journeys the page was built for, plus the page-wide checks that confirm nothing on it is broken. A failure here means a visitor cannot do what we brought them here to do.

| ID | Area | Pri | Scenario |
|---|---|---|---|
| **P-01** | Hero | P0 | **GIVEN** a visitor arrives on the homepage<br>**THEN** the main headline and its supporting text are visible without scrolling<br>**AND** both the "Start free trial" and "Get a demo" buttons are visible without scrolling<br>**AND** the page displays no error message or empty section |
| **P-02** | Hero | P0 | **GIVEN** a visitor is on the homepage<br>**WHEN** the visitor clicks "Start free trial" at the top of the page<br>**THEN** the visitor arrives on the signup page<br>**AND** the signup form is ready to be filled in |
| **P-03** | Hero | P0 | **GIVEN** a visitor is on the homepage<br>**WHEN** the visitor clicks "Get a demo" at the top of the page<br>**THEN** the visitor arrives on the demo booking page<br>**AND** the demo form is ready to be filled in |
| **P-04** | Conversion | P0 | **GIVEN** a visitor is on the homepage<br>**WHEN** the visitor uses any of the "Start free trial" buttons on the page<br>**THEN** every one of them leads to the same signup page |
| **P-05** | Conversion | P0 | **GIVEN** a visitor is on the homepage<br>**WHEN** the visitor uses any of the demo buttons: "Get a Demo", "Book a demo" or "Book your demo"<br>**THEN** every one of them leads to the demo booking page |
| **P-06** | Signup | P0 | **GIVEN** a visitor reached the signup page from the homepage<br>**WHEN** the visitor fills in every required field correctly and submits<br>**THEN** the account is created<br>**AND** the visitor is taken into the free trial instead of being left on the form |
| **P-07** | Demo form | P0 | **GIVEN** a visitor reached the demo page from the homepage<br>**WHEN** the visitor fills in every required field correctly and submits<br>**THEN** a confirmation message is displayed<br>**AND** the visitor is not sent back to an empty form |
| **P-08** | Navigation | P1 | **GIVEN** a visitor is browsing on a computer<br>**WHEN** the visitor opens the "Products" menu<br>**THEN** the full product list is displayed<br>**WHEN** the visitor moves away from the menu<br>**THEN** the menu closes |
| **P-09** | Navigation | P1 | **GIVEN** a visitor is browsing on a phone<br>**WHEN** the visitor opens the menu<br>**THEN** the menu opens and all main sections can be reached<br>**WHEN** the visitor closes the menu<br>**THEN** the menu closes and the visitor can scroll the page again |
| **P-10** | Navigation | P1 | **GIVEN** a visitor has navigated to another page from the menu<br>**WHEN** the visitor clicks the Aloware logo<br>**THEN** the visitor returns to the homepage |
| **P-11** | Content tabs | P1 | **GIVEN** a visitor reaches the "Pick up every call" section<br>**AND** one tab is already selected<br>**WHEN** the visitor selects a different tab<br>**THEN** the text, image and buttons for that tab are displayed<br>**AND** the content of the previous tab is no longer shown |
| **P-12** | Content tabs | P1 | **GIVEN** a visitor opens each of the six tabs in that section<br>**THEN** each tab offers two buttons<br>**AND** each button takes the visitor to a real page |
| **P-13** | Testimonials | P1 | **GIVEN** a visitor reaches the customer testimonials<br>**WHEN** the visitor clicks the forward arrow<br>**THEN** a different testimonial is shown, with the customer's name, role and company<br>**WHEN** the visitor clicks the back arrow<br>**THEN** the previous testimonial is shown again |
| **P-14** | Product cards | P1 | **GIVEN** a visitor reaches the "all-in-one, compliant contact center" section<br>**THEN** all eight product cards are displayed with a title and a description<br>**AND** each card takes the visitor to its own product page |
| **P-15** | Footer | P1 | **GIVEN** a visitor reaches the footer<br>**THEN** the sales phone number can be tapped to start a call<br>**AND** the sales email can be tapped to open an email<br>**AND** the Privacy Policy and Terms links open their documents |
| **P-16** | Broken links | P0 | **GIVEN** a visitor is on the homepage<br>**WHEN** the visitor clicks any link, button or card on the page<br>**THEN** each one takes the visitor somewhere real<br>**AND** none of them does nothing when clicked<br>**AND** no two items on the page with different labels point to the same destination |
| **P-17** | Images | P1 | **GIVEN** a visitor scrolls through the whole homepage<br>**THEN** every image, logo and badge is displayed correctly<br>**AND** no broken-image placeholder appears anywhere on the page |

---

## 3. Negative functional scenarios

What happens when the visitor does something unexpected. Both destinations the homepage feeds are covered, since a broken form on either one wastes every click that got the visitor there.

| ID | Area | Pri | Scenario |
|---|---|---|---|
| **N-01** | Demo form | P0 | **GIVEN** a visitor is on the demo booking page<br>**WHEN** the visitor submits the form leaving a required field empty<br>**THEN** a message shows which field is missing<br>**AND** the form is not sent<br>**AND** everything the visitor already typed is still there |
| **N-02** | Demo form | P0 | **GIVEN** a visitor is on the demo booking page<br>**WHEN** the visitor enters an email address that is not a valid one and submits<br>**THEN** a message explains that the email address is not valid<br>**AND** no lead is created |
| **N-03** | Demo form | P1 | **GIVEN** a visitor is on the demo booking page<br>**WHEN** the visitor submits the same form repeatedly within a short period<br>**THEN** the page stops accepting the repeated submissions<br>**AND** the sales team does not receive the same lead several times |
| **N-04** | Signup | P0 | **GIVEN** a visitor is on the signup page<br>**WHEN** the visitor tries to create an account with an email address that is already registered<br>**THEN** a message explains that the account already exists<br>**AND** the visitor is offered a way to log in instead<br>**AND** no duplicate account is created |
| **N-05** | Signup | P0 | **GIVEN** a visitor is on the signup page<br>**WHEN** the visitor enters a password that does not meet the required rules<br>**THEN** the rules are shown clearly<br>**AND** the account is not created until the password is acceptable |
| **N-06** | Signup | P1 | **GIVEN** a visitor is on the signup page<br>**WHEN** the visitor submits the form with a required field left empty<br>**THEN** a message shows which field is missing<br>**AND** the visitor is not taken to a broken or empty page |
| **N-07** | Both forms | P0 | **GIVEN** a visitor is on the demo booking page or the signup page<br>**WHEN** the visitor types text that looks like programming code into a text field and submits<br>**THEN** the page treats it as ordinary text<br>**AND** nothing unexpected happens on screen<br>**AND** no technical error message is shown to the visitor |
| **N-08** | Error page | P2 | **GIVEN** a visitor follows an old or mistyped link to a page that no longer exists<br>**THEN** an Aloware-branded "page not found" message is shown instead of a blank or generic error<br>**AND** the visitor is offered a way back to the site |

---

## 4. Non-functional scenarios

Qualities of the page rather than things it does. None of these appear in a requirements list, and all of them cost leads when they fail.

| ID | Area | Pri | Scenario |
|---|---|---|---|
| **NF-01** | Screen sizes | P0 | **GIVEN** a visitor opens the homepage on a small phone, a large phone, a tablet and a desktop screen<br>**THEN** the page fits the screen at every size<br>**AND** the visitor never has to scroll sideways to read the content<br>**AND** no text or image is cut off or overlapping |
| **NF-02** | Phone usability | P1 | **GIVEN** a visitor is browsing on a phone<br>**THEN** every button and link is large enough to be tapped comfortably<br>**AND** no two tappable elements are so close together that the wrong one is hit |
| **NF-03** | Accessibility | P0 | **GIVEN** a visitor uses assistive technology such as a screen reader<br>**WHEN** the visitor moves through the homepage<br>**THEN** the page has no critical or serious accessibility problems<br>**AND** the headings describe the page structure in a logical order<br>**AND** every meaningful image is described in a way that matches what it shows |
| **NF-04** | Keyboard | P1 | **GIVEN** a visitor navigates using only the keyboard, without a mouse<br>**WHEN** the visitor moves through the page<br>**THEN** every button, link and menu can be reached and used<br>**AND** it is always clearly visible which element is currently selected<br>**AND** the visitor never gets stuck in a menu or carousel with no way out |
| **NF-05** | Speed | P0 | **GIVEN** a visitor opens the homepage on a mobile connection<br>**THEN** the main content appears quickly enough that the visitor does not abandon the page<br>**AND** the content does not jump around while the page finishes loading<br>**AND** the buttons become usable before all the decorative images have loaded |
| **NF-06** | Marketing tracking | P0 | **GIVEN** a visitor arrives from a marketing campaign<br>**WHEN** the visitor clicks "Start free trial" or "Get a demo"<br>**THEN** the click is recorded so the marketing team can measure it<br>**AND** the campaign the visitor came from is still known on the next page |
| **NF-07** | Browsers | P1 | **GIVEN** a visitor uses Chrome, Firefox, Edge or Safari<br>**WHEN** the visitor opens a menu, switches a tab, browses the testimonials and clicks a main button<br>**THEN** the page looks and behaves the same way in each browser |

---

## 5. Defects found during exploratory testing

Both confirmed on the live page.

### BUG-01. The Zapier integration link opens the Facebook page
**Severity:** High · **Related scenario:** P-16

*Steps:* open the homepage → open the "Integrations" menu → click "Zapier".
*Expected:* the Zapier integration page opens.
*Actual:* the Facebook integration page opens. Both menu items point to the same destination.
*Impact:* Zapier is a high-intent term for this audience. A visitor evaluating that specific integration lands on the wrong product and is likely to leave.

### BUG-02. The "Marketing" card does nothing when clicked
**Severity:** High · **Related scenario:** P-16

*Steps:* open the homepage → scroll to "Built for teams that value connection" → click the "Marketing" card.
*Expected:* the marketing solutions page opens, as it does for Sales, Operation and Support.
*Actual:* nothing happens. The visitor stays on the homepage.
*Impact:* one of the four audience segments has no way forward from a section built specifically to route visitors by their role.

---

## 6. Scenarios selected for the Cypress demonstration

| Scenario | What it covers | Why |
|---|---|---|
| **P-04** | Every "Start free trial" button leads to signup. | The page's primary revenue path. It also demonstrates checking a whole group of elements at once rather than one fixed button. |
| **P-11** | The tab section switches its content correctly. | The most interactive component on the page and the likeliest place for a regression to appear unnoticed. |
| **P-16** | Nothing on the page is broken or dead. | Catches both defects reported above, and the same check runs unchanged on any page of the site. |

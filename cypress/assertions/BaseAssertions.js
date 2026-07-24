import { fullUrl } from "../support/helpers/urls";

class BaseAssertions {
  allLinksPointTo(elements, route) {
    elements.should("have.length.at.least", 1).each(($link) => {
      expect($link.prop("href")).to.equal(fullUrl(route));
    });
  }

  noDeadLinks(elements) {
    const DEAD = ["", "#", "javascript:void(0)"];
    const MAX_LABEL = 60;

    elements.should("have.length.at.least", 1).then(($links) => {
      const offenders = [];

      $links.each((_, link) => {
        const href = link.getAttribute("href");

        if (href === null) return;
        if (!DEAD.includes(href)) return;

        const raw = link.textContent.replace(/\s+/g, " ").trim();
        const label = raw
          ? raw.length > MAX_LABEL
            ? `${raw.slice(0, MAX_LABEL)}…`
            : raw
          : "(no text)";

        offenders.push(`"${label}" → href="${href}"`);
      });

      expect(
        offenders,
        `${offenders.length} dead link(s) found:\n  ${offenders.join("\n  ")}`
      ).to.have.length(0);
    });
  }

  noDuplicateDestinations(elements) {
    elements.then(($links) => {
      const seen = new Map();

      $links.each((_, link) => {
        const href = link.getAttribute("href");
        const label = link.textContent.trim();

        if (!href || !label) return;

        if (seen.has(href) && seen.get(href) !== label) {
          throw new Error(
            `"${label}" and "${seen.get(href)}" both point to ${href}`
          );
        }
        seen.set(href, label);
      });
    });
  }
}

export default BaseAssertions;
import { getLocalStorage, setLocalStorage } from "./utils.js";

export function initYearToggles() {
  const yearToggles = document.querySelectorAll(".year-toggle");
  const yearBatches = document.querySelectorAll(".year-batches");

  if (yearToggles.length === 0) {
    return;
  }

  // Get saved collapsed years from localStorage
  const savedCollapsedYears = getLocalStorage("collapsedYears", []);

  // Get current page year if viewing a batch
  let currentYear = null;
  const pageYearAttr = document.body.getAttribute("data-page-year");
  if (pageYearAttr) {
    currentYear = parseInt(pageYearAttr);
  }

  // Initialize year groups
  yearToggles.forEach(function (toggle) {
    const year = toggle.getAttribute("data-year");
    const batches = document.querySelector(
      '.year-batches[data-year="' + year + '"]'
    );
    const chevron = toggle.querySelector(".year-chevron");

    if (!batches || !chevron) {
      return;
    }

    // Check if this year should be collapsed
    const shouldCollapse =
      savedCollapsedYears.includes(year) && currentYear !== parseInt(year);

    if (shouldCollapse) {
      batches.classList.add("year-collapsed");
      toggle.setAttribute("aria-expanded", "false");
      chevron.style.transform = "rotate(-90deg)";
    } else {
      // Auto-expand current year
      batches.classList.remove("year-collapsed");
      toggle.setAttribute("aria-expanded", "true");
      chevron.style.transform = "rotate(0deg)";
    }

    // Add click handler
    toggle.addEventListener("click", function () {
      const isCollapsed = batches.classList.contains("year-collapsed");
      const collapsedYears = [...savedCollapsedYears];

      if (isCollapsed) {
        batches.classList.remove("year-collapsed");
        toggle.setAttribute("aria-expanded", "true");
        chevron.style.transform = "rotate(0deg)";
        // Remove from collapsed years
        const index = collapsedYears.indexOf(year);
        if (index > -1) {
          collapsedYears.splice(index, 1);
        }
      } else {
        batches.classList.add("year-collapsed");
        toggle.setAttribute("aria-expanded", "false");
        chevron.style.transform = "rotate(-90deg)";
        // Add to collapsed years
        if (!collapsedYears.includes(year)) {
          collapsedYears.push(year);
        }
      }

      // Save to localStorage
      setLocalStorage("collapsedYears", collapsedYears);
    });
  });
}

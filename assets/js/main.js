import { initSidebar } from "./sidebar.js";
import { initYearToggles } from "./yearToggles.js";
import { initDarkMode } from "./darkMode.js";
import "./embedModal.js";

// Initialize all modules when DOM is ready
function init() {
  initSidebar();
  initYearToggles();
  initDarkMode();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

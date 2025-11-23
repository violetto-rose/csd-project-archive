import { isMobile, getLocalStorage, setLocalStorage } from "./utils.js";

export function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  const mobileToggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const toggleIcon = toggleBtn?.querySelector("span");
  const mobileToggleIcon = mobileToggleBtn?.querySelector("span");

  if (!sidebar || !toggleBtn || !mobileToggleBtn || !mobileOverlay) {
    return;
  }

  // Check localStorage for saved state (desktop only)
  const savedState = getLocalStorage("sidebarCollapsed", false);
  const isCollapsed = savedState === true && !isMobile();

  // Initialize sidebar state (desktop only)
  if (isCollapsed && !isMobile()) {
    sidebar.classList.add("sidebar-collapsed");
    if (toggleIcon) {
      toggleIcon.textContent = "menu";
    }
  }

  // Function to check if sidebar is open on mobile
  function isMobileSidebarOpen() {
    return !sidebar.classList.contains("-translate-x-full");
  }

  // Function to open mobile sidebar
  function openMobileSidebar() {
    sidebar.classList.remove("-translate-x-full");
    mobileOverlay.classList.remove(
      "opacity-0",
      "invisible",
      "pointer-events-none"
    );
    mobileOverlay.classList.add(
      "opacity-100",
      "visible",
      "pointer-events-auto"
    );
    mobileToggleBtn.classList.add("hidden");
    document.body.style.overflow = "hidden";
  }

  // Function to close mobile sidebar
  function closeMobileSidebar() {
    sidebar.classList.add("-translate-x-full");
    mobileOverlay.classList.remove(
      "opacity-100",
      "visible",
      "pointer-events-auto"
    );
    mobileOverlay.classList.add(
      "opacity-0",
      "invisible",
      "pointer-events-none"
    );
    mobileToggleBtn.classList.remove("hidden");
    document.body.style.overflow = "";
  }

  // Expose function globally for onclick handlers
  window.closeMobileSidebar = closeMobileSidebar;

  // Desktop toggle (collapse/expand)
  toggleBtn.addEventListener("click", function (e) {
    if (isMobile()) {
      e.preventDefault();
      closeMobileSidebar();
      return;
    }

    sidebar.classList.toggle("sidebar-collapsed");
    const collapsed = sidebar.classList.contains("sidebar-collapsed");

    // Save state to localStorage (desktop only)
    setLocalStorage("sidebarCollapsed", collapsed);

    // Update icon
    if (toggleIcon) {
      toggleIcon.textContent = collapsed ? "menu" : "menu_open";
    }
  });

  // Mobile menu toggle
  mobileToggleBtn.addEventListener("click", function () {
    if (isMobileSidebarOpen()) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  // Close sidebar when clicking overlay
  mobileOverlay.addEventListener("click", function () {
    closeMobileSidebar();
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const nowMobile = isMobile();
      const savedCollapsed = getLocalStorage("sidebarCollapsed", false);

      if (!nowMobile && isMobileSidebarOpen()) {
        // If switching to desktop, close mobile sidebar
        closeMobileSidebar();
        // Apply desktop collapsed state if saved
        if (savedCollapsed) {
          sidebar.classList.add("sidebar-collapsed");
          if (toggleIcon) {
            toggleIcon.textContent = "menu";
          }
        }
      } else if (nowMobile) {
        // If switching to mobile, remove collapsed state and hide sidebar
        sidebar.classList.remove("sidebar-collapsed");
        closeMobileSidebar();
      }
    }, 100);
  });

  // Close mobile sidebar on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMobile() && isMobileSidebarOpen()) {
      closeMobileSidebar();
    }
  });
}

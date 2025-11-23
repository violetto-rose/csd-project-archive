// Utility functions
export function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    // Handle boolean strings from old localStorage format
    if (item === "true") return true;
    if (item === "false") return false;
    return JSON.parse(item);
  } catch (e) {
    return defaultValue;
  }
}

export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

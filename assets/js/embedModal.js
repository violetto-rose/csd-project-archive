/**
 * Embed Modal functionality
 * Handles opening/closing modal and embedding different document types
 */

// Convert various link types to embeddable URLs
function getEmbedUrl(url, type) {
  if (!url) return null;

  // Google Drive file links (PDFs, etc.)
  if (url.includes("drive.google.com/file/d/")) {
    // Extract file ID from URL pattern: /file/d/{FILE_ID}/view
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      // Convert to preview format for embedding
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    // If already in preview format, return as is
    if (url.includes("/preview")) {
      return url;
    }
  }

  // Google Docs
  if (url.includes("docs.google.com/document")) {
    // Convert view URL to embed URL
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      return `https://docs.google.com/document/d/${match[1]}/preview`;
    }
    // If already an embed URL, return as is
    if (url.includes("/preview")) {
      return url;
    }
  }

  // Google Slides
  if (url.includes("docs.google.com/presentation")) {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/preview`;
    }
    if (url.includes("/preview")) {
      return url;
    }
  }

  // PDF files (direct links)
  if (url.toLowerCase().endsWith(".pdf") || url.includes(".pdf?")) {
    return url;
  }

  // OneDrive/SharePoint
  if (url.includes("onedrive.live.com") || url.includes("sharepoint.com")) {
    // Try to convert to embed format
    if (url.includes("/redir?")) {
      const embedUrl = url.replace("/redir?", "/embed?");
      return embedUrl;
    }
    if (!url.includes("/embed")) {
      return url + (url.includes("?") ? "&" : "?") + "embed=true";
    }
  }

  // Dropbox
  if (url.includes("dropbox.com")) {
    // Convert to direct link for embedding
    if (url.includes("?dl=0")) {
      return url.replace("?dl=0", "?raw=1");
    }
    if (!url.includes("?raw=1") && !url.includes("?dl=1")) {
      return url + (url.includes("?") ? "&" : "?") + "raw=1";
    }
  }

  // For other URLs, try to embed directly
  return url;
}

// Get modal title and icon based on type
function getModalInfo(type) {
  const info = {
    journal: {
      title: "Journal",
      icon: "book",
    },
    ppt: {
      title: "Presentation",
      icon: "slideshow",
    },
    report: {
      title: "Report",
      icon: "description",
    },
  };
  return info[type] || { title: "Document", icon: "description" };
}

// Open the embed modal
export function openEmbedModal(url, type) {
  if (!url) return;

  const modal = document.getElementById("embed-modal");
  const iframe = document.getElementById("modal-iframe");
  const loading = document.getElementById("modal-loading");
  const titleText = document.getElementById("modal-title-text");
  const icon = document.getElementById("modal-icon");
  const externalLink = document.getElementById("modal-external-link");

  if (!modal || !iframe) return;

  // Set modal info
  const info = getModalInfo(type);
  titleText.textContent = info.title;
  icon.textContent = info.icon;
  externalLink.href = url;

  // Show loading
  loading.classList.remove("hidden");
  iframe.style.opacity = "0";

  // Get embed URL
  const embedUrl = getEmbedUrl(url, type);

  // Set iframe source
  iframe.src = embedUrl || url;

  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  // Hide loading when iframe loads
  iframe.onload = () => {
    loading.classList.add("hidden");
    iframe.style.opacity = "1";
  };

  // Handle iframe errors
  iframe.onerror = () => {
    loading.classList.remove("hidden");
    loading.innerHTML = `
      <div class="text-center">
        <span class="material-symbols-outlined text-4xl text-var-tertiary">error</span>
        <p class="mt-4 text-var-secondary">Unable to load document</p>
        <a href="${url}" target="_blank" class="mt-4 inline-block archive-btn">
          Open in New Tab
        </a>
      </div>
    `;
  };
}

// Close the embed modal
export function closeEmbedModal() {
  const modal = document.getElementById("embed-modal");
  const iframe = document.getElementById("modal-iframe");
  const loading = document.getElementById("modal-loading");

  if (!modal) return;

  // Hide modal
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";

  // Reset iframe
  iframe.src = "";
  iframe.onload = null;
  iframe.onerror = null;

  // Reset loading
  loading.classList.remove("hidden");
  loading.innerHTML = `
    <div class="text-center">
      <span class="material-symbols-outlined text-4xl text-var-tertiary animate-spin">
        hourglass_empty
      </span>
      <p class="mt-4 text-var-secondary">Loading document...</p>
    </div>
  `;
}

// Make functions globally available for onclick handlers
window.openEmbedModal = openEmbedModal;
window.closeEmbedModal = closeEmbedModal;

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("embed-modal");
    if (modal && !modal.classList.contains("hidden")) {
      closeEmbedModal();
    }
  }
});

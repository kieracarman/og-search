const toggle = document.getElementById("enableToggle");
const status = document.getElementById("status");
const searchCount = document.getElementById("searchCount");
const shareLink = document.getElementById("shareLink");

// Load current state and stats
async function loadState() {
  try {
    const result = await browser.storage.local.get([
      "enabled",
      "searchCount",
    ]);
    const enabled = result.enabled !== false;
    const count = result.searchCount || 0;

    toggle.checked = enabled;
    updateStatus(enabled);
    searchCount.textContent = count.toLocaleString();
  } catch (e) {
    console.error("[OG Search] Error loading state:", e);
  }
}

// Initialize on popup open
loadState();

// Handle toggle change
toggle.addEventListener("change", async () => {
  try {
    const enabled = toggle.checked;
    await browser.storage.local.set({ enabled });
    updateStatus(enabled);
  } catch (e) {
    console.error("[OG Search] Error toggling:", e);
  }
});

// Update status text
function updateStatus(enabled) {
  status.textContent = enabled ? "active" : "paused";
  status.className = enabled ? "status enabled" : "status disabled";
}

// Share functionality
shareLink.addEventListener("click", async (e) => {
  e.preventDefault();

  const shareText =
    "just found OG Search - filters search results to pre-ChatGPT when everything was made by actual humans 🔥 ogsearch.app";

  // Try native share API first
  if (navigator.share) {
    try {
      await navigator.share({
        title: "OG Search",
        text: shareText,
      });
    } catch (err) {
      // User cancelled or error occurred
      if (err.name !== "AbortError") {
        copyToClipboard(shareText);
      }
    }
  } else {
    // Fallback to clipboard
    copyToClipboard(shareText);
  }
});

// Copy to clipboard helper
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showCopiedFeedback();
  } catch (err) {
    console.error("[OG Search] Failed to copy:", err);
  }

  document.body.removeChild(textarea);
}

// Show copied feedback
function showCopiedFeedback() {
  const originalText = shareLink.textContent;
  shareLink.textContent = "✓ copied!";
  shareLink.style.pointerEvents = "none";

  setTimeout(() => {
    shareLink.textContent = originalText;
    shareLink.style.pointerEvents = "auto";
  }, 2000);
}

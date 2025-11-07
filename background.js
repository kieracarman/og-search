const CUTOFF_DATE = "11/30/2022";
const CUTOFF_TIMESTAMP = new Date("2022-11-30").getTime();

// Increment search counter
async function incrementSearchCount() {
  try {
    const result = await browser.storage.local.get("searchCount");
    const count = (result.searchCount || 0) + 1;
    await browser.storage.local.set({ searchCount: count });
  } catch (e) {
    console.error("[OG Search] Error incrementing count:", e);
  }
}

// Check if extension is enabled
async function isEnabled() {
  try {
    const result = await browser.storage.local.get("enabled");
    return result.enabled !== false;
  } catch (e) {
    console.error("[OG Search] Error checking enabled state:", e);
    return true;
  }
}

// Search engine configurations
const searchEngines = {
  google: {
    pattern: "*://*.google.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      if (!urlObj.searchParams.has("tbs")) {
        urlObj.searchParams.set("tbs", "cdr:1,cd_max:11/30/2022");
      }
      return urlObj.toString();
    },
  },

  bing: {
    pattern: "*://*.bing.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      if (!urlObj.searchParams.has("filters")) {
        urlObj.searchParams.set(
          "filters",
          "ex1:%22ez5_20000101_20221130%22"
        );
      }
      return urlObj.toString();
    },
  },

  duckduckgo: {
    pattern: "*://*.duckduckgo.com/*",
    modify: (url) => {
      const urlObj = new URL(url);
      if (
        !urlObj.searchParams.has("df") &&
        urlObj.searchParams.has("q")
      ) {
        urlObj.searchParams.set("df", "2022-11-30");
      }
      return urlObj.toString();
    },
  },

  reddit: {
    pattern: "*://*.reddit.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      const query = urlObj.searchParams.get("q") || "";

      if (!query.includes("before:") && !query.includes("after:")) {
        const newQuery = query
          ? `${query} (before:2022-11-30)`
          : "before:2022-11-30";
        urlObj.searchParams.set("q", newQuery);
      }

      if (!urlObj.searchParams.has("sort")) {
        urlObj.searchParams.set("sort", "relevance");
      }

      return urlObj.toString();
    },
  },

  yahoo: {
    pattern: "*://*.yahoo.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      if (!urlObj.searchParams.has("btf")) {
        urlObj.searchParams.set("btf", "1669852800");
      }
      return urlObj.toString();
    },
  },

  stackoverflow: {
    pattern: "*://*.stackoverflow.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      const query = urlObj.searchParams.get("q") || "";

      if (!query.includes("created:")) {
        const newQuery = query
          ? `${query} created:..2022-11-30`
          : "created:..2022-11-30";
        urlObj.searchParams.set("q", newQuery);
      }

      return urlObj.toString();
    },
  },

  github: {
    pattern: "*://github.com/search*",
    modify: (url) => {
      const urlObj = new URL(url);
      const query = urlObj.searchParams.get("q") || "";

      if (!query.includes("created:")) {
        const newQuery = query
          ? `${query} created:<=2022-11-30`
          : "created:<=2022-11-30";
        urlObj.searchParams.set("q", newQuery);
      }

      return urlObj.toString();
    },
  },
};

// Listen for web requests
browser.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const enabled = await isEnabled();
    if (!enabled) {
      return {};
    }

    const url = details.url;

    for (const [name, engine] of Object.entries(searchEngines)) {
      const pattern = new RegExp(
        engine.pattern.replace(/\*/g, ".*").replace(/\?/g, "\\?")
      );

      if (pattern.test(url)) {
        try {
          const modifiedUrl = engine.modify(url);

          if (modifiedUrl !== url) {
            console.log(`[OG Search] Modified ${name} search`);
            await incrementSearchCount();
            return { redirectUrl: modifiedUrl };
          }
        } catch (e) {
          console.error(`[OG Search] Error modifying ${name}:`, e);
        }
        break;
      }
    }

    return {};
  },
  {
    urls: Object.values(searchEngines).map((e) => e.pattern),
    types: ["main_frame"],
  },
  ["blocking"]
);

// Initialize storage on install
browser.runtime.onInstalled.addListener(async () => {
  try {
    await browser.storage.local.set({ enabled: true, searchCount: 0 });
    console.log("[OG Search] Extension installed and enabled");
  } catch (e) {
    console.error("[OG Search] Error initializing:", e);
  }
});

// Log startup
console.log("[OG Search] Background script loaded");

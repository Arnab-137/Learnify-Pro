(function loadVercelAnalytics() {
  const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
  if (!isBrowser) {
    return;
  }

  const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (window.location.protocol === "file:" || isLocalHost) {
    return;
  }

  if (window.__learnifyAnalyticsLoaded) {
    return;
  }
  window.__learnifyAnalyticsLoaded = true;

  window.va = window.va || function vercelAnalyticsQueue() {
    (window.vaq = window.vaq || []).push(arguments);
  };

  const scriptSource = "/_vercel/insights/script.js";
  if (document.head.querySelector(`script[src="${scriptSource}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = scriptSource;
  script.defer = true;
  script.dataset.sdkn = "@vercel/analytics";
  script.dataset.sdkv = "2.0.1";
  script.onerror = function onAnalyticsScriptError() {
    console.log(
      "[Vercel Web Analytics] Failed to load. Enable Web Analytics in the Vercel project settings and redeploy the site."
    );
  };

  document.head.appendChild(script);
})();

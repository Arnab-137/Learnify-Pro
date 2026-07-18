(() => {
  const capacitor = window.Capacitor;
  if (!capacitor?.isNativePlatform?.()) {
    return;
  }

  document.documentElement.classList.add("native-android");
  history.scrollRestoration = "auto";

  const updateNativeViewport = () => {
    const viewport = window.visualViewport;
    const viewportHeight = Math.round(viewport?.height || window.innerHeight);
    const keyboardOpen = Boolean(viewport && window.innerHeight - viewport.height > 120);

    document.documentElement.style.setProperty("--native-viewport-height", `${viewportHeight}px`);
    document.body?.classList.toggle("native-keyboard-open", keyboardOpen);

    if (keyboardOpen && document.activeElement?.id === "chat-message-input") {
      requestAnimationFrame(() => {
        const messageList = document.getElementById("chat-message-list");
        messageList?.scrollTo({ top: messageList.scrollHeight, behavior: "auto" });
      });
    }
  };

  const markNativeOnlyElements = () => {
    document.body.classList.add("native-app");
    document.body.dataset.platform = "android";
    document.getElementById("install-app-button")?.closest(".action-card")?.classList.add("native-pwa-settings");
    updateNativeViewport();
  };

  const bindNativeBackButton = async () => {
    const appPlugin = capacitor.Plugins?.App;
    if (!appPlugin?.addListener) {
      return;
    }

    await appPlugin.addListener("backButton", ({ canGoBack }) => {
      if (document.body.classList.contains("focus-active")) {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        return;
      }

      if (canGoBack) {
        history.back();
        return;
      }

      appPlugin.minimizeApp?.();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    markNativeOnlyElements();
    void bindNativeBackButton();
  }, { once: true });

  window.visualViewport?.addEventListener("resize", updateNativeViewport, { passive: true });
  window.visualViewport?.addEventListener("scroll", updateNativeViewport, { passive: true });
  window.addEventListener("orientationchange", () => {
    setTimeout(updateNativeViewport, 120);
  }, { passive: true });
})();

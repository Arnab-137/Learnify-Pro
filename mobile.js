(() => {
  const capacitor = window.Capacitor;
  if (!capacitor?.isNativePlatform?.()) {
    return;
  }

  document.documentElement.classList.add("native-android");
  history.scrollRestoration = "auto";
  let moreSheet = null;

  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4Z"/></svg>',
    subjects: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v12.5H7A2 2 0 0 1 5 17.5Zm0 13a2 2 0 0 1 2-2h12M8.5 8H16"/></svg>',
    lectures: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/></svg>',
    friends: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.5"/><path d="M3.5 19c.4-3.3 2.2-5 5.5-5s5.1 1.7 5.5 5M14 15c3.6-.5 5.7.8 6.2 4"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="3"/><path d="M7.5 3v5M16.5 3v5M3.5 10h17"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v11H9l-5 4Z"/></svg>',
    focus: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    planner: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    insights: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-7"/></svg>',
    leaderboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20H4v-7h4Zm6 0h-4V4h4Zm6 0h-4V9h4Z"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.5 1A8 8 0 0 0 14.7 6L14.3 3h-4.6L9.3 6A8 8 0 0 0 7.6 7L5.1 6l-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 3h4.6l.4-3a8 8 0 0 0 1.7-1l2.5 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z"/></svg>'
  };

  const primaryNavigation = [
    { key: "dashboard", label: "Home", href: "dashboard.html", icon: "home" },
    { key: "subjects", label: "Subjects", href: "subjects.html", icon: "subjects" },
    { key: "lectures", label: "Lectures", href: "lectures.html", icon: "lectures" },
    { key: "friends", label: "Friends", href: "friends.html", icon: "friends" }
  ];

  const moreNavigation = [
    { key: "calendar", label: "Calendar", href: "calendar.html", icon: "calendar" },
    { key: "chat", label: "Chat", href: "chat.html", icon: "chat" },
    { key: "focus", label: "Focus Mode", href: "lectures.html?focus=1", icon: "focus" },
    { key: "planner", label: "Planner", href: "planner.html", icon: "planner" },
    { key: "insights", label: "Insights", href: "insights.html", icon: "insights" },
    { key: "leaderboard", label: "Leaderboard", href: "leaderboard.html", icon: "leaderboard" },
    { key: "settings", label: "Settings", href: "settings.html", icon: "settings" }
  ];

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

  const closeMoreSheet = () => {
    if (!moreSheet) {
      return;
    }
    moreSheet.classList.remove("is-open");
    moreSheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("native-sheet-open");
    document.querySelector(".native-more-button")?.setAttribute("aria-expanded", "false");
  };

  const openMoreSheet = () => {
    if (!moreSheet) {
      return;
    }
    moreSheet.classList.add("is-open");
    moreSheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("native-sheet-open");
    document.querySelector(".native-more-button")?.setAttribute("aria-expanded", "true");
    moreSheet.querySelector(".native-sheet-close")?.focus();
  };

  const renderNativeNavigation = () => {
    const page = document.body.dataset.page;
    if (page === "auth") {
      return;
    }

    const appShell = document.querySelector(".app-shell");
    let mobileNav = document.querySelector(".mobile-nav");
    if (!mobileNav && appShell) {
      mobileNav = document.createElement("nav");
      mobileNav.className = "mobile-nav";
      mobileNav.setAttribute("aria-label", "Mobile primary");
      appShell.appendChild(mobileNav);
    }
    if (!mobileNav) {
      return;
    }

    if (!mobileNav.dataset.nativeObserved) {
      mobileNav.dataset.nativeObserved = "true";
      const observer = new MutationObserver(() => {
        if (!mobileNav.querySelector(".native-more-button")) {
          queueMicrotask(renderNativeNavigation);
        }
      });
      observer.observe(mobileNav, { childList: true });
    }

    const secondaryActive = moreNavigation.some((item) => item.key === page)
      || page === "admin"
      || (page === "lectures" && new URLSearchParams(location.search).get("focus") === "1");
    mobileNav.innerHTML = primaryNavigation.map((item) => {
      const active = item.key === page && !(page === "lectures" && secondaryActive);
      return `<a class="app-link native-nav-link${active ? " active" : ""}" href="${item.href}">${icons[item.icon]}<span>${item.label}</span></a>`;
    }).join("") + `<button class="app-link native-nav-link native-more-button${secondaryActive ? " active" : ""}" type="button" aria-expanded="false" aria-controls="native-more-sheet">${icons.more}<span>More</span></button>`;

    moreSheet?.remove();
    moreSheet = document.createElement("div");
    moreSheet.id = "native-more-sheet";
    moreSheet.className = "native-more-sheet";
    moreSheet.setAttribute("aria-hidden", "true");
    moreSheet.innerHTML = `
      <section class="native-more-panel" role="dialog" aria-modal="true" aria-labelledby="native-more-title">
        <div class="native-sheet-handle" aria-hidden="true"></div>
        <header class="native-more-header">
          <div>
            <span class="eyebrow">Learnify Elite</span>
            <h3 id="native-more-title">More options</h3>
          </div>
          <button class="native-sheet-close" type="button" aria-label="Close more options">Close</button>
        </header>
        <nav class="native-more-grid" aria-label="More app options">
          ${moreNavigation.map((item) => `<a class="native-more-link${item.key === page ? " active" : ""}" href="${item.href}">${icons[item.icon]}<span>${item.label}</span></a>`).join("")}
        </nav>
      </section>`;
    document.body.appendChild(moreSheet);

    mobileNav.querySelector(".native-more-button")?.addEventListener("click", openMoreSheet);
    moreSheet.querySelector(".native-sheet-close")?.addEventListener("click", closeMoreSheet);
    moreSheet.addEventListener("click", (event) => {
      if (event.target === moreSheet) {
        closeMoreSheet();
      }
    });
  };

  const wrapInDisclosure = (nodes, title, className = "") => {
    const availableNodes = nodes.filter(Boolean);
    if (!availableNodes.length) {
      return null;
    }

    const details = document.createElement("details");
    details.className = `native-disclosure ${className}`.trim();
    details.innerHTML = `<summary><span>${title}</span><span class="native-disclosure-chevron" aria-hidden="true">+</span></summary><div class="native-disclosure-content"></div>`;
    availableNodes[0].before(details);
    const content = details.querySelector(".native-disclosure-content");
    availableNodes.forEach((node) => content.appendChild(node));
    return details;
  };

  const optimizeDashboard = () => {
    if (document.body.dataset.page !== "dashboard") {
      return;
    }

    document.body.classList.add("native-dashboard");
    const topbar = document.querySelector(".page-view > .topbar");
    if (topbar) {
      const quickActions = document.createElement("nav");
      quickActions.className = "native-quick-actions";
      quickActions.setAttribute("aria-label", "Dashboard quick actions");
      quickActions.innerHTML = `
        <a href="lectures.html">${icons.lectures}<span>Continue</span></a>
        <a href="lectures.html?focus=1">${icons.focus}<span>Focus</span></a>
        <a href="calendar.html">${icons.calendar}<span>Calendar</span></a>
        <a href="chat.html">${icons.chat}<span>Chat</span></a>`;
      topbar.after(quickActions);
    }

    const summary = document.querySelector(".summary-panel");
    const summaryHeader = summary?.querySelector(".summary-header");
    const nextActions = summary?.querySelector(".overview-detail-grid");
    if (summaryHeader && nextActions) {
      summaryHeader.after(nextActions);
    }

    wrapInDisclosure([
      document.querySelector(".react-insights-panel"),
      document.querySelector(".api-insights-grid"),
      document.querySelector(".topbar-quote-card")
    ], "Insights, charts and daily quote", "native-dashboard-insights");
  };

  const optimizeSecondaryPages = () => {
    const page = document.body.dataset.page;
    if (page === "auth" || page === "dashboard") {
      return;
    }
    document.body.classList.add("native-secondary-page");

    if (page === "lectures") {
      wrapInDisclosure([document.querySelector(".lectures-support-grid")], "Recovery and plan status");
    }
    if (page === "subjects") {
      wrapInDisclosure([document.querySelector(".section-spaced")], "Revision notebook");
    }
    if (page === "friends") {
      wrapInDisclosure([document.querySelector(".friends-highlights-grid")], "Weekly progress");
      const activity = [...document.querySelectorAll(".competition-card.section-spaced")].at(-1);
      wrapInDisclosure([activity], "Friend activity");
    }
  };

  const bindNativeBackButton = async () => {
    const appPlugin = capacitor.Plugins?.App;
    if (!appPlugin?.addListener) {
      return;
    }

    await appPlugin.addListener("backButton", ({ canGoBack }) => {
      if (moreSheet?.classList.contains("is-open")) {
        closeMoreSheet();
        return;
      }

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
    renderNativeNavigation();
    optimizeDashboard();
    optimizeSecondaryPages();
    void bindNativeBackButton();
  }, { once: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && moreSheet?.classList.contains("is-open")) {
      closeMoreSheet();
    }
  });

  window.visualViewport?.addEventListener("resize", updateNativeViewport, { passive: true });
  window.visualViewport?.addEventListener("scroll", updateNativeViewport, { passive: true });
  window.addEventListener("orientationchange", () => {
    setTimeout(updateNativeViewport, 120);
  }, { passive: true });
})();

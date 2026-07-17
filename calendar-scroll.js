(function bindCalendarJumpButton() {
  function bind() {
    const button = document.getElementById("scroll-to-calendar");
    const calendar = document.getElementById("calendar-section");

    if (!button || !calendar) {
      return;
    }

    button.addEventListener("click", () => {
      calendar.scrollIntoView({ behavior: "smooth", block: "start" });
      button.blur();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
    return;
  }

  bind();
})();

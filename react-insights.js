import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";

function formatFriendlyDate(dateValue) {
  if (!dateValue) {
    return "Not scheduled";
  }

  const date = new Date(dateValue);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short"
  });
}

function ReactInsightsApp() {
  const [payload, setPayload] = useState(null);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    function handlePayload(event) {
      setPayload(event.detail);
    }

    window.addEventListener("learnify:dashboard-insights", handlePayload);
    return () => {
      window.removeEventListener("learnify:dashboard-insights", handlePayload);
    };
  }, []);

  const suggestion = useMemo(() => {
    if (!payload) {
      return "Preparing your focus suggestions...";
    }
    if (payload.overdueLectures.length) {
      return `You have ${payload.overdueLectures.length} overdue lecture${payload.overdueLectures.length === 1 ? "" : "s"}. Clear one first to keep the system clean.`;
    }
    if (payload.todaysLectures.length) {
      return `${payload.todaysLectures.length} lecture${payload.todaysLectures.length === 1 ? "" : "s"} are lined up for today. One focused block will move the dashboard fast.`;
    }
    if (payload.nextLecture) {
      return `No lecture is due today, so this is a strong window to get ahead in ${payload.nextLecture.subjectName}.`;
    }
    return "Everything is under control right now. Use the time for revision, notes, or recovery.";
  }, [payload]);

  if (!payload) {
    return React.createElement("div", { className: "empty-state compact" }, "Waiting for dashboard data...");
  }

  const tabs = [
    { id: "today", label: "Today", count: payload.todaysLectures.length },
    { id: "overdue", label: "Overdue", count: payload.overdueLectures.length },
    { id: "subjects", label: "Subjects", count: payload.subjectSnapshots.length }
  ];

  const activeContent = activeTab === "today"
    ? payload.todaysLectures
    : activeTab === "overdue"
      ? payload.overdueLectures
      : payload.subjectSnapshots;

  return React.createElement(
    "div",
    { className: "react-insights-shell" },
    React.createElement(
      "section",
      { className: "react-hero-card" },
      React.createElement(
        "div",
        { className: "react-hero-copy" },
        React.createElement("span", { className: "eyebrow" }, "React powered"),
        React.createElement(
          "h5",
          null,
          payload.nextLecture ? `Next up: ${payload.nextLecture.subjectName}` : "Your plan looks clean"
        ),
        React.createElement("p", { className: "muted-text" }, suggestion)
      ),
      React.createElement(
        "div",
        { className: "react-metric-stack" },
        React.createElement(
          "div",
          { className: "react-mini-metric" },
          React.createElement("span", null, "Completion"),
          React.createElement("strong", null, `${payload.completionRate}%`)
        ),
        React.createElement(
          "div",
          { className: "react-mini-metric" },
          React.createElement("span", null, "Streak"),
          React.createElement("strong", null, `${payload.streak} day${payload.streak === 1 ? "" : "s"}`)
        )
      )
    ),
    React.createElement(
      "section",
      { className: "react-tabs-card" },
      React.createElement(
        "div",
        { className: "react-tab-strip", role: "tablist", "aria-label": "Focus insights tabs" },
        tabs.map((tab) =>
          React.createElement(
            "button",
            {
              key: tab.id,
              type: "button",
              className: `react-tab-button${activeTab === tab.id ? " is-active" : ""}`,
              onClick: () => setActiveTab(tab.id)
            },
            React.createElement("span", null, tab.label),
            React.createElement("strong", null, tab.count)
          )
        )
      ),
      React.createElement(
        "div",
        { className: "react-card-grid" },
        activeTab === "subjects"
          ? activeContent.map((subject) =>
              React.createElement(
                "article",
                { key: subject.id, className: "react-insight-card react-subject-card" },
                React.createElement("h6", null, subject.name),
                React.createElement("p", { className: "muted-text" }, `${subject.completedLectures} of ${subject.totalLectures} lectures completed`),
                React.createElement(
                  "div",
                  { className: "react-progress-track", "aria-hidden": "true" },
                  React.createElement("span", { style: { width: `${subject.progressPercentage}%` } })
                ),
                React.createElement("strong", null, `${subject.progressPercentage}%`)
              )
            )
          : activeContent.length
            ? activeContent.map((item) =>
                React.createElement(
                  "article",
                  { key: item.id, className: `react-insight-card${item.isCompleted ? " is-complete" : ""}` },
                  React.createElement(
                    "div",
                    { className: "react-card-topline" },
                    React.createElement("span", { className: "eyebrow" }, item.subjectName),
                    React.createElement(
                      "span",
                      { className: `react-state-pill${activeTab === "overdue" ? " is-danger" : item.isCompleted ? " is-success" : ""}` },
                      activeTab === "overdue" ? "Catch up" : item.isCompleted ? "Done" : "Ready"
                    )
                  ),
                  React.createElement("h6", null, item.title),
                  React.createElement("p", { className: "muted-text" }, `Lecture ${item.lectureNumber} • ${formatFriendlyDate(item.date)}`),
                  React.createElement(
                    "a",
                    { className: "ghost-button", href: `lectures.html?subject=${item.subjectId}&date=${item.date}` },
                    activeTab === "overdue" ? "Open lecture" : "Start"
                  )
                )
              )
            : React.createElement(
                "div",
                { className: "empty-state compact" },
                activeTab === "overdue" ? "No overdue lectures. Your schedule is clean." : "No lectures scheduled here yet."
              )
      )
    )
  );
}

const rootElement = document.getElementById("react-productivity-root");
if (rootElement) {
  createRoot(rootElement).render(React.createElement(ReactInsightsApp));
}

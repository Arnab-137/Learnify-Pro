const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const outputDirectory = path.join(projectRoot, "mobile-dist");
const webAssets = [
  "admin.html",
  "analytics.js",
  "app.js",
  "calendar-scroll.js",
  "calendar.html",
  "chat.css",
  "chat.html",
  "chat.js",
  "dashboard.html",
  "favicon.png",
  "favicon.svg",
  "friends.html",
  "index.html",
  "insights.html",
  "leaderboard.html",
  "lectures.html",
  "planner.html",
  "react-insights.js",
  "service-worker.js",
  "settings.html",
  "site.webmanifest",
  "styles.css",
  "subjects.html"
];

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const asset of webAssets) {
  const source = path.join(projectRoot, asset);
  if (!fs.existsSync(source)) {
    throw new Error(`Mobile build asset is missing: ${asset}`);
  }
  fs.copyFileSync(source, path.join(outputDirectory, asset));
}

console.log(`Prepared ${webAssets.length} web assets for the Android app.`);

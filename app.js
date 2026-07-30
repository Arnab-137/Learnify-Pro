const STORAGE_KEYS = {
  session: "study-tracker-session",
  theme: "study-tracker-theme",
  lastViewedLecture: "study-tracker-last-viewed-lecture",
  lastCelebration: "study-tracker-last-celebration",
  lectureNotes: "study-tracker-lecture-notes",
  apiBaseUrl: "study-tracker-api-base-url",
  studyDataCache: "study-tracker-study-data-cache",
  analyticsCache: "study-tracker-analytics-cache",
  plannerConfig: "study-tracker-planner-config",
  plannerSchedule: "study-tracker-planner-schedule",
  lectureMeta: "study-tracker-lecture-meta",
  subjectNotes: "study-tracker-subject-notes",
  focusChecklist: "study-tracker-focus-checklist",
  focusSessions: "study-tracker-focus-sessions",
  adminApiKey: "study-tracker-admin-api-key",
  queuedToasts: "study-tracker-queued-toasts"
};

const LIVE_API_BASE_URL = "https://learnify-pro.onrender.com/api";

function isNativeApp() {
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

const DEFAULT_API_BASE_URL = (() => {
  if (
    !isNativeApp()
    && (window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000/api";
  }
  return LIVE_API_BASE_URL;
})();

const ESTIMATED_LECTURE_MINUTES = 45;
const STUDY_DATA_CACHE_TTL = 5 * 60 * 1000;
const ANALYTICS_CACHE_TTL = 10 * 60 * 1000;
const ANALYTICS_CACHE_VERSION = 2;
const DEFAULT_DAILY_GOAL = 2;
const DEFAULT_WEEKLY_CHALLENGE = 5;
const DEFAULT_BREAK_SECONDS = 10 * 60;
const API_REQUEST_TIMEOUT_MS = 20 * 1000;
const BACKEND_WARMUP_TIMEOUT_MS = 10 * 1000;

const DATA_SEED_VERSION = 6;

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", href: "dashboard.html" },
  { key: "subjects", label: "Subjects", href: "subjects.html" },
  { key: "lectures", label: "Lectures", href: "lectures.html" },
  { key: "focus", label: "Focus Mode", href: "lectures.html?focus=1" },
  { key: "friends", label: "Friends", href: "friends.html" },
  { key: "leaderboard", label: "Leaderboard", href: "leaderboard.html" },
  { key: "settings", label: "Settings", href: "settings.html" }
];

const MOBILE_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", href: "dashboard.html" },
  { key: "subjects", label: "Subjects", href: "subjects.html" },
  { key: "lectures", label: "Lectures", href: "lectures.html" },
  { key: "friends", label: "Friends", href: "friends.html" },
  { key: "leaderboard", label: "Leaderboard", href: "leaderboard.html" },
  { key: "settings", label: "Settings", href: "settings.html" }
];

const seedSubjects = [
  {
    id: "subject-dme",
    name: "Design of Machine Elements",
    playlists: [
      {
        name: "YouTube Playlist",
        link: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q"
      }
    ]
  },
  {
    id: "subject-or",
    name: "Operations Research",
    playlists: [
      {
        name: "YouTube Playlist",
        link: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x"
      }
    ]
  },
  {
    id: "subject-ic-engines",
    name: "Internal Combustion Engines & Gas Turbines",
    playlists: [
      {
        name: "Unacademy Course",
        link: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P"
      },
      {
        name: "YouTube (Gas Turbine One Shot)",
        link: "https://www.youtube.com/watch?v=_6GKX2aUqII"
      }
    ]
  },
  {
    id: "subject-rac",
    name: "Refrigeration & Air Conditioning",
    playlists: [
      {
        name: "Unacademy Course",
        link: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM"
      }
    ]
  },
  {
    id: "subject-mt",
    name: "Manufacturing Technology",
    playlists: [
      {
        name: "Unacademy Course",
        link: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM"
      },
      {
        name: "Unacademy Advance Machining",
        link: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T"
      }
    ]
  },
  {
    id: "subject-som",
    name: "Strength of Materials",
    playlists: [
      {
        name: "YouTube Playlist",
        link: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm"
      }
    ]
  }
];

const seedLectures = [
  { id: "dme-01", title: "Lec-01", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-15", lectureNumber: 1 },
  { id: "dme-02", title: "Lec-02", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-16", lectureNumber: 2 },
  { id: "dme-03", title: "Lec-03", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-17", lectureNumber: 3 },
  { id: "dme-04", title: "Lec-04", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-18", lectureNumber: 4 },
  { id: "dme-05", title: "Lec-05", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-19", lectureNumber: 5 },
  { id: "dme-06", title: "Lec-06", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-20", lectureNumber: 6 },
  { id: "dme-07", title: "Lec-07", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-21", lectureNumber: 7 },
  { id: "dme-08", title: "Lec-08", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-22", lectureNumber: 8 },
  { id: "dme-09", title: "Lec-09", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-23", lectureNumber: 9 },
  { id: "dme-10", title: "Lec-10", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-24", lectureNumber: 10 },
  { id: "dme-11", title: "Lec-11", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-25", lectureNumber: 11 },
  { id: "dme-12", title: "Lec-12", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-26", lectureNumber: 12 },
  { id: "dme-13", title: "Lec-13", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-27", lectureNumber: 13 },
  { id: "dme-14", title: "Lec-14", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-28", lectureNumber: 14 },
  { id: "dme-15", title: "Lec-15", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-29", lectureNumber: 15 },
  { id: "dme-16", title: "Lec-16", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-04-30", lectureNumber: 16 },
  { id: "dme-17", title: "Lec-17", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-05-01", lectureNumber: 17 },
  { id: "dme-18", title: "Lec-18", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-05-02", lectureNumber: 18 },
  { id: "dme-19", title: "Lec-19", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-05-03", lectureNumber: 19 },
  { id: "dme-20", title: "Lec-20", subjectId: "subject-dme", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q", date: "2026-05-04", lectureNumber: 20 },
  { id: "or-01", title: "Lec-01", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-15", lectureNumber: 1 },
  { id: "or-02", title: "Lec-02", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-16", lectureNumber: 2 },
  { id: "or-03", title: "Lec-03", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-17", lectureNumber: 3 },
  { id: "or-04", title: "Lec-04", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-18", lectureNumber: 4 },
  { id: "or-05", title: "Lec-05", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-19", lectureNumber: 5 },
  { id: "or-06", title: "Lec-06", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-20", lectureNumber: 6 },
  { id: "or-07", title: "Lec-07", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-21", lectureNumber: 7 },
  { id: "or-08", title: "Lec-08", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-22", lectureNumber: 8 },
  { id: "or-09", title: "Lec-09", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-23", lectureNumber: 9 },
  { id: "or-10", title: "Lec-10", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-24", lectureNumber: 10 },
  { id: "or-11", title: "Lec-11", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-25", lectureNumber: 11 },
  { id: "or-12", title: "Lec-12", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-26", lectureNumber: 12 },
  { id: "or-13", title: "Lec-13", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-27", lectureNumber: 13 },
  { id: "or-14", title: "Lec-14", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-28", lectureNumber: 14 },
  { id: "or-15", title: "Lec-15", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-29", lectureNumber: 15 },
  { id: "or-16", title: "Lec-16", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-04-30", lectureNumber: 16 },
  { id: "or-17", title: "Lec-17", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-05-01", lectureNumber: 17 },
  { id: "or-18", title: "Lec-18", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-05-02", lectureNumber: 18 },
  { id: "or-19", title: "Lec-19", subjectId: "subject-or", youtubeLink: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x", date: "2026-05-03", lectureNumber: 19 },
  { id: "ic-engines-01", title: "Lec-01", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-10", lectureNumber: 1 },
  { id: "ic-engines-02", title: "Lec-02", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-11", lectureNumber: 2 },
  { id: "ic-engines-03", title: "Lec-03", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-12", lectureNumber: 3 },
  { id: "ic-engines-04", title: "Lec-04", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-13", lectureNumber: 4 },
  { id: "ic-engines-05", title: "Lec-05", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-14", lectureNumber: 5 },
  { id: "ic-engines-06", title: "Lec-06", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-15", lectureNumber: 6 },
  { id: "ic-engines-07", title: "Lec-07", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-16", lectureNumber: 7 },
  { id: "ic-engines-08", title: "Lec-08", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-17", lectureNumber: 8 },
  { id: "ic-engines-09", title: "Lec-09", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-18", lectureNumber: 9 },
  { id: "ic-engines-10", title: "Lec-10", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-19", lectureNumber: 10 },
  { id: "ic-engines-11", title: "Lec-11", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-20", lectureNumber: 11 },
  { id: "ic-engines-12", title: "Lec-12", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-21", lectureNumber: 12 },
  { id: "ic-engines-13", title: "Lec-13", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-22", lectureNumber: 13 },
  { id: "ic-engines-14", title: "Lec-14", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-23", lectureNumber: 14 },
  { id: "ic-engines-15", title: "Lec-15", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-24", lectureNumber: 15 },
  { id: "ic-engines-16", title: "Lec-16", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-25", lectureNumber: 16 },
  { id: "ic-engines-17", title: "Lec-17", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-26", lectureNumber: 17 },
  { id: "ic-engines-18", title: "Lec-18", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-27", lectureNumber: 18 },
  { id: "ic-engines-19", title: "Lec-19", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-28", lectureNumber: 19 },
  { id: "ic-engines-20", title: "Lec-20", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-29", lectureNumber: 20 },
  { id: "ic-engines-21", title: "Lec-21", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-30", lectureNumber: 21 },
  { id: "ic-engines-22", title: "Lec-22", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-05-31", lectureNumber: 22 },
  { id: "ic-engines-23", title: "Lec-23", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-06-01", lectureNumber: 23 },
  { id: "ic-engines-24", title: "Lec-24", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-06-02", lectureNumber: 24 },
  { id: "ic-engines-25", title: "Lec-25", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-06-03", lectureNumber: 25 },
  { id: "ic-engines-26", title: "Lec-26", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-06-04", lectureNumber: 26 },
  { id: "ic-engines-27", title: "Lec-27", subjectId: "subject-ic-engines", youtubeLink: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P", date: "2026-06-05", lectureNumber: 27 },
  { id: "rac-01", title: "Lec-01", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-10", lectureNumber: 1 },
  { id: "rac-02", title: "Lec-02", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-11", lectureNumber: 2 },
  { id: "rac-03", title: "Lec-03", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-12", lectureNumber: 3 },
  { id: "rac-04", title: "Lec-04", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-13", lectureNumber: 4 },
  { id: "rac-05", title: "Lec-05", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-14", lectureNumber: 5 },
  { id: "rac-06", title: "Lec-06", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-15", lectureNumber: 6 },
  { id: "rac-07", title: "Lec-07", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-16", lectureNumber: 7 },
  { id: "rac-08", title: "Lec-08", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-17", lectureNumber: 8 },
  { id: "rac-09", title: "Lec-09", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-18", lectureNumber: 9 },
  { id: "rac-10", title: "Lec-10", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-19", lectureNumber: 10 },
  { id: "rac-11", title: "Lec-11", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-20", lectureNumber: 11 },
  { id: "rac-12", title: "Lec-12", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-21", lectureNumber: 12 },
  { id: "rac-13", title: "Lec-13", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-22", lectureNumber: 13 },
  { id: "rac-14", title: "Lec-14", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-23", lectureNumber: 14 },
  { id: "rac-15", title: "Lec-15", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-24", lectureNumber: 15 },
  { id: "rac-16", title: "Lec-16", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-25", lectureNumber: 16 },
  { id: "rac-17", title: "Lec-17", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-26", lectureNumber: 17 },
  { id: "rac-18", title: "Lec-18", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-27", lectureNumber: 18 },
  { id: "rac-19", title: "Lec-19", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-28", lectureNumber: 19 },
  { id: "rac-20", title: "Lec-20", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-29", lectureNumber: 20 },
  { id: "rac-21", title: "Lec-21", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-30", lectureNumber: 21 },
  { id: "rac-22", title: "Lec-22", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-05-31", lectureNumber: 22 },
  { id: "rac-23", title: "Lec-23", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-06-01", lectureNumber: 23 },
  { id: "rac-24", title: "Lec-24", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-06-02", lectureNumber: 24 },
  { id: "rac-25", title: "Lec-25", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-06-03", lectureNumber: 25 },
  { id: "rac-26", title: "Lec-26", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-06-04", lectureNumber: 26 },
  { id: "rac-27", title: "Lec-27", subjectId: "subject-rac", youtubeLink: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM", date: "2026-06-05", lectureNumber: 27 },
  { id: "mt-01", title: "Lec-01", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 1 },
  { id: "mt-02", title: "Lec-02", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 2 },
  { id: "mt-03", title: "Lec-03", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 3 },
  { id: "mt-04", title: "Lec-04", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 4 },
  { id: "mt-05", title: "Lec-05", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 5 },
  { id: "mt-06", title: "Lec-06", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3", date: "2026-06-11", lectureNumber: 6 },
  { id: "mt-07", title: "Lec-07", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-17", lectureNumber: 7 },
  { id: "mt-08", title: "Lec-08", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-18", lectureNumber: 8 },
  { id: "mt-09", title: "Lec-09", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-19", lectureNumber: 9 },
  { id: "mt-10", title: "Lec-10", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-20", lectureNumber: 10 },
  { id: "mt-11", title: "Lec-11", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-21", lectureNumber: 11 },
  { id: "mt-12", title: "Lec-12", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-22", lectureNumber: 12 },
  { id: "mt-13", title: "Lec-13", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-23", lectureNumber: 13 },
  { id: "mt-14", title: "Lec-14", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-24", lectureNumber: 14 },
  { id: "mt-15", title: "Lec-15", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-25", lectureNumber: 15 },
  { id: "mt-16", title: "Lec-16", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-26", lectureNumber: 16 },
  { id: "mt-17", title: "Lec-17", subjectId: "subject-mt", youtubeLink: "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T", date: "2026-06-27", lectureNumber: 17 },
  { id: "som-01", title: "Lec-01", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-11", lectureNumber: 1 },
  { id: "som-02", title: "Lec-02", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-12", lectureNumber: 2 },
  { id: "som-03", title: "Lec-03", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-13", lectureNumber: 3 },
  { id: "som-04", title: "Lec-04", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-14", lectureNumber: 4 },
  { id: "som-05", title: "Lec-05", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-15", lectureNumber: 5 },
  { id: "som-06", title: "Lec-06", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-16", lectureNumber: 6 },
  { id: "som-07", title: "Lec-07", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-17", lectureNumber: 7 },
  { id: "som-08", title: "Lec-08", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-18", lectureNumber: 8 },
  { id: "som-09", title: "Lec-09", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-19", lectureNumber: 9 },
  { id: "som-10", title: "Lec-10", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-20", lectureNumber: 10 },
  { id: "som-11", title: "Lec-11", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-21", lectureNumber: 11 },
  { id: "som-12", title: "Lec-12", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-22", lectureNumber: 12 },
  { id: "som-13", title: "Lec-13", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-23", lectureNumber: 13 },
  { id: "som-14", title: "Lec-14", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-24", lectureNumber: 14 },
  { id: "som-15", title: "Lec-15", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-25", lectureNumber: 15 },
  { id: "som-16", title: "Lec-16", subjectId: "subject-som", youtubeLink: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm", date: "2026-06-26", lectureNumber: 16 }
];

const state = {
  authMode: "login",
  currentUser: null,
  calendarMonth: null,
  selectedDate: null,
  currentSubjects: [],
  currentLectures: [],
  currentCompletions: [],
  hasStudyData: false,
  reactInsightsRequested: false,
  dashboardEnhancements: null,
  analyticsSnapshot: null,
  installPromptEvent: null
};

const motionState = {
  cleanup: [],
  scrollTriggersRegistered: false
};

let sharedExperienceInitialized = false;

document.addEventListener("DOMContentLoaded", async () => {
  initializeSharedExperience();
  if (document.body.dataset.page === "auth") {
    void warmBackend();
  }
  try {
    await bootstrapCurrentPage({ verifySession: true });
  } catch (error) {
    console.error("Page initialization failed:", error);
    showToast(error.message || "Unable to load this page. Please try again.", "error");
  }
});

async function bootstrapCurrentPage({ verifySession = true } = {}) {
  const page = document.body.dataset.page;

  if (page !== "lectures") {
    closeFocusMode();
  }

  if (page === "auth") {
    await initAuthPage();
    return true;
  }

  state.currentUser = getSessionUser() || await hydrateCurrentUser();

  if (!state.currentUser) {
    window.location.href = "index.html";
    return false;
  }

  if (!state.calendarMonth) {
    state.calendarMonth = getMonthKey(new Date());
  }

  if (!state.selectedDate) {
    state.selectedDate = getQueryParam("date") || getLocalDateKey(new Date());
  }

  renderAppFrame();
  if (verifySession) {
    void verifyCurrentUserSession();
  }

  if (page === "dashboard") {
    await initDashboardPage();
    return true;
  }

  if (page === "insights") {
    await initInsightsPage();
    return true;
  }

  if (page === "planner") {
    await initPlannerPage();
    return true;
  }

  if (page === "calendar") {
    await initCalendarPage();
    return true;
  }

  if (page === "subjects") {
    await initSubjectsPage();
    return true;
  }

  if (page === "friends") {
    await initFriendsPage();
    return true;
  }

  if (page === "leaderboard") {
    await initLeaderboardPage();
    return true;
  }

  if (page === "lectures") {
    await initLecturesPage();
    return true;
  }

  if (page === "settings") {
    initSettingsPage();
    return true;
  }

  if (page === "admin") {
    await initAdminPage();
    return true;
  }

  return true;
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getApiBaseUrl() {
  const storedApiBaseUrl = localStorage.getItem(STORAGE_KEYS.apiBaseUrl);
  const storedUrlIsLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/api\/?$/i.test(storedApiBaseUrl || "");

  if (isNativeApp() && storedUrlIsLocal) {
    localStorage.removeItem(STORAGE_KEYS.apiBaseUrl);
    return LIVE_API_BASE_URL;
  }

  return storedApiBaseUrl || DEFAULT_API_BASE_URL;
}

function warmBackend() {
  const backendOrigin = getApiBaseUrl().replace(/\/api\/?$/, "");
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), BACKEND_WARMUP_TIMEOUT_MS);

  return fetch(`${backendOrigin}/health`, {
    cache: "no-store",
    mode: "cors",
    signal: controller.signal
  }).catch(() => undefined).finally(() => window.clearTimeout(timeoutId));
}

function saveApiBaseUrl(value) {
  if (value?.trim()) {
    localStorage.setItem(STORAGE_KEYS.apiBaseUrl, value.trim().replace(/\/+$/, ""));
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.apiBaseUrl);
}

function getStoredSession() {
  return readStorage(STORAGE_KEYS.session, null);
}

function saveSession(session) {
  writeStorage(STORAGE_KEYS.session, session);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
  clearStudyDataCache();
  localStorage.removeItem(STORAGE_KEYS.analyticsCache);
  state.dashboardEnhancements = null;
  state.analyticsSnapshot = null;
}

function getSessionUser() {
  const session = getStoredSession();
  return normalizeUser(session?.user);
}

function getStudyDataCache() {
  const cache = readStorage(STORAGE_KEYS.studyDataCache, null);
  if (!cache?.savedAt || !cache?.userId || !cache?.data) {
    return null;
  }

  if (Date.now() - cache.savedAt > STUDY_DATA_CACHE_TTL) {
    localStorage.removeItem(STORAGE_KEYS.studyDataCache);
    return null;
  }

  const currentUser = getCurrentUser();
  if (!currentUser?.id || currentUser.id !== cache.userId) {
    return null;
  }

  return cache.data;
}

function saveStudyDataCache(data) {
  const currentUser = getCurrentUser();
  if (!currentUser?.id) {
    return;
  }

  writeStorage(STORAGE_KEYS.studyDataCache, {
    userId: currentUser.id,
    savedAt: Date.now(),
    data
  });
}

function clearStudyDataCache() {
  localStorage.removeItem(STORAGE_KEYS.studyDataCache);
  state.hasStudyData = false;
}

function getAnalyticsCache() {
  const cache = readStorage(STORAGE_KEYS.analyticsCache, null);
  if (!cache?.savedAt || !cache?.data || cache.version !== ANALYTICS_CACHE_VERSION) {
    localStorage.removeItem(STORAGE_KEYS.analyticsCache);
    return null;
  }
  if (Date.now() - cache.savedAt > ANALYTICS_CACHE_TTL) {
    localStorage.removeItem(STORAGE_KEYS.analyticsCache);
    return null;
  }
  return cache.data;
}

function saveAnalyticsCache(data) {
  writeStorage(STORAGE_KEYS.analyticsCache, {
    version: ANALYTICS_CACHE_VERSION,
    savedAt: Date.now(),
    data
  });
}

function queueToast(message, tone = "info") {
  const queue = readStorage(STORAGE_KEYS.queuedToasts, []);
  queue.push({ id: Date.now(), message, tone });
  writeStorage(STORAGE_KEYS.queuedToasts, queue.slice(-6));
}

function popQueuedToasts() {
  const queue = readStorage(STORAGE_KEYS.queuedToasts, []);
  localStorage.removeItem(STORAGE_KEYS.queuedToasts);
  return queue;
}

function getAuthToken() {
  return getStoredSession()?.token || null;
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function initializeSharedExperience() {
  if (sharedExperienceInitialized) {
    return;
  }
  sharedExperienceInitialized = true;
  applyTheme();
  ensureToastHost();
  ensurePageTransitionVeil();
  ensureSkipLink();
  enhanceStatusAccessibility();
  bindInstallPromptUi();
  registerServiceWorker();
  initBarbaTransitions();
  showQueuedToasts();
  decorateEmptyStates();
}

async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestUrl = `${getApiBaseUrl()}${path}`;
  const retryableStatuses = new Set([502, 503, 504]);
  const maxAttempts = method === "GET" ? 3 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT_MS);
    try {
      response = await fetch(requestUrl, {
        ...options,
        headers,
        signal: controller.signal
      });
    } catch (error) {
      window.clearTimeout(timeoutId);
      if (attempt < maxAttempts) {
        await wait(450 * attempt);
        continue;
      }

      const networkError = new Error(
        error.name === "AbortError"
          ? "The Learnify server took too long to respond. Please try again."
          : isNativeApp()
          ? "Unable to reach the Learnify server. Check your internet connection and try again."
          : `Unable to reach backend at ${getApiBaseUrl()}. Start the backend server and check the API base URL in Settings.`
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
    window.clearTimeout(timeoutId);

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      if (attempt < maxAttempts && retryableStatuses.has(response.status)) {
        await wait(450 * attempt);
        continue;
      }

      const requestError = new Error(payload?.message || "Request failed.");
      requestError.status = response.status;
      requestError.payload = payload;
      throw requestError;
    }

    return payload;
  }
}

async function hydrateCurrentUser() {
  const session = getStoredSession();
  if (!session?.token) {
    return null;
  }

  try {
    const response = await apiRequest("/auth/me");
    const user = normalizeUser(response.data?.user);
    saveSession({
      token: session.token,
      user
    });
    return user;
  } catch (error) {
    if (error?.status === 401) {
      clearSession();
      return null;
    }

    return normalizeUser(session.user);
  }
}

async function verifyCurrentUserSession() {
  const session = getStoredSession();
  if (!session?.token) {
    return;
  }

  try {
    const response = await apiRequest("/auth/me");
    const user = normalizeUser(response.data?.user);
    if (!user) {
      return;
    }

    state.currentUser = user;
    saveSession({
      token: session.token,
      user
    });
    renderAppFrame();
  } catch (error) {
    if (error?.status !== 401) {
      return;
    }

    clearSession();
    if (document.body.dataset.page !== "auth") {
      window.location.href = "index.html";
    }
  }
}

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl || null
  };
}

function getAvatarSeed(user) {
  return `${user?.id || user?._id || ""}:${user?.name || ""}:${user?.email || "Learner"}`;
}

function hashAvatarSeed(seed) {
  return Array.from(seed).reduce((total, character) => {
    return ((total << 5) - total + character.charCodeAt(0)) | 0;
  }, 0);
}

function getAvatarTheme(user) {
  const themes = ["nebula", "planet", "comet", "nova", "orbit", "lunar"];
  const hash = Math.abs(hashAvatarSeed(getAvatarSeed(user)));
  return themes[hash % themes.length];
}

function getAvatarPalette(theme) {
  const palettes = {
    nebula: {
      background: ["0b1023", "1a1742", "2e1065"],
      shapes: ["f472b6", "c084fc", "7dd3fc"]
    },
    planet: {
      background: ["071226", "12315f", "32215d"],
      shapes: ["67e8f9", "fcd34d", "c4b5fd"]
    },
    comet: {
      background: ["08111f", "102a43", "1e3a5f"],
      shapes: ["e2e8f0", "7dd3fc", "f9a8d4"]
    },
    nova: {
      background: ["140d1f", "35173b", "5b1f4e"],
      shapes: ["fde68a", "fb7185", "c084fc"]
    },
    orbit: {
      background: ["081225", "17315a", "1d4ed8"],
      shapes: ["60a5fa", "22d3ee", "e9d5ff"]
    },
    lunar: {
      background: ["111827", "1f2937", "334155"],
      shapes: ["e2e8f0", "93c5fd", "f8fafc"]
    }
  };

  return palettes[theme] || palettes.orbit;
}

function getAvatarUrlForUser(user) {
  const theme = getAvatarTheme(user);
  const palette = getAvatarPalette(theme);
  const seed = encodeURIComponent(getAvatarSeed(user));
  const params = new URLSearchParams({
    seed,
    size: "128",
    radius: "50",
    scale: "92",
    backgroundType: "solid",
    backgroundColor: palette.background.join(","),
    shape1Color: palette.shapes.join(","),
    shape2Color: palette.shapes.slice().reverse().join(","),
    shape3Color: [palette.shapes[1], palette.shapes[2], palette.shapes[0]].join(",")
  });
  return `https://api.dicebear.com/7.x/identicon/svg?${params.toString()}`;
}

function buildAvatarMarkup(user, label) {
  const theme = getAvatarTheme(user);
  return `
    <span class="avatar-shell avatar-shell--${theme}" data-avatar-theme="${theme}">
      <span class="avatar-orbit" aria-hidden="true"></span>
      <img class="avatar-badge" src="${getAvatarUrlForUser(user)}" alt="${label}" loading="lazy">
      <span class="avatar-spark avatar-spark-a" aria-hidden="true"></span>
      <span class="avatar-spark avatar-spark-b" aria-hidden="true"></span>
    </span>
  `;
}

function normalizeDateValue(dateValue) {
  if (!dateValue) {
    return null;
  }
  return getLocalDateKey(new Date(dateValue));
}

function buildSubjectPlaylists(subjectId, lectures) {
  const uniqueLinks = Array.from(
    new Set(
      lectures
        .filter((lecture) => lecture.subjectId === subjectId && lecture.youtubeLink)
        .map((lecture) => lecture.youtubeLink)
    )
  );

  return uniqueLinks.map((link, index) => ({
    name: uniqueLinks.length === 1 ? "Open Resource" : `Resource ${index + 1}`,
    link
  }));
}

function normalizeLecture(rawLecture) {
  return {
    id: rawLecture.id || rawLecture._id,
    title: rawLecture.title,
    subjectId: rawLecture.subject?.id || rawLecture.subject?._id || rawLecture.subjectId,
    subjectName: rawLecture.subject?.name || rawLecture.subjectName || "Subject",
    youtubeLink: rawLecture.youtubeLink || "",
    date: normalizeDateValue(rawLecture.date),
    lectureNumber: rawLecture.lectureNumber,
    isCompleted: Boolean(rawLecture.isCompleted),
    completedAt: normalizeDateValue(rawLecture.completedAt)
  };
}

async function loadStudyData(force = false) {
  const cachedData = getStudyDataCache();

  if (!force && state.hasStudyData) {
    return {
      subjects: state.currentSubjects,
      lectures: state.currentLectures,
      userCompletions: state.currentCompletions
    };
  }

  if (!force) {
    if (cachedData?.subjects && cachedData?.lectures && cachedData?.userCompletions) {
      state.currentSubjects = cachedData.subjects;
      state.currentLectures = cachedData.lectures;
      state.currentCompletions = cachedData.userCompletions;
      state.hasStudyData = true;
      return cachedData;
    }
  }

  let subjects = [];
  let lectures = [];

  try {
    const bundleResponse = await apiRequest("/subjects/bundle");
    const bundleSubjects = bundleResponse.data?.subjects || [];
    const bundleLectures = bundleResponse.data?.lectures || [];

    subjects = bundleSubjects.map((subject) => ({
      id: subject.id || subject._id,
      name: subject.name,
      totalLectures: subject.totalLectures || 0,
      completedLectures: subject.completedLectures || 0,
      progressPercentage: subject.progressPercentage || 0,
      lastStudiedAt: normalizeDateValue(subject.lastStudiedAt),
      playlists: []
    }));

    lectures = bundleLectures.map(normalizeLecture);
  } catch (error) {
    try {
      const subjectResponse = await apiRequest("/subjects");
      const subjectRows = subjectResponse.data || [];
      subjects = subjectRows.map((subject) => ({
        id: subject.id || subject._id,
        name: subject.name,
        totalLectures: subject.totalLectures || 0,
        completedLectures: subject.completedLectures || 0,
        progressPercentage: subject.progressPercentage || 0,
        lastStudiedAt: normalizeDateValue(subject.lastStudiedAt),
        playlists: []
      }));

      const lectureResponses = await Promise.all(
        subjects.map((subject) => apiRequest(`/subjects/${subject.id}/lectures`))
      );

      lectures = lectureResponses.flatMap((response) =>
        (response.data?.lectures || []).map(normalizeLecture)
      );
    } catch (fallbackError) {
      if (cachedData?.subjects && cachedData?.lectures && cachedData?.userCompletions) {
        state.currentSubjects = cachedData.subjects;
        state.currentLectures = cachedData.lectures;
        state.currentCompletions = cachedData.userCompletions;
        state.hasStudyData = true;
        return cachedData;
      }

      throw fallbackError;
    }
  }

  subjects.forEach((subject) => {
    subject.playlists = buildSubjectPlaylists(subject.id, lectures);
  });

  const completions = lectures
    .filter((lecture) => lecture.isCompleted)
    .map((lecture) => ({
      lectureId: lecture.id,
      completed: true,
      completedAt: lecture.completedAt
    }));

  state.currentSubjects = subjects;
  state.currentLectures = lectures;
  state.currentCompletions = completions;
  state.hasStudyData = true;

  const data = {
    subjects,
    lectures,
    userCompletions: completions
  };
  saveStudyDataCache(data);
  return data;
}

function loadReactInsightsWidget() {
  if (state.reactInsightsRequested || document.body.dataset.page !== "dashboard") {
    return;
  }

  const root = document.getElementById("react-productivity-root");
  if (!root) {
    return;
  }

  state.reactInsightsRequested = true;
  const start = () => {
    import("./react-insights.js").catch((error) => {
      console.error("React insights failed to load:", error);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 2000 });
    return;
  }

  window.setTimeout(start, 900);
}

async function initAuthPage() {
  const form = document.getElementById("auth-form");
  const nameField = document.getElementById("auth-name-field");
  const nameInput = document.getElementById("auth-name");
  const emailInput = document.getElementById("auth-email");
  const passwordInput = document.getElementById("auth-password");
  const submitButton = document.getElementById("auth-submit");
  const messageNode = document.getElementById("auth-message");
  const tabButtons = Array.from(document.querySelectorAll(".tab-button"));

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.authMode = button.dataset.mode;
      tabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
      submitButton.textContent = state.authMode === "login" ? "Log In" : "Create Account";
      if (nameField && nameInput) {
        const showName = state.authMode === "signup";
        nameField.classList.toggle("hidden", !showName);
        nameInput.required = showName;
      }
      messageNode.textContent = "";
    });
  });

  if (nameField && nameInput) {
    nameField.classList.add("hidden");
    nameInput.required = false;
  }

  const currentUser = await hydrateCurrentUser();
  if (currentUser) {
    window.location.href = "dashboard.html";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = nameInput?.value.trim() ?? "";
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      messageNode.textContent = "Please enter both email and password.";
      return;
    }

    messageNode.textContent = "Connecting to backend...";

    try {
      const path = state.authMode === "signup" ? "/auth/signup" : "/auth/login";
      const payload = state.authMode === "signup"
        ? { name, email, password }
        : { email, password };

      let response;
      try {
        response = await apiRequest(path, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      } catch (error) {
        const savedApiBaseUrl = localStorage.getItem(STORAGE_KEYS.apiBaseUrl);
        const shouldRestoreDefaultApi = error.isNetworkError
          && savedApiBaseUrl
          && savedApiBaseUrl !== DEFAULT_API_BASE_URL;

        if (!shouldRestoreDefaultApi) {
          throw error;
        }

        localStorage.removeItem(STORAGE_KEYS.apiBaseUrl);
        messageNode.textContent = "Restoring the default Learnify server...";
        response = await apiRequest(path, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      const user = normalizeUser(response.data?.user);
      saveSession({
        token: response.data?.token,
        user
      });
      state.currentUser = user;
      messageNode.textContent = "Preparing your dashboard...";
      window.location.href = "dashboard.html";
    } catch (error) {
      messageNode.textContent = error.message || "Authentication failed.";
    }
  });
}

function renderAppFrame() {
  applyTheme();
  const userBadge = document.getElementById("welcome-text");
  if (userBadge) {
    userBadge.textContent = getUserDisplayName(state.currentUser);
  }

  const page = document.body.dataset.page;
  const focusModeRequested = getQueryParam("focus") === "1";
  const desktopNav = document.querySelector(".app-nav");
  const mobileNav = document.querySelector(".mobile-nav");

  if (desktopNav) {
    desktopNav.innerHTML = NAV_ITEMS.map((item) => {
      const isActive = item.key === "focus"
        ? page === "lectures" && focusModeRequested
        : item.key === "lectures"
          ? page === "lectures" && !focusModeRequested
          : page === item.key;
      return `<a class="app-link${isActive ? " active" : ""}" href="${item.href}">${item.label}</a>`;
    }).join("");
  }

  if (mobileNav) {
    mobileNav.innerHTML = MOBILE_NAV_ITEMS.map((item) => {
      const isActive = page === item.key || (item.key === "lectures" && page === "lectures");
      return `<a class="app-link${isActive ? " active" : ""}" href="${item.href}">${item.label}</a>`;
    }).join("");
  }

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.onclick = logout;
  }
  bindThemeToggle();
  bindPageTransitions();
}

async function initDashboardPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  renderStats(lectures, userCompletions);
  renderNextAction(lectures, subjects, userCompletions);
  publishDashboardInsights(lectures, subjects, userCompletions);
  maybeShowSmartNotifications(lectures, userCompletions);
  renderCalendar(lectures, subjects, {
    onDateSelect: (date) => {
      state.selectedDate = date;
      void initDashboardPage();
    },
    onOpenLecture: (lecture) => {
      window.location.href = `lectures.html?subject=${lecture.subjectId}&date=${lecture.date}`;
    }
  });
  bindCalendarNavigation(initDashboardPage);
  loadReactInsightsWidget();
  void loadDashboardEnhancements(force);
  finalizeVisualPass();
}

async function initInsightsPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  const enhancements = await getAnalyticsSnapshot(force);
  renderInsightsPage(lectures, subjects, userCompletions, enhancements);
  finalizeVisualPass();
}

async function initPlannerPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  renderPlannerPage(lectures, subjects, userCompletions);
  finalizeVisualPass();
}

async function initCalendarPage(force = false) {
  const { lectures, subjects } = await loadStudyData(force);

  renderCalendar(lectures, subjects, {
    onDateSelect: (date) => {
      state.selectedDate = date;
      void initCalendarPage();
    },
    onOpenLecture: (lecture) => {
      window.location.href = `lectures.html?subject=${lecture.subjectId}&date=${lecture.date}`;
    }
  });

  bindCalendarNavigation(initCalendarPage);
  finalizeVisualPass();
}

async function initSubjectsPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  renderSubjects(subjects, lectures, userCompletions, true);
  renderSubjectNotes(subjects);
  finalizeVisualPass();
}

async function initFriendsPage() {
  await loadStudyData();
  await renderFriendsPanel();
  finalizeVisualPass();
}

async function initLeaderboardPage() {
  await renderLeaderboardPanel();
  finalizeVisualPass();
}

async function initLecturesPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  const selectedSubjectId = getQueryParam("subject");
  const selectedDate = getQueryParam("date");
  const focusModeRequested = getQueryParam("focus") === "1";

  renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  renderResumeBanner(lectures, subjects);
  maybeShowSmartNotifications(lectures, userCompletions);
  renderOverdueRecovery(lectures, subjects, userCompletions);
  renderPlanStatusCard(lectures, userCompletions);
  bindLectureFilters(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  bindFocusMode();
  bindKeyboardShortcuts(lectures, userCompletions, selectedSubjectId);

  const backButton = document.getElementById("back-to-subjects");
  if (backButton) {
    backButton.classList.toggle("hidden", !selectedSubjectId);
    backButton.addEventListener("click", () => {
      window.location.href = "subjects.html";
    });
  }

  if (focusModeRequested) {
    const focusLecture = getNextLecture(lectures, userCompletions, selectedSubjectId)
      || getLastViewedLecture(lectures);
    if (focusLecture) {
      const focusSubject = subjects.find((item) => item.id === focusLecture.subjectId);
      openFocusMode(focusLecture, focusSubject);
    }
  }
  finalizeVisualPass();
}

async function initAdminPage() {
  const { subjects } = await loadStudyData();
  renderAdminPage(subjects);
  finalizeVisualPass();
}

function initSettingsPage() {
  applyTheme();
  const apiInput = document.getElementById("api-base-url");
  const apiButton = document.getElementById("save-api-base-url");
  const apiStatus = document.getElementById("api-base-url-status");

  if (apiInput && apiStatus) {
    apiInput.value = getApiBaseUrl();
    apiStatus.textContent = `Current API endpoint: ${getApiBaseUrl()}`;
  }

  if (apiInput && apiButton && apiStatus) {
    apiButton.onclick = () => {
      saveApiBaseUrl(apiInput.value);
      apiStatus.textContent = `Current API endpoint: ${getApiBaseUrl()}`;
      queueToast("Backend connection updated.", "success");
    };
  }

  const notificationButton = document.getElementById("test-notification-button");
  if (notificationButton) {
    notificationButton.onclick = () => {
      showToast("Daily reminder: protect one focused lecture block today.", "info");
    };
  }

  const installButton = document.getElementById("install-app-button");
  const installStatus = document.getElementById("install-app-status");
  if (installButton && state.installPromptEvent) {
    installButton.classList.remove("hidden");
    installButton.onclick = async () => {
      state.installPromptEvent?.prompt();
      const choice = await state.installPromptEvent?.userChoice;
      if (choice?.outcome === "accepted") {
        showToast("Learnify Elite is being installed.", "success");
        installButton.classList.add("hidden");
      }
    };
  }
  if (installStatus) {
    installStatus.textContent = state.installPromptEvent
      ? "Install is available on this device."
      : "If install is supported, the button will appear when the browser offers it.";
  }
}

function logout() {
  clearSession();
  state.currentSubjects = [];
  state.currentLectures = [];
  state.currentCompletions = [];
  state.hasStudyData = false;
  window.location.href = "index.html";
}

function getCurrentUser() {
  return getStoredSession()?.user || null;
}

function publishDashboardInsights(lectures, subjects, userCompletions) {
  const root = document.getElementById("react-productivity-root");
  if (!root) {
    return;
  }

  const todayKey = getLocalDateKey(new Date());
  const completedLectureIds = new Set(
    userCompletions.filter((completion) => completion.completed).map((completion) => completion.lectureId)
  );
  const nextLecture = getNextLecture(lectures, userCompletions);
  const todaysLectures = lectures.filter((lecture) => lecture.date === todayKey);
  const overdueLectures = lectures.filter((lecture) => lecture.date < todayKey && !completedLectureIds.has(lecture.id));
  const completedCount = userCompletions.filter((completion) => completion.completed).length;

  window.dispatchEvent(
    new CustomEvent("learnify:dashboard-insights", {
      detail: {
        user: state.currentUser,
        completionRate: lectures.length ? Math.round((completedCount / lectures.length) * 100) : 0,
        streak: getStreakCount(userCompletions),
        nextLecture: nextLecture
          ? {
              id: nextLecture.id,
              title: nextLecture.title,
              subjectId: nextLecture.subjectId,
              subjectName: subjects.find((subject) => subject.id === nextLecture.subjectId)?.name || "Subject",
              date: nextLecture.date,
              lectureNumber: nextLecture.lectureNumber
            }
          : null,
        todaysLectures: todaysLectures.map((lecture) => ({
          id: lecture.id,
          title: lecture.title,
          subjectId: lecture.subjectId,
          subjectName: subjects.find((subject) => subject.id === lecture.subjectId)?.name || "Subject",
          date: lecture.date,
          lectureNumber: lecture.lectureNumber,
          isCompleted: completedLectureIds.has(lecture.id)
        })),
        overdueLectures: overdueLectures.slice(0, 4).map((lecture) => ({
          id: lecture.id,
          title: lecture.title,
          subjectId: lecture.subjectId,
          subjectName: subjects.find((subject) => subject.id === lecture.subjectId)?.name || "Subject",
          date: lecture.date,
          lectureNumber: lecture.lectureNumber
        })),
        subjectSnapshots: subjects.map((subject) => ({
          id: subject.id,
          name: subject.name,
          progressPercentage: subject.progressPercentage || 0,
          completedLectures: subject.completedLectures || 0,
          totalLectures: subject.totalLectures || 0
        }))
      }
    })
  );
}

function getUserDisplayName(user) {
  if (!user) {
    return "";
  }
  if (user.name?.trim()) {
    return user.name.trim();
  }
  if (user.email?.includes("@")) {
    return user.email.split("@")[0];
  }
  return "Learner";
}

function renderCompetitionPanel() {
  return;
  const form = document.getElementById("friend-form");
  const emailInput = document.getElementById("friend-email");
  const message = document.getElementById("friend-message");
  const list = document.getElementById("friends-list");
  const leaderboard = document.getElementById("leaderboard-list");
  const rivalryCopy = document.getElementById("rivalry-copy");
  if (!form || !emailInput || !message || !list || !leaderboard || !rivalryCopy) {
    return;
  }

  const render = () => {
    const users = getUsers();
    const lectures = getLectures();
    const friendIds = getCurrentUserFriendIds();
    const friends = users.filter((user) => friendIds.includes(user.id));

    list.innerHTML = "";
    if (!friends.length) {
      list.innerHTML = `<div class="empty-state compact">No friends added yet. Add a friend by email to start competing on progress and streaks.</div>`;
    } else {
      friends
        .sort((a, b) => getUserDisplayName(a).localeCompare(getUserDisplayName(b)))
        .forEach((friend) => {
          const stats = getCompetitionStats(friend, lectures);
          const chip = document.createElement("article");
          chip.className = "friend-chip";
          chip.innerHTML = `
            <div>
              <strong>${getUserDisplayName(friend)}</strong>
              <span class="muted-text">${friend.email}</span>
            </div>
            <div class="friend-chip-meta">
              <span>${stats.progress}% progress</span>
              <span>${stats.streak} day streak</span>
            </div>
          `;
          list.appendChild(chip);
        });
    }

    const competitors = [state.currentUser, ...friends]
      .map((user) => ({
        user,
        stats: getCompetitionStats(user, lectures)
      }))
      .sort((a, b) =>
        b.stats.completed - a.stats.completed ||
        b.stats.progress - a.stats.progress ||
        b.stats.streak - a.stats.streak ||
        getUserDisplayName(a.user).localeCompare(getUserDisplayName(b.user))
      );

    leaderboard.innerHTML = "";
    competitors.forEach((entry, index) => {
      const row = document.createElement("div");
      row.className = `leaderboard-row${entry.user.id === state.currentUser.id ? " is-current-user" : ""}`;
      row.innerHTML = `
        <span class="leaderboard-rank">#${index + 1}</span>
        <div class="leaderboard-user">
          <strong>${getUserDisplayName(entry.user)}</strong>
          <span class="muted-text">${entry.stats.completed} completed • ${entry.stats.progress}% progress</span>
        </div>
        <span class="leaderboard-streak">${entry.stats.streak} day streak</span>
      `;
      leaderboard.appendChild(row);
    });

    rivalryCopy.textContent = getRivalryMessage(competitors);
  };

  form.onsubmit = (event) => {
    event.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      message.textContent = "Enter your friend's email.";
      return;
    }

    if (email === state.currentUser.email) {
      message.textContent = "You cannot add yourself as a friend.";
      return;
    }

    const friend = getUsers().find((user) => user.email === email);
    if (!friend) {
      message.textContent = "No user with that email exists in this app yet.";
      return;
    }

    if (getCurrentUserFriendIds().includes(friend.id)) {
      message.textContent = "That friend is already on your competition board.";
      return;
    }

    saveFriendship(state.currentUser.id, friend.id);
    emailInput.value = "";
    message.textContent = `${getUserDisplayName(friend)} added to your competition board.`;
    render();
  };

  render();
}

function getCompetitionEntries() {
  return {
    lectures: state.currentLectures || [],
    friends: [],
    competitors: []
  };
  const users = getUsers();
  const lectures = getLectures();
  const friendIds = getCurrentUserFriendIds();
  const friends = users.filter((user) => friendIds.includes(user.id));
  const competitors = [state.currentUser, ...friends]
    .map((user) => ({
      user,
      stats: getCompetitionStats(user, lectures)
    }))
    .sort((a, b) =>
      b.stats.completed - a.stats.completed ||
      b.stats.progress - a.stats.progress ||
      b.stats.streak - a.stats.streak ||
      getUserDisplayName(a.user).localeCompare(getUserDisplayName(b.user))
    );

  return { lectures, friends, competitors };
}

async function renderFriendsPanel() {
  const searchInput = document.getElementById("friend-search-input");
  const searchButton = document.getElementById("friend-search-button");
  const searchStatus = document.getElementById("friend-search-status");
  const searchResults = document.getElementById("friend-search-results");
  const friendsList = document.getElementById("friends-list");
  const friendsCount = document.getElementById("friends-count");
  const receivedList = document.getElementById("friend-requests-received");
  const sentList = document.getElementById("friend-requests-sent");

  if (!searchInput || !searchButton || !searchStatus || !searchResults || !friendsList || !receivedList || !sentList) {
    return;
  }

  const renderFriendCards = (container, items, emptyMessage) => {
    container.innerHTML = "";
    if (!items.length) {
      container.innerHTML = `<div class="empty-state compact">${emptyMessage}</div>`;
      return;
    }

    items.forEach((friend) => {
      const card = document.createElement("article");
      card.className = "friend-chip";
      card.innerHTML = `
        <div class="friend-chip-main">
          ${buildAvatarMarkup(friend, `${friend.name} avatar`)}
          <div>
            <strong>${friend.name}</strong>
            <span class="muted-text">${friend.email}</span>
          </div>
        </div>
        <div class="friend-chip-meta">
          <button class="ghost-button danger remove-friend" type="button">Delete Friend</button>
        </div>
      `;
      card.querySelector(".remove-friend").onclick = async () => {
        await apiRequest(`/friends/${friend.id}`, { method: "DELETE" });
        showToast(`${friend.name} was removed from your friends list.`, "success");
        await loadFriendsData();
      };
      container.appendChild(card);
    });
  };

  const loadFriendsData = async () => {
    const [friendsResponse, requestsResponse] = await Promise.all([
      apiRequest("/friends/list"),
      apiRequest("/friends/requests")
    ]);

    const friends = friendsResponse.data || [];
    const requests = requestsResponse.data || { sent: [], received: [] };

    if (friendsCount) {
      friendsCount.textContent = `${friends.length} friend${friends.length === 1 ? "" : "s"}`;
    }

    renderWeeklyWinnerCard(friends);
    renderWeeklyChallengeCard();
    renderFriendActivityFeed(friends);

    renderFriendCards(
      friendsList,
      friends,
      "No friends added yet. Search for learners and send your first request."
    );

    receivedList.innerHTML = "";
    if (!requests.received.length) {
      receivedList.innerHTML = `<div class="empty-state compact">No incoming requests right now.</div>`;
    } else {
      requests.received.forEach((friend) => {
        const card = document.createElement("article");
        card.className = "friend-chip";
        card.innerHTML = `
          <div class="friend-chip-main">
            ${buildAvatarMarkup(friend, `${friend.name} avatar`)}
            <div>
              <strong>${friend.name}</strong>
              <span class="muted-text">${friend.email}</span>
            </div>
          </div>
          <div class="friend-chip-meta">
            <button class="ghost-button accept-request" type="button">Accept</button>
            <button class="ghost-button danger reject-request" type="button">Reject</button>
          </div>
        `;
        card.querySelector(".accept-request").onclick = async () => {
          await apiRequest(`/friends/accept/${friend.id}`, { method: "POST" });
          showToast(`You accepted ${friend.name}'s request.`, "success");
          await loadFriendsData();
        };
        card.querySelector(".reject-request").onclick = async () => {
          await apiRequest(`/friends/reject/${friend.id}`, { method: "POST" });
          await loadFriendsData();
        };
        receivedList.appendChild(card);
      });
    }

    sentList.innerHTML = "";
    if (!requests.sent.length) {
      sentList.innerHTML = `<div class="empty-state compact">No outgoing requests yet.</div>`;
    } else {
      requests.sent.forEach((friend) => {
        const card = document.createElement("article");
        card.className = "friend-chip";
        card.innerHTML = `
          <div class="friend-chip-main">
            ${buildAvatarMarkup(friend, `${friend.name} avatar`)}
            <div>
              <strong>${friend.name}</strong>
              <span class="muted-text">${friend.email}</span>
            </div>
          </div>
          <div class="friend-chip-meta">
            <span>Pending</span>
          </div>
        `;
        sentList.appendChild(card);
      });
    }
  };

  const runSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchStatus.textContent = "Enter a name or email to search.";
      searchResults.innerHTML = `<div class="empty-state compact">Search results will appear here.</div>`;
      return;
    }

    searchStatus.textContent = "Searching...";
    try {
      const response = await apiRequest(`/friends/search?q=${encodeURIComponent(query)}`);
      const results = response.data || [];
      searchResults.innerHTML = "";

      if (!results.length) {
        searchStatus.textContent = "No matching users found.";
        searchResults.innerHTML = `<div class="empty-state compact">No learners matched your search.</div>`;
        return;
      }

      searchStatus.textContent = `${results.length} learner${results.length === 1 ? "" : "s"} found.`;
      results.forEach((result) => {
        const card = document.createElement("article");
        card.className = "friend-chip";
        const actionLabel = result.isFriend
          ? "Already friends"
          : result.requestSent
            ? "Request sent"
            : result.requestReceived
              ? "Incoming request"
              : "Add friend";

        card.innerHTML = `
          <div class="friend-chip-main">
            ${buildAvatarMarkup(result, `${result.name} avatar`)}
            <div>
              <strong>${result.name}</strong>
              <span class="muted-text">${result.email}</span>
            </div>
          </div>
          <div class="friend-chip-meta">
            <button class="ghost-button search-action" type="button" ${result.isFriend || result.requestSent ? "disabled" : ""}>${actionLabel}</button>
          </div>
        `;

        const actionButton = card.querySelector(".search-action");
        if (!result.isFriend && !result.requestSent && !result.requestReceived) {
          actionButton.classList.add("primary-button");
          actionButton.classList.remove("ghost-button");
          actionButton.onclick = async () => {
            await apiRequest(`/friends/request/${result.id}`, { method: "POST" });
            showToast(`Friend request sent to ${result.name}.`, "success");
            await loadFriendsData();
            await runSearch();
          };
        }

        if (result.requestReceived) {
          actionButton.onclick = async () => {
            await apiRequest(`/friends/accept/${result.id}`, { method: "POST" });
            showToast(`You are now connected with ${result.name}.`, "success");
            await loadFriendsData();
            await runSearch();
          };
          actionButton.classList.add("primary-button");
          actionButton.classList.remove("ghost-button");
          actionButton.textContent = "Accept request";
        }

        searchResults.appendChild(card);
      });
    } catch (error) {
      searchStatus.textContent = error.message || "Search failed.";
      searchResults.innerHTML = `<div class="empty-state compact">Unable to search users right now.</div>`;
    }
  };

  searchButton.onclick = () => {
    void runSearch();
  };

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void runSearch();
    }
  });

  searchResults.innerHTML = `<div class="empty-state compact">Search results will appear here.</div>`;
  try {
    await loadFriendsData();
  } catch (error) {
    searchStatus.textContent = error.message || "Unable to load friends data.";
    friendsList.innerHTML = `<div class="empty-state compact">Unable to load your friends right now.</div>`;
    receivedList.innerHTML = `<div class="empty-state compact">Unable to load requests right now.</div>`;
    sentList.innerHTML = `<div class="empty-state compact">Unable to load requests right now.</div>`;
  }
}

async function renderLeaderboardPanel() {
  const leaderboard = document.getElementById("leaderboard-list");
  const rivalryCopy = document.getElementById("rivalry-copy");
  const count = document.getElementById("leaderboard-count");
  const globalButton = document.getElementById("leaderboard-global");
  const friendsButton = document.getElementById("leaderboard-friends");
  if (!leaderboard || !rivalryCopy || !globalButton || !friendsButton) {
    return;
  }

  const renderBoard = async (scope) => {
    globalButton.classList.toggle("active", scope === "global");
    friendsButton.classList.toggle("active", scope === "friends");
    leaderboard.innerHTML = `<div class="empty-state compact">Loading leaderboard...</div>`;

    try {
      const response = await apiRequest(`/leaderboard/${scope}`);
      const rows = response.data || [];
      leaderboard.innerHTML = "";

      if (count) {
        count.textContent = `${rows.length} learner${rows.length === 1 ? "" : "s"}`;
      }

      if (!rows.length) {
        rivalryCopy.textContent = "No leaderboard data available yet.";
        leaderboard.innerHTML = `<div class="empty-state compact">No leaderboard entries available.</div>`;
        return;
      }

      const competitors = rows.map((entry) => ({
        user: {
          id: entry.userId,
          name: entry.name
        },
        stats: {
          completed: entry.completedLectures,
          progress: entry.progressPercentage,
          streak: entry.streak
        }
      }));

      rows.forEach((entry) => {
        const row = document.createElement("div");
        row.className = `leaderboard-row${entry.userId === state.currentUser.id ? " is-current-user" : ""}`;
        row.innerHTML = `
          <span class="leaderboard-rank">#${entry.rank}</span>
          <div class="leaderboard-user-shell">
            ${buildAvatarMarkup(entry, `${entry.name} avatar`)}
            <div class="leaderboard-user">
              <strong>${entry.name}</strong>
              <span class="muted-text">${entry.completedLectures}/${entry.totalLectures} completed - ${entry.progressPercentage}% progress</span>
            </div>
          </div>
          <div class="leaderboard-meta">
            <span class="leaderboard-progress-pill">${entry.progressPercentage}%</span>
            <span class="leaderboard-streak">${entry.streak} day streak</span>
          </div>
        `;
        leaderboard.appendChild(row);
      });

      rivalryCopy.textContent = getRivalryMessage(competitors);
      const { lectures, subjects, userCompletions } = await loadStudyData();
      renderLeaderboardSubjectComparison(lectures, subjects, userCompletions);
    } catch (error) {
      rivalryCopy.textContent = error.message || "Unable to load leaderboard.";
      leaderboard.innerHTML = `<div class="empty-state compact">Unable to load leaderboard right now.</div>`;
    }
  };

  globalButton.onclick = () => {
    void renderBoard("global");
  };
  friendsButton.onclick = () => {
    void renderBoard("friends");
  };

  await renderBoard("global");
}

function getCompetitionStats(user, lectures) {
  const userCompletions = user?.id === state.currentUser?.id ? getCurrentUserCompletions() : [];
  const completed = userCompletions.filter((item) => item.completed).length;
  const progress = lectures.length ? Math.round((completed / lectures.length) * 100) : 0;
  return {
    completed,
    progress,
    streak: getStreakCount(userCompletions)
  };
}

function getRivalryMessage(competitors) {
  if (competitors.length === 1) {
    return "Add friends to compare completion, streaks, and overall progress.";
  }

  const currentIndex = competitors.findIndex((entry) => entry.user.id === state.currentUser.id);
  const current = competitors[currentIndex];
  const leader = competitors[0];

  if (currentIndex === 0) {
    const runnerUp = competitors[1];
    const lead = current.stats.completed - runnerUp.stats.completed;
    return `You are leading the board. Stay ahead of ${getUserDisplayName(runnerUp.user)} by ${lead || 1} lecture${lead === 1 ? "" : "s"}.`;
  }

  const gap = leader.stats.completed - current.stats.completed;
  return `${getUserDisplayName(leader.user)} is ahead right now. Complete ${gap || 1} more lecture${gap === 1 ? "" : "s"} to catch up.`;
}

async function loadDashboardEnhancements(force = false) {
  const quoteText = document.getElementById("dashboard-quote-text");
  const quoteAuthor = document.getElementById("dashboard-quote-author");
  const quoteSource = document.getElementById("dashboard-quote-source");
  const weeklyImage = document.getElementById("weekly-chart-image");
  const weeklyFallback = document.getElementById("weekly-chart-fallback");
  const subjectImage = document.getElementById("subject-chart-image");
  const subjectFallback = document.getElementById("subject-chart-fallback");
  const insightsList = document.getElementById("dashboard-insights-list");

  if (!quoteText || !quoteAuthor || !quoteSource || !weeklyImage || !weeklyFallback || !subjectImage || !subjectFallback || !insightsList) {
    return;
  }

  if (!force && state.dashboardEnhancements) {
    renderDashboardEnhancements(state.dashboardEnhancements);
    return;
  }

  const enhancements = await getAnalyticsSnapshot(force);
  state.dashboardEnhancements = enhancements;
  renderDashboardEnhancements(enhancements);
}

function renderDashboardEnhancements(enhancements) {
  const quoteText = document.getElementById("dashboard-quote-text");
  const quoteAuthor = document.getElementById("dashboard-quote-author");
  const quoteSource = document.getElementById("dashboard-quote-source");
  const weeklyImage = document.getElementById("weekly-chart-image");
  const weeklyFallback = document.getElementById("weekly-chart-fallback");
  const subjectImage = document.getElementById("subject-chart-image");
  const subjectFallback = document.getElementById("subject-chart-fallback");
  const insightsList = document.getElementById("dashboard-insights-list");

  if (!quoteText || !quoteAuthor || !quoteSource || !weeklyImage || !weeklyFallback || !subjectImage || !subjectFallback || !insightsList) {
    return;
  }

  const quote = enhancements.insights?.quote;
  quoteText.textContent = quote?.content || "Success is the sum of small efforts, repeated day in and day out.";
  quoteAuthor.textContent = quote?.author ? `- ${quote.author}` : "- Robert Collier";
  quoteSource.textContent = quote?.source || "Daily Quote";

  applyAnalyticsImage(weeklyImage, weeklyFallback, enhancements.weekly?.chartUrl, "Weekly completion chart");
  applyAnalyticsImage(subjectImage, subjectFallback, enhancements.subjects?.chartUrl, "Subject progress chart");

  const suggestions = Array.isArray(enhancements.insights?.suggestions) ? enhancements.insights.suggestions : [];
  insightsList.innerHTML = "";

  if (!suggestions.length) {
    insightsList.innerHTML = "<li>Finish one pending lecture to unlock smarter study coaching.</li>";
    return;
  }

  suggestions.slice(0, 4).forEach((suggestion) => {
    const item = document.createElement("li");
    item.textContent = suggestion;
    insightsList.appendChild(item);
  });
}

function applyAnalyticsImage(imageNode, fallbackNode, url, alt) {
  if (!imageNode || !fallbackNode) {
    return;
  }

  if (!url) {
    imageNode.classList.add("hidden");
    fallbackNode.textContent = "Analytics image is unavailable right now.";
    fallbackNode.classList.remove("hidden");
    return;
  }

  imageNode.alt = alt;
  imageNode.src = url;
  imageNode.classList.remove("hidden");
  fallbackNode.classList.add("hidden");
}

function renderStats(lectures, userCompletions) {
  const totalLectures = lectures.length;
  const completedLectures = userCompletions.filter((item) => item.completed).length;
  const remainingLectures = Math.max(totalLectures - completedLectures, 0);
  const progressPercentage = totalLectures ? Math.round((completedLectures / totalLectures) * 100) : 0;
  const todayCompletionCount = getTodayCompletionCount(userCompletions);
  const streakCount = getStreakCount(userCompletions);

  document.getElementById("total-lectures").textContent = totalLectures;
  document.getElementById("completed-lectures").textContent = completedLectures;
  document.getElementById("remaining-lectures").textContent = remainingLectures;
  document.getElementById("streak-count").textContent = `${streakCount} day${streakCount === 1 ? "" : "s"}`;
  document.getElementById("overall-progress-value").textContent = `${progressPercentage}%`;
  document.getElementById("overall-progress-label").textContent = `${progressPercentage}%`;
  document.getElementById("overall-progress-bar").style.width = `${progressPercentage}%`;
  document.getElementById("progress-ring").style.background = `conic-gradient(var(--primary) ${progressPercentage * 3.6}deg, rgba(201, 109, 66, 0.12) 0deg)`;

  const dailyTitle = document.getElementById("daily-progress-title");
  const dailyCopy = document.getElementById("daily-progress-copy");

  if (todayCompletionCount > 0) {
    dailyTitle.textContent = `${todayCompletionCount} lecture${todayCompletionCount === 1 ? "" : "s"} completed today`;
    dailyCopy.textContent = "Nice work. Keep the streak alive with one more focused study block.";
  } else {
    dailyTitle.textContent = "No lectures finished yet today";
    dailyCopy.textContent = "Mark a lecture complete to start your daily progress and build momentum.";
  }

  renderMotivation(progressPercentage, todayCompletionCount);
  renderGamification(userCompletions);
}

function renderSubjects(subjects, lectures, userCompletions, linkToLectures = false) {
  const grid = document.getElementById("subjects-grid");
  grid.innerHTML = "";
  const lastViewedLecture = readStorage(STORAGE_KEYS.lastViewedLecture, null);

  subjects.forEach((subject) => {
    const subjectLectures = lectures.filter((lecture) => lecture.subjectId === subject.id);
    const completedCount = subjectLectures.filter((lecture) =>
      userCompletions.some((completion) => completion.lectureId === lecture.id && completion.completed)
    ).length;
    const progress = subjectLectures.length ? Math.round((completedCount / subjectLectures.length) * 100) : 0;
    const completedLectureIds = userCompletions.filter((completion) => completion.completed).map((completion) => completion.lectureId);
    const subjectCompletedLectures = subjectLectures.filter((lecture) => completedLectureIds.includes(lecture.id));
    const lastStudiedLecture = subjectCompletedLectures
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date) || b.lectureNumber - a.lectureNumber)[0];
    const isSelected = lastViewedLecture?.subjectId === subject.id;

    const card = document.createElement("article");
    card.className = `subject-card${isSelected ? " is-selected" : ""}`;
    card.innerHTML = `
      <div class="subject-card-header">
        <h4 class="subject-card-title">${subject.name}</h4>
        <span>${progress}%</span>
      </div>
      <div class="progress-bar">
        <span style="width: ${progress}%"></span>
      </div>
      <div class="subject-meta">
        <span>${completedCount}/${subjectLectures.length} completed</span>
        <span>${progressColorLabel(progress)}</span>
      </div>
      <div class="subject-meta">
        <span>Last studied</span>
        <span>${lastStudiedLecture ? formatDate(lastStudiedLecture.date) : "Not started"}</span>
      </div>
    `;

    if (linkToLectures) {
      card.addEventListener("click", () => {
        card.classList.add("is-pressed");
        setTimeout(() => {
          window.location.href = `lectures.html?subject=${subject.id}`;
        }, 120);
      });
    }

    grid.appendChild(card);
  });
}

function renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate) {
  const list = document.getElementById("lecture-list");
  const title = document.getElementById("lecture-section-title");
  const subtitle = document.getElementById("lecture-section-subtitle");
  const playlistContainer = document.getElementById("subject-playlists");
  const selectedDateLectures = selectedDate
    ? lectures.filter((lecture) => lecture.date === selectedDate)
    : lectures;
  const baseLectures = selectedDate ? selectedDateLectures : lectures;
  const searchValue = (document.getElementById("lecture-search")?.value || "").trim().toLowerCase();
  const statusFilter = document.getElementById("lecture-status-filter")?.value || "all";
  const subjectFilter = document.getElementById("lecture-subject-filter")?.value || "all";
  const sortBy = document.getElementById("lecture-sort")?.value || "date";
  const filteredLectures = selectedSubjectId
    ? baseLectures.filter((lecture) => lecture.subjectId === selectedSubjectId)
    : baseLectures;
  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId);
  const dateLabel = selectedDate ? formatDate(selectedDate) : "";
  const nextLecture = getNextLecture(lectures, userCompletions, selectedSubjectId);
  const todayKey = getLocalDateKey(new Date());
  const processedLectures = filteredLectures
    .map((lecture) => {
      const subject = subjects.find((item) => item.id === lecture.subjectId);
      const completion = userCompletions.find((item) => item.lectureId === lecture.id);
      const isCompleted = Boolean(completion?.completed);
      const stateName = getLectureState(lecture, isCompleted, nextLecture?.id, todayKey);
      const priority = getLecturePriority(stateName);
      return { lecture, subject, isCompleted, stateName, priority };
    })
    .filter((item) => {
      const matchesSearch = !searchValue || item.lecture.title.toLowerCase().includes(searchValue) || item.subject?.name.toLowerCase().includes(searchValue);
      const matchesStatus = statusFilter === "all" || item.stateName === statusFilter;
      const matchesSubject = subjectFilter === "all" || item.lecture.subjectId === subjectFilter;
      return matchesSearch && matchesStatus && matchesSubject;
    });

  populateLectureSubjectFilter(subjects, selectedSubjectId);

  list.innerHTML = "";
  if (selectedSubject && selectedDate) {
    title.textContent = `${selectedSubject.name} lectures on ${dateLabel}`;
  } else if (selectedSubject) {
    title.textContent = `${selectedSubject.name} lectures`;
  } else if (selectedDate) {
    title.textContent = `Lectures on ${dateLabel}`;
  } else {
    title.textContent = "All lectures";
  }
  if (subtitle) {
    subtitle.textContent = processedLectures.length
      ? `${processedLectures.length} lecture${processedLectures.length === 1 ? "" : "s"} in this view. Use filters to reduce decision fatigue.`
      : "No lectures match this view yet. Try another search, state, or date.";
  }
  renderPlaylistLinks(playlistContainer, selectedSubject);

  if (!processedLectures.length) {
    list.innerHTML = `<div class="empty-state">No lectures match this view. Try another filter or open today's focus from the dashboard.</div>`;
    return;
  }

  const groups = groupLecturesForDisplay(processedLectures);
  groups.forEach((group) => {
    if (!group.items.length) return;
    const section = document.createElement("section");
    section.className = "lecture-group";
    section.innerHTML = `
      <div class="lecture-group-header">
        <h4>${group.label}</h4>
        <span>${group.items.length}</span>
      </div>
      <div class="lecture-group-list"></div>
    `;
    const groupList = section.querySelector(".lecture-group-list");
    group.items
      .sort((a, b) => compareLectures(a, b, sortBy))
      .forEach((item) => {
        groupList.appendChild(createLectureCard(item, todayKey));
      });
    list.appendChild(section);
  });
}

function createLectureCard(item, todayKey) {
  const { lecture, subject, isCompleted, stateName, priority } = item;
  const lectureMeta = getLectureMeta(lecture.id);
  const lectureNote = getLectureNoteValue(lecture.id);
  const lectureLinkAction = lecture.youtubeLink
    ? `<a class="playlist-link" href="${lecture.youtubeLink}" target="_blank" rel="noreferrer">Open Link</a>`
    : "";
  const isTodayLecture = lecture.date === todayKey;
  const card = document.createElement("article");
  card.className = `lecture-card ${stateName} priority-${priority}${isTodayLecture ? " today-highlight" : ""}`;
  card.dataset.lectureId = lecture.id;
  card.dataset.state = stateName;
  card.tabIndex = 0;
  card.setAttribute("role", "article");
  card.setAttribute("aria-label", `${subject?.name ?? "Subject"} ${lecture.title}, ${formatDate(lecture.date)}, ${stateName}`);
  card.innerHTML = `
    <div>
      <div class="lecture-title-row">
        <h4>${lecture.title}</h4>
      </div>
      <div class="lecture-meta">
        <span>${subject?.name ?? "General"}</span>
        <span>${formatDate(lecture.date)}</span>
        <span>Lecture ${lecture.lectureNumber}</span>
        <span class="status-pill priority-pill">${priority.toUpperCase()}</span>
        ${lectureMeta.revisionStatus ? `<span class="status-pill revision-pill">${formatRevisionLabel(lectureMeta.revisionStatus)}</span>` : ""}
      </div>
    </div>
    <div class="lecture-actions">
      ${lectureLinkAction}
      <button class="ghost-button focus-launch" type="button">Focus Mode</button>
      <label class="completion-toggle">
        <input type="checkbox" ${isCompleted ? "checked" : ""} data-lecture-id="${lecture.id}">
        <span>Completed</span>
      </label>
    </div>
    <div class="lecture-support-row">
      <button class="bookmark-toggle${lectureMeta.starred ? " active" : ""}" type="button">${lectureMeta.starred ? "★" : "☆"} Bookmark</button>
      <label class="inline-select-shell">
        <span>Revision</span>
        <select class="revision-select">
          <option value="">None</option>
          <option value="revise-later" ${lectureMeta.revisionStatus === "revise-later" ? "selected" : ""}>Revise later</option>
          <option value="important" ${lectureMeta.revisionStatus === "important" ? "selected" : ""}>Important</option>
          <option value="weak-area" ${lectureMeta.revisionStatus === "weak-area" ? "selected" : ""}>Weak area</option>
        </select>
      </label>
    </div>
    <label class="lecture-note-shell">
      <span>Quick note</span>
      <textarea class="lecture-inline-note" placeholder="Add a quick lecture note...">${escapeHtml(lectureNote)}</textarea>
    </label>
  `;

  const checkbox = card.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", (event) => {
    card.querySelector(".completion-toggle")?.classList.add("just-updated");
    upsertCompletion(lecture.id, event.target.checked);
  });
  card.querySelector(".focus-launch").addEventListener("click", () => openFocusMode(lecture, subject));
  card.querySelector(".bookmark-toggle")?.addEventListener("click", () => {
    const nextValue = !getLectureMeta(lecture.id).starred;
    setLectureMetaField(lecture.id, "starred", nextValue);
    showToast(nextValue ? "Lecture bookmarked for revision." : "Lecture bookmark removed.", "success");
    void refreshCurrentPage();
  });
  card.querySelector(".revision-select")?.addEventListener("change", (event) => {
    setLectureMetaField(lecture.id, "revisionStatus", event.target.value);
    showToast(event.target.value ? `Marked as ${formatRevisionLabel(event.target.value).toLowerCase()}.` : "Revision tag cleared.", "info");
    void refreshCurrentPage();
  });
  card.querySelector(".lecture-inline-note")?.addEventListener("input", (event) => {
    setLectureNoteValue(lecture.id, event.target.value);
  });
  card.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("label") || event.target.closest("input") || event.target.closest("button") || event.target.closest("textarea") || event.target.closest("select")) {
      return;
    }
    writeStorage(STORAGE_KEYS.lastViewedLecture, {
      lectureId: lecture.id,
      subjectId: lecture.subjectId,
      date: lecture.date
    });
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFocusMode(lecture, subject);
    }
  });

  return card;
}

function renderPlaylistLinks(container, subject) {
  container.innerHTML = "";

  if (!subject?.playlists?.length) {
    return;
  }

  subject.playlists.forEach((playlist) => {
    const link = document.createElement("a");
    link.className = "playlist-link";
    link.href = playlist.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = playlist.name;
    container.appendChild(link);
  });
}

function renderCalendar(lectures, subjects, actions) {
  const calendarTitle = document.getElementById("calendar-title");
  const calendarGrid = document.getElementById("calendar-grid");
  const todayLectureHeading = document.getElementById("today-lecture-heading");
  const todayLectureList = document.getElementById("today-lecture-list");
  const openDayLectures = document.getElementById("open-day-lectures");
  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const monthBase = parseMonthKey(state.calendarMonth);
  const monthStart = new Date(monthBase.getFullYear(), monthBase.getMonth(), 1);
  const monthEnd = new Date(monthBase.getFullYear(), monthBase.getMonth() + 1, 0);
  const startOffset = monthStart.getDay();
  const totalCells = Math.ceil((startOffset + monthEnd.getDate()) / 7) * 7;
  const selectedDate = state.selectedDate || todayKey;

  calendarTitle.textContent = monthStart.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric"
  });

  calendarGrid.innerHTML = "";

  for (let index = 0; index < totalCells; index += 1) {
    const cellDate = new Date(monthStart);
    cellDate.setDate(index - startOffset + 1);
    const cellKey = getLocalDateKey(cellDate);
    const dayLectures = lectures.filter((lecture) => lecture.date === cellKey);
    const isCurrentMonth = cellDate.getMonth() === monthStart.getMonth();
    const isToday = cellKey === todayKey;

    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute(
      "aria-label",
      `${formatDate(cellKey)}${dayLectures.length ? `, ${dayLectures.length} lecture${dayLectures.length === 1 ? "" : "s"}` : ", no lectures"}`
    );
    cell.setAttribute("aria-pressed", String(cellKey === selectedDate));
    if (!isCurrentMonth) {
      cell.classList.add("muted");
    }
    if (dayLectures.length) {
      cell.classList.add("has-lecture");
    }
    if (isToday) {
      cell.classList.add("today");
    }
    if (cellKey === selectedDate) {
      cell.classList.add("selected");
    }

    const lectureLabel = dayLectures.length
      ? `${dayLectures.length} lecture${dayLectures.length === 1 ? "" : "s"}`
      : "";

    cell.innerHTML = `
      <span class="calendar-day-number">${cellDate.getDate()}</span>
      <span class="calendar-day-meta">${lectureLabel}</span>
    `;
    const activateCell = () => {
      actions.onDateSelect(cellKey);
      if (cellDate.getMonth() !== monthStart.getMonth()) {
        state.calendarMonth = getMonthKey(cellDate);
      }
      requestAnimationFrame(() => {
        const agenda = document.getElementById("calendar-agenda");
        if (agenda) {
          agenda.focus({ preventScroll: true });
        }
      });
    };
    cell.addEventListener("click", activateCell);
    cell.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCell();
      }
    });

    calendarGrid.appendChild(cell);
  }

  const selectedLectures = lectures.filter((lecture) => lecture.date === selectedDate);
  todayLectureHeading.textContent = `Lectures for ${formatDate(selectedDate)}`;
  todayLectureList.innerHTML = "";
  if (openDayLectures) {
    openDayLectures.href = `lectures.html?date=${selectedDate}`;
    openDayLectures.classList.toggle("hidden", !selectedLectures.length);
  }

  if (!selectedLectures.length) {
    todayLectureList.innerHTML = `<div class="empty-state">No lectures scheduled for this day.</div>`;
    return;
  }

  selectedLectures
    .sort((a, b) => a.lectureNumber - b.lectureNumber)
    .forEach((lecture) => {
      const subject = subjects.find((item) => item.id === lecture.subjectId);
      const completion = getCurrentUserCompletions().find((item) => item.lectureId === lecture.id);
      const isCompleted = Boolean(completion?.completed);
      const lectureLinkAction = lecture.youtubeLink
        ? `<a class="playlist-link" href="${lecture.youtubeLink}" target="_blank" rel="noreferrer">Open Link</a>`
        : "";
      const item = document.createElement("div");
      item.className = "today-lecture-item";
      item.innerHTML = `
        <strong>${subject?.name ?? "Subject"} - ${lecture.title}</strong>
        <span class="muted-text">${formatDate(lecture.date)} - Lecture ${lecture.lectureNumber}</span>
        <div class="today-lecture-actions">
          ${lectureLinkAction}
          <label class="completion-toggle">
            <input type="checkbox" ${isCompleted ? "checked" : ""} data-lecture-id="${lecture.id}">
            <span>Completed</span>
          </label>
          <button class="ghost-button" type="button">Open In List</button>
        </div>
      `;
      item.querySelector("button").addEventListener("click", () => {
        writeStorage(STORAGE_KEYS.lastViewedLecture, {
          lectureId: lecture.id,
          subjectId: lecture.subjectId,
          date: lecture.date
        });
        actions.onOpenLecture(lecture);
      });
      item.querySelector("input[type='checkbox']").addEventListener("change", (event) => {
        upsertCompletion(lecture.id, event.target.checked);
      });
      todayLectureList.appendChild(item);
    });
}

function getCurrentUserCompletions() {
  return state.currentCompletions || [];
}

async function upsertCompletion(lectureId, completed) {
  const previousCompletions = [...state.currentCompletions];
  const todayKey = getLocalDateKey(new Date());
  const existingIndex = state.currentCompletions.findIndex((item) => item.lectureId === lectureId);
  const nextCompletions = [...state.currentCompletions];

  if (existingIndex >= 0) {
    nextCompletions[existingIndex] = {
      ...nextCompletions[existingIndex],
      completed,
      completedAt: completed ? todayKey : null
    };
  } else {
    nextCompletions.push({
      lectureId,
      completed,
      completedAt: completed ? todayKey : null
    });
  }

  state.currentCompletions = nextCompletions;
  saveStudyDataCache({
    subjects: state.currentSubjects,
    lectures: state.currentLectures,
    userCompletions: nextCompletions
  });
  showToast(completed ? "Lecture marked complete." : "Lecture moved back to pending.", "success");
  await refreshCurrentPage(false);

  try {
    await apiRequest("/completions/toggle", {
      method: "POST",
      body: JSON.stringify({
        lectureId,
        completed
      })
    });
    maybeSuggestPlanRecovery();
  } catch (error) {
    console.error(error);
    state.currentCompletions = previousCompletions;
    saveStudyDataCache({
      subjects: state.currentSubjects,
      lectures: state.currentLectures,
      userCompletions: previousCompletions
    });
    showToast(error.message || "Unable to update completion right now.", "danger");
    await refreshCurrentPage(false);
  }
}

function getTodayCompletionCount(completions) {
  const today = getLocalDateKey(new Date());
  return completions.filter((item) => item.completed && item.completedAt === today).length;
}

function getStreakCount(completions) {
  const completedDates = completions
    .filter((item) => item.completed && item.completedAt)
    .map((item) => item.completedAt);
  const dateSet = new Set(completedDates);

  if (!dateSet.size) {
    return 0;
  }

  let streak = 0;
  let cursor = new Date();
  const todayKey = getLocalDateKey(cursor);

  if (!dateSet.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (dateSet.has(getLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function progressColorLabel(progress) {
  if (progress < 40) {
    return "Needs focus";
  }
  if (progress < 80) {
    return "On track";
  }
  return "Strong progress";
}

function formatDate(dateString) {
  return parseDateString(dateString).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function parseMonthKey(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function parseDateString(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

async function refreshCurrentPage(force = false) {
  const page = document.body.dataset.page;

  if (page === "dashboard") {
    await initDashboardPage(force);
    return;
  }

  if (page === "insights") {
    await initInsightsPage(force);
    return;
  }

  if (page === "planner") {
    await initPlannerPage(force);
    return;
  }

  if (page === "calendar") {
    await initCalendarPage(force);
    return;
  }

  if (page === "subjects") {
    await initSubjectsPage(force);
    return;
  }

  if (page === "friends") {
    await initFriendsPage();
    return;
  }

  if (page === "leaderboard") {
    await initLeaderboardPage();
    return;
  }

  if (page === "lectures") {
    await initLecturesPage(force);
    return;
  }

  if (page === "settings") {
    initSettingsPage();
    return;
  }

  if (page === "admin") {
    await initAdminPage();
  }
}

function renderNextAction(lectures, subjects, userCompletions) {
  const nextLecture = getNextLecture(lectures, userCompletions);
  const nextActionTitle = document.getElementById("next-action-title");
  const nextActionCopy = document.getElementById("next-action-copy");
  const nextActionBadge = document.getElementById("next-action-badge");
  const nextActionLink = document.getElementById("next-action-link");
  const resumeLink = document.getElementById("resume-link");
  const lastViewedLecture = readStorage(STORAGE_KEYS.lastViewedLecture, null);

  if (!nextActionTitle) {
    return;
  }

  if (!nextLecture) {
    nextActionTitle.textContent = "Everything is complete";
    nextActionCopy.textContent = "You have finished every scheduled lecture. Revisit a subject or keep your streak alive tomorrow.";
    nextActionBadge.textContent = "Finished";
    nextActionLink.classList.add("hidden");
    resumeLink.classList.add("hidden");
    return;
  }

  const subject = subjects.find((item) => item.id === nextLecture.subjectId);
  nextActionTitle.textContent = `${subject?.name ?? "Subject"} - ${nextLecture.title}`;
  nextActionCopy.textContent = `Your next best step is scheduled for ${formatDate(nextLecture.date)}. Start now and keep momentum high.`;
  nextActionBadge.textContent = lectureStatusLabel(nextLecture);
  nextActionLink.href = `lectures.html?subject=${nextLecture.subjectId}&date=${nextLecture.date}`;
  nextActionLink.classList.remove("hidden");

  if (lastViewedLecture?.lectureId) {
    resumeLink.href = `lectures.html?subject=${lastViewedLecture.subjectId}&date=${lastViewedLecture.date}`;
    resumeLink.classList.remove("hidden");
  } else {
    resumeLink.classList.add("hidden");
  }
}

function renderResumeBanner(lectures, subjects) {
  const banner = document.getElementById("resume-banner");
  const link = document.getElementById("resume-banner-link");
  const title = document.getElementById("resume-banner-title");
  if (!banner || !link || !title) {
    return;
  }

  const lastViewedLecture = readStorage(STORAGE_KEYS.lastViewedLecture, null);
  if (!lastViewedLecture?.lectureId) {
    banner.classList.add("hidden");
    return;
  }

  const lecture = lectures.find((item) => item.id === lastViewedLecture.lectureId);
  const subject = subjects.find((item) => item.id === lastViewedLecture.subjectId);
  if (!lecture) {
    banner.classList.add("hidden");
    return;
  }

  title.textContent = `${subject?.name ?? "Subject"} - ${lecture.title}`;
  link.href = `lectures.html?subject=${lecture.subjectId}&date=${lecture.date}`;
  banner.classList.remove("hidden");
}

function renderMotivation(progressPercentage, todayCompletionCount) {
  const title = document.getElementById("motivation-title");
  const copy = document.getElementById("motivation-copy");
  const goalStatus = document.getElementById("daily-goal-status");
  const goalBar = document.getElementById("daily-goal-bar");
  if (!title || !copy || !goalStatus || !goalBar) {
    return;
  }

  if (progressPercentage < 30) {
    title.textContent = "You are building the foundation";
    copy.textContent = "Early consistency matters most. Finish a few lectures now and your dashboard will start compounding progress fast.";
  } else if (progressPercentage < 70) {
    title.textContent = "You are in the momentum zone";
    copy.textContent = "This is the phase where small daily wins turn into real syllabus coverage. Keep the pace steady.";
  } else {
    title.textContent = "You are close to the finish line";
    copy.textContent = "Strong work. Protect your streak and close the final gaps with focused sessions.";
  }

  const goalCount = Math.min(todayCompletionCount, 2);
  goalStatus.textContent = `${goalCount} / 2 completed`;
  goalBar.style.width = `${(goalCount / 2) * 100}%`;
}

function renderGamification(userCompletions) {
  const xpStatus = document.getElementById("xp-status");
  const badgeContainer = document.getElementById("achievement-badges");
  if (!xpStatus || !badgeContainer) return;

  const completedCount = userCompletions.filter((item) => item.completed).length;
  const xp = completedCount * 10;
  const level = Math.max(1, Math.floor(xp / 100) + 1);
  const consistency = Math.min(Math.round((getWeeklyCompletionCount(userCompletions) / DEFAULT_WEEKLY_CHALLENGE) * 100), 100);
  xpStatus.textContent = `${xp} XP - Level ${level} - Consistency ${consistency}%`;

  const badges = [];
  if (completedCount >= 1) badges.push("First Win");
  if (getStreakCount(userCompletions) >= 3) badges.push("3-Day Streak");
  if (completedCount >= 10) badges.push("10 Lectures");
  if (consistency >= 100) badges.push("Consistency Ace");
  if (!badges.length) badges.push("Getting Started");

  badgeContainer.innerHTML = "";
  badges.forEach((badge) => {
    const pill = document.createElement("span");
    pill.className = "achievement-badge";
    pill.textContent = badge;
    badgeContainer.appendChild(pill);
  });
}

function maybeCelebrate(lectures, userCompletions) {
  const banner = document.getElementById("celebration-banner");
  const title = document.getElementById("celebration-title");
  const copy = document.getElementById("celebration-copy");
  if (!banner || !title || !copy) {
    return;
  }

  const completedLectures = userCompletions.filter((item) => item.completed).length;
  const totalLectures = lectures.length;
  const progressPercentage = totalLectures ? Math.round((completedLectures / totalLectures) * 100) : 0;
  const milestone = progressPercentage >= 100 ? 100 : progressPercentage >= 75 ? 75 : progressPercentage >= 50 ? 50 : 0;
  const lastCelebration = readStorage(STORAGE_KEYS.lastCelebration, 0);

  if (!milestone || milestone === lastCelebration) {
    banner.classList.add("hidden");
    return;
  }

  title.textContent = `${milestone}% milestone reached`;
  copy.textContent = milestone === 100
    ? "You completed the full study plan. Incredible work."
    : "Your consistency is paying off. Keep the momentum going.";
  banner.classList.remove("hidden");
  writeStorage(STORAGE_KEYS.lastCelebration, milestone);

  setTimeout(() => {
    banner.classList.add("hidden");
  }, 4500);
}

function getNextLecture(lectures, userCompletions, selectedSubjectId = null) {
  const completedLectureIds = new Set(
    userCompletions.filter((completion) => completion.completed).map((completion) => completion.lectureId)
  );
  const candidates = lectures
    .filter((lecture) => !completedLectureIds.has(lecture.id))
    .filter((lecture) => (selectedSubjectId ? lecture.subjectId === selectedSubjectId : true))
    .sort((a, b) => a.date.localeCompare(b.date) || a.lectureNumber - b.lectureNumber);
  return candidates[0] || null;
}

function getLastViewedLecture(lectures) {
  const lastViewedLecture = readStorage(STORAGE_KEYS.lastViewedLecture, null);
  if (!lastViewedLecture?.lectureId) {
    return null;
  }
  return lectures.find((lecture) => lecture.id === lastViewedLecture.lectureId) || null;
}

function lectureStatusLabel(lecture) {
  const today = getLocalDateKey(new Date());
  if (lecture.date === today) {
    return "Today";
  }
  if (lecture.date > today) {
    return "Upcoming";
  }
  return "Pending";
}

function bindThemeToggle() {
  document.querySelectorAll("#theme-toggle").forEach((button) => {
    button.onclick = () => {
      const current = readStorage(STORAGE_KEYS.theme, "light");
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    };
  });
  document.querySelectorAll("#theme-toggle-secondary").forEach((button) => {
    button.onclick = () => {
      const current = readStorage(STORAGE_KEYS.theme, "light");
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    };
  });
  document.querySelectorAll("#theme-toggle-slider").forEach((input) => {
    input.onchange = (event) => {
      setTheme(event.target.checked ? "dark" : "light");
    };
  });
}

function applyTheme() {
  const theme = readStorage(STORAGE_KEYS.theme, "light");
  document.body.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector("meta[name='theme-color']")?.setAttribute(
    "content",
    theme === "dark" ? "#0a1018" : "#eef3f8"
  );
  document.querySelectorAll("#theme-toggle-slider").forEach((input) => {
    input.checked = theme === "dark";
  });
  document.querySelectorAll("#theme-switch-label").forEach((label) => {
    label.textContent = theme === "dark" ? "On" : "Off";
  });
}

function setTheme(theme) {
  writeStorage(STORAGE_KEYS.theme, theme);
  applyTheme();
}

function bindPageTransitions() {
  document.querySelectorAll("a[href$='.html'], a[href*='.html?']").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.add("is-transitioning");
      const veil = document.getElementById("page-transition-veil");
      veil?.classList.add("visible");
    });
  });
}

function initBarbaTransitions() {
  if (window.location.protocol === "file:" || !window.barba || window.__learnifyBarbaInitialized || !document.querySelector("[data-barba='wrapper']")) {
    return;
  }

  window.__learnifyBarbaInitialized = true;

  window.barba.init({
    preventRunning: true,
    transitions: [
      {
        name: "learnify-fade-slide",
        async leave(data) {
          document.body.classList.add("is-transitioning");
          const veil = document.getElementById("page-transition-veil");
          veil?.classList.add("visible");
          data.current.container.classList.add("barba-leave-active");
          await wait(240);
        },
        async enter(data) {
          syncBarbaPageState(data.next);
          if (data.current?.container?.isConnected) {
            data.current.container.remove();
          }
          data.next.container.classList.add("barba-enter-active");
          await bootstrapCurrentPage({ verifySession: false });
          requestAnimationFrame(() => {
            document.body.classList.remove("is-transitioning");
            const veil = document.getElementById("page-transition-veil");
            veil?.classList.remove("visible");
          });
          await wait(360);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },
        async once() {
          document.body.classList.remove("is-transitioning");
          const veil = document.getElementById("page-transition-veil");
          veil?.classList.remove("visible");
        }
      }
    ]
  });
}

function syncBarbaPageState(next) {
  const parser = new DOMParser();
  const nextDocument = parser.parseFromString(next.html, "text/html");
  document.body.dataset.page = next.container.dataset.page || nextDocument.body.dataset.page || "dashboard";
  document.title = nextDocument.title;
  state.reactInsightsRequested = false;
  document.body.classList.remove("focus-active");
  closeFocusMode();

  const canonical = document.querySelector("link[rel='canonical']");
  const nextCanonical = nextDocument.querySelector("link[rel='canonical']");
  if (canonical && nextCanonical) {
    canonical.href = nextCanonical.href;
  }

  const themeColor = document.querySelector("meta[name='theme-color']");
  const nextThemeColor = nextDocument.querySelector("meta[name='theme-color']");
  if (themeColor && nextThemeColor) {
    themeColor.setAttribute("content", nextThemeColor.getAttribute("content") || "");
  }

  const metaSelectors = [
    "meta[name='description']",
    "meta[name='robots']",
    "meta[property='og:title']",
    "meta[property='og:description']",
    "meta[property='og:url']",
    "meta[name='twitter:title']",
    "meta[name='twitter:description']"
  ];

  metaSelectors.forEach((selector) => {
    const currentNode = document.querySelector(selector);
    const nextNode = nextDocument.querySelector(selector);
    if (currentNode && nextNode) {
      const content = nextNode.getAttribute("content");
      if (content !== null) {
        currentNode.setAttribute("content", content);
      }
    }
  });
}

function ensurePageTransitionVeil() {
  if (document.getElementById("page-transition-veil")) {
    return;
  }
  const veil = document.createElement("div");
  veil.id = "page-transition-veil";
  veil.className = "page-transition-veil";
  document.body.appendChild(veil);
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-transitioning");
    veil.classList.remove("visible");
  });
}

function ensureSkipLink() {
  if (document.querySelector(".skip-link")) {
    return;
  }
  const target = document.querySelector(".page-view, .auth-view, main, section.view");
  if (target && !target.id) {
    target.id = "main-content";
  }
  const skipLink = document.createElement("a");
  skipLink.className = "skip-link";
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to content";
  document.body.insertAdjacentElement("afterbegin", skipLink);
}

function enhanceStatusAccessibility() {
  [
    "auth-message",
    "friend-search-status",
    "api-base-url-status",
    "planner-status",
    "admin-key-status",
    "install-app-status"
  ].forEach((id) => {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
  });
}

function decorateEmptyStates() {
  document.querySelectorAll(".empty-state").forEach((node) => {
    if (node.querySelector(".empty-state-badge")) {
      return;
    }
    const badge = document.createElement("span");
    badge.className = "empty-state-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = "○";
    node.prepend(badge);
  });
}

function applyStagger(containerSelector, itemSelector) {
  document.querySelectorAll(containerSelector).forEach((container) => {
    container.querySelectorAll(itemSelector).forEach((item, index) => {
      item.classList.add("stagger-item");
      item.style.setProperty("--stagger-delay", `${Math.min(index * 55, 360)}ms`);
    });
  });
}

function finalizeVisualPass() {
  decorateEmptyStates();
  applyStagger(".stats-grid", ".stat-card");
  applyStagger(".subjects-grid", ".subject-card");
  applyStagger(".lecture-list", ".lecture-group");
  applyStagger(".friends-list", ".friend-chip");
  applyStagger(".leaderboard-list", ".leaderboard-row");
  applyStagger(".analysis-list", ".analysis-row");
  applyStagger(".planner-schedule-list", ".planner-day-card");
  applyStagger(".subject-notes-grid", ".subject-note-card");
  applyGsapEnhancements();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearGsapEnhancements() {
  motionState.cleanup.forEach((cleanup) => {
    try {
      cleanup();
    } catch (error) {
      console.warn("Animation cleanup failed", error);
    }
  });
  motionState.cleanup = [];
}

function applyGsapEnhancements() {
  clearGsapEnhancements();

  if (prefersReducedMotion() || !window.gsap) {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger && !motionState.scrollTriggersRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    motionState.scrollTriggersRegistered = true;
  }

  const heroNodes = document.querySelectorAll(".app-header, .topbar, .auth-card, .hero-panel, .summary-header");
  if (heroNodes.length) {
    gsap.fromTo(
      heroNodes,
      { y: 16, opacity: 0, filter: "blur(10px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "all"
      }
    );
  }

  const revealSelectors = [
    ".stat-card",
    ".chart-card",
    ".action-card",
    ".subject-card",
    ".lecture-card",
    ".today-focus-item",
    ".leaderboard-row",
    ".friend-chip",
    ".analysis-row",
    ".planner-day-card",
    ".subject-note-card",
    ".marketing-feature",
    ".preview-card",
    ".testimonial-card"
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (ScrollTrigger) {
        const tween = gsap.fromTo(
          node,
          { y: 22, opacity: 0, filter: "blur(12px)", scale: 0.988 },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            delay: Math.min(index * 0.018, 0.12),
            clearProps: "all",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true
            }
          }
        );
        motionState.cleanup.push(() => tween.scrollTrigger?.kill());
      } else {
        gsap.fromTo(
          node,
          { y: 22, opacity: 0, filter: "blur(12px)", scale: 0.988 },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.72,
            ease: "power3.out",
            delay: Math.min(index * 0.018, 0.12),
            clearProps: "all"
          }
        );
      }
    });
  });

  document.querySelectorAll(".calendar-panel, .summary-panel, .page-panel").forEach((panel) => {
    if (!ScrollTrigger) {
      return;
    }
    const tween = gsap.to(panel, {
      yPercent: -1.25,
      ease: "none",
      scrollTrigger: {
        trigger: panel,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });
    motionState.cleanup.push(() => tween.scrollTrigger?.kill());
  });

  const interactiveNodes = document.querySelectorAll(
    ".primary-button, .ghost-button, .playlist-link, .app-link, .subject-card, .lecture-card, .stat-card, .chart-card, .action-card, .leaderboard-row, .friend-chip, .calendar-day"
  );

  interactiveNodes.forEach((node) => {
    const isCard = node.matches(".subject-card, .lecture-card, .stat-card, .chart-card, .action-card, .leaderboard-row, .friend-chip, .calendar-day");
    const handleEnter = () => {
      gsap.to(node, {
        y: isCard ? -4 : -1,
        scale: node.matches(".primary-button, .ghost-button, .playlist-link, .app-link") ? 1.01 : 1.008,
        duration: 0.34,
        ease: "power2.out",
        overwrite: "auto"
      });
    };
    const handleLeave = () => {
      gsap.to(node, {
        y: 0,
        scale: 1,
        duration: 0.42,
        ease: "power3.out",
        overwrite: "auto"
      });
    };
    const handleDown = () => {
      gsap.to(node, {
        scale: 0.988,
        duration: 0.14,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        overwrite: "auto"
      });
    };

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);
    node.addEventListener("focus", handleEnter, true);
    node.addEventListener("blur", handleLeave, true);
    node.addEventListener("pointerdown", handleDown);

    motionState.cleanup.push(() => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
      node.removeEventListener("focus", handleEnter, true);
      node.removeEventListener("blur", handleLeave, true);
      node.removeEventListener("pointerdown", handleDown);
      gsap.killTweensOf(node);
    });
  });
}

function renderTodaysFocus(lectures, subjects, userCompletions) {
  const container = document.getElementById("today-focus-list");
  const title = document.getElementById("today-focus-title");
  const copy = document.getElementById("today-focus-copy");
  const time = document.getElementById("today-focus-time");
  const startLink = document.getElementById("start-session-link");
  const openLink = document.getElementById("today-focus-open");
  if (!container || !title || !copy || !time || !startLink || !openLink) return;

  const todayKey = getLocalDateKey(new Date());
  const todaysLectures = lectures.filter((lecture) => lecture.date === todayKey);
  const nextLecture = getNextLecture(todaysLectures, userCompletions);
  title.textContent = `${todaysLectures.length} lecture${todaysLectures.length === 1 ? "" : "s"} scheduled today`;
  time.textContent = `${todaysLectures.length * ESTIMATED_LECTURE_MINUTES} mins`;
  container.innerHTML = "";

  if (!todaysLectures.length) {
    copy.textContent = "No lectures are scheduled for today. Use the calendar or resume a previous session.";
    startLink.classList.add("hidden");
    openLink.classList.add("hidden");
    container.innerHTML = `<div class="empty-state">Free day. Review a weak topic, revise notes, or plan tomorrow's deep work block.</div>`;
    return;
  }

  copy.textContent = nextLecture
    ? `Start with ${nextLecture.title} and protect a single uninterrupted block of deep work.`
    : "Today's lecture plan is complete. Use the extra time for revision or notes cleanup.";
  if (nextLecture) {
    startLink.href = `lectures.html?subject=${nextLecture.subjectId}&date=${nextLecture.date}`;
    startLink.classList.remove("hidden");
  } else {
    startLink.classList.add("hidden");
  }
  openLink.href = `lectures.html?date=${todayKey}`;
  openLink.classList.remove("hidden");

  todaysLectures
    .sort((a, b) => a.lectureNumber - b.lectureNumber)
    .forEach((lecture) => {
      const subject = subjects.find((item) => item.id === lecture.subjectId);
      const completion = userCompletions.find((item) => item.lectureId === lecture.id);
      const row = document.createElement("article");
      row.className = `today-focus-item${completion?.completed ? " is-done" : ""}`;
      row.innerHTML = `
        <div>
          <strong>${subject?.name ?? "Subject"} - ${lecture.title}</strong>
          <span class="muted-text">${ESTIMATED_LECTURE_MINUTES} min block</span>
        </div>
        <a class="ghost-button" href="lectures.html?subject=${lecture.subjectId}&date=${lecture.date}">Start</a>
      `;
      container.appendChild(row);
    });
}

function renderAnalytics(lectures, subjects, userCompletions) {
  renderWeeklyChart(userCompletions);
  renderSubjectComparison(lectures, subjects, userCompletions);
  renderHeatmap(userCompletions);
}

function renderWeeklyChart(userCompletions) {
  const container = document.getElementById("weekly-chart");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = getLocalDateKey(date);
    const count = userCompletions.filter((item) => item.completedAt === key).length;
    const bar = document.createElement("div");
    bar.className = "weekly-bar";
    bar.innerHTML = `
      <span>${date.toLocaleDateString(undefined, { weekday: "short" })}</span>
      <div class="weekly-bar-track"><span style="height:${Math.max(count * 28, 10)}px"></span></div>
      <strong>${count}</strong>
    `;
    container.appendChild(bar);
  }
}

function renderSubjectComparison(lectures, subjects, userCompletions) {
  const container = document.getElementById("subject-comparison");
  if (!container) return;
  container.innerHTML = "";
  subjects.forEach((subject) => {
    const subjectLectures = lectures.filter((lecture) => lecture.subjectId === subject.id);
    const completed = subjectLectures.filter((lecture) =>
      userCompletions.some((completion) => completion.lectureId === lecture.id && completion.completed)
    ).length;
    const progress = subjectLectures.length ? Math.round((completed / subjectLectures.length) * 100) : 0;
    const row = document.createElement("div");
    row.className = "comparison-row";
    row.innerHTML = `
      <span>${subject.name}</span>
      <div class="comparison-track"><span style="width:${progress}%"></span></div>
      <strong>${progress}%</strong>
    `;
    container.appendChild(row);
  });
}

function renderHeatmap(userCompletions) {
  const container = document.getElementById("study-heatmap");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 27; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = getLocalDateKey(date);
    const count = userCompletions.filter((item) => item.completedAt === key).length;
    const cell = document.createElement("div");
    cell.className = `heatmap-cell intensity-${Math.min(count, 4)}`;
    cell.title = `${formatDate(key)}: ${count} completed`;
    container.appendChild(cell);
  }
}

function bindLectureFilters(lectures, subjects, userCompletions, selectedSubjectId, selectedDate) {
  const search = document.getElementById("lecture-search");
  const filter = document.getElementById("lecture-status-filter");
  const subjectFilter = document.getElementById("lecture-subject-filter");
  const sortSelect = document.getElementById("lecture-sort");
  if (search) {
    search.oninput = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  }
  if (filter) {
    filter.onchange = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  }
  if (subjectFilter) {
    subjectFilter.onchange = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  }
  if (sortSelect) {
    sortSelect.onchange = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  }
}

function bindKeyboardShortcuts(lectures, userCompletions, selectedSubjectId) {
  document.onkeydown = (event) => {
    if (document.body.dataset.page !== "lectures") return;
    if (document.body.classList.contains("focus-active") && event.key === "Escape") {
      closeFocusMode();
      return;
    }
    if (event.target.matches("input, textarea, select")) return;
    if (event.key.toLowerCase() === "n") {
      const nextLecture = getNextLecture(lectures, userCompletions, selectedSubjectId);
      if (nextLecture) {
        writeStorage(STORAGE_KEYS.lastViewedLecture, { lectureId: nextLecture.id, subjectId: nextLecture.subjectId, date: nextLecture.date });
        window.location.href = `lectures.html?subject=${nextLecture.subjectId}&date=${nextLecture.date}`;
      }
    }
    if (event.key.toLowerCase() === "c") {
      const currentCheckbox = document.querySelector(".lecture-card.current input[type='checkbox']:not(:checked)");
      if (currentCheckbox) currentCheckbox.click();
    }
  };
}

function groupLecturesForDisplay(items) {
  const groups = {
    overdue: { label: "Overdue", items: [] },
    today: { label: "Today", items: [] },
    tomorrow: { label: "Tomorrow", items: [] },
    upcoming: { label: "Upcoming", items: [] },
    completed: { label: "Completed", items: [] }
  };
  items.forEach((item) => {
    if (item.stateName === "completed") groups.completed.items.push(item);
    else if (item.stateName === "overdue") groups.overdue.items.push(item);
    else if (item.stateName === "today" || item.stateName === "current") groups.today.items.push(item);
    else if (item.stateName === "tomorrow") groups.tomorrow.items.push(item);
    else groups.upcoming.items.push(item);
  });
  return [groups.overdue, groups.today, groups.tomorrow, groups.upcoming, groups.completed];
}

function getLectureState(lecture, isCompleted, nextLectureId, todayKey) {
  if (isCompleted) return "completed";
  if (lecture.id === nextLectureId) return "current";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = getLocalDateKey(tomorrow);
  if (lecture.date < todayKey) return "overdue";
  if (lecture.date === todayKey) return "today";
  if (lecture.date === tomorrowKey) return "tomorrow";
  return "pending";
}

function getLecturePriority(stateName) {
  if (stateName === "overdue" || stateName === "current") return "high";
  if (stateName === "today" || stateName === "tomorrow") return "medium";
  return "low";
}

let focusTimerInterval = null;
let focusRemainingSeconds = 2 * 60 * 60;
const DEFAULT_FOCUS_SECONDS = 2 * 60 * 60;
let focusAudioContext = null;
let focusNoiseNode = null;
let focusNoiseGain = null;
let focusBreakMode = false;

function bindFocusMode() {
  const closeButton = document.getElementById("focus-close");
  const toggleButton = document.getElementById("focus-timer-toggle");
  const resetButton = document.getElementById("focus-timer-reset");
  const completeButton = document.getElementById("focus-complete");
  const notes = document.getElementById("focus-notes");
  const hoursInput = document.getElementById("focus-hours");
  const minutesInput = document.getElementById("focus-minutes");
  const breakButton = document.getElementById("focus-break-toggle");
  const fullscreenButton = document.getElementById("focus-fullscreen");
  const ambientButton = document.getElementById("focus-ambient-toggle");
  if (!closeButton || !toggleButton || !resetButton || !completeButton || !notes || !hoursInput || !minutesInput) return;

  closeButton.onclick = closeFocusMode;
  toggleButton.onclick = toggleFocusTimer;
  resetButton.onclick = resetFocusTimer;
  if (breakButton) {
    breakButton.onclick = toggleBreakMode;
  }
  if (fullscreenButton) {
    fullscreenButton.onclick = toggleFocusFullscreen;
  }
  if (ambientButton) {
    ambientButton.onclick = toggleAmbientSound;
  }
  const syncTimerFromInputs = () => {
    if (focusTimerInterval) {
      return;
    }
    focusRemainingSeconds = getFocusInputSeconds();
    updateFocusTimerDisplay();
  };
  hoursInput.oninput = syncTimerFromInputs;
  minutesInput.oninput = syncTimerFromInputs;
  notes.oninput = () => {
    const lectureId = notes.dataset.lectureId;
    if (!lectureId) return;
    setLectureNoteValue(lectureId, notes.value);
  };
  completeButton.onclick = () => {
    const lectureId = completeButton.dataset.lectureId;
    if (lectureId) upsertCompletion(lectureId, true);
    storeFocusSession(lectureId);
    closeFocusMode();
  };
}

function openFocusMode(lecture, subject) {
  const focus = document.getElementById("focus-mode");
  const notes = document.getElementById("focus-notes");
  if (!focus || !notes) return;
  const stored = readStorage(STORAGE_KEYS.lectureNotes, {});
  focusBreakMode = false;
  document.getElementById("focus-lecture-title").textContent = `${subject?.name ?? "Subject"} - ${lecture.title}`;
  document.getElementById("focus-lecture-meta").textContent = `${formatDate(lecture.date)} - Lecture ${lecture.lectureNumber}`;
  document.getElementById("focus-open-link").href = lecture.youtubeLink || "#";
  document.getElementById("focus-complete").dataset.lectureId = lecture.id;
  notes.dataset.lectureId = lecture.id;
  notes.value = stored[lecture.id] || "";
  renderFocusChecklist(lecture.id);
  renderFocusHistory();
  focus.classList.remove("hidden");
  document.body.classList.add("focus-active");
  writeStorage(STORAGE_KEYS.lastViewedLecture, { lectureId: lecture.id, subjectId: lecture.subjectId, date: lecture.date });
  resetFocusTimer();
}

function closeFocusMode() {
  const focus = document.getElementById("focus-mode");
  document.body.classList.remove("focus-active");
  if (focus) {
    focus.classList.add("hidden");
  }
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
  }
  focusBreakMode = false;
  const button = document.getElementById("focus-timer-toggle");
  if (button) {
    button.textContent = "Start Timer";
  }
  const breakButton = document.getElementById("focus-break-toggle");
  if (breakButton) {
    breakButton.textContent = "Start 10 min break";
  }
  stopAmbientSound();
}

function toggleFocusTimer() {
  const button = document.getElementById("focus-timer-toggle");
  if (!button) return;
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
    button.textContent = "Start Timer";
    return;
  }
  focusRemainingSeconds = getFocusInputSeconds();
  updateFocusTimerDisplay();
  focusBreakMode = false;
  button.textContent = "Pause Timer";
  focusTimerInterval = setInterval(() => {
    focusRemainingSeconds -= 1;
    updateFocusTimerDisplay();
    if (focusRemainingSeconds <= 0) {
      clearInterval(focusTimerInterval);
      focusTimerInterval = null;
      button.textContent = "Start Timer";
      focusRemainingSeconds = DEFAULT_FOCUS_SECONDS;
      setFocusInputValues(DEFAULT_FOCUS_SECONDS);
      updateFocusTimerDisplay();
      showToast(focusBreakMode ? "Break finished. Return to your lecture." : "Focus block complete. Log your notes before switching context.", "success");
      focusBreakMode = false;
    }
  }, 1000);
}

function resetFocusTimer() {
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
  }
  focusBreakMode = false;
  focusRemainingSeconds = DEFAULT_FOCUS_SECONDS;
  setFocusInputValues(DEFAULT_FOCUS_SECONDS);
  const button = document.getElementById("focus-timer-toggle");
  if (button) button.textContent = "Start Timer";
  const breakButton = document.getElementById("focus-break-toggle");
  if (breakButton) breakButton.textContent = "Start 10 min break";
  updateFocusTimerDisplay();
}

function updateFocusTimerDisplay() {
  const display = document.getElementById("focus-timer-display");
  if (!display) return;
  const hours = String(Math.floor(focusRemainingSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((focusRemainingSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(focusRemainingSeconds % 60).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

function getFocusInputSeconds() {
  const hoursInput = document.getElementById("focus-hours");
  const minutesInput = document.getElementById("focus-minutes");
  const hours = Math.max(0, Math.min(12, Number(hoursInput?.value ?? 2) || 0));
  const minutes = Math.max(0, Math.min(59, Number(minutesInput?.value ?? 0) || 0));
  return Math.max(60, (hours * 60 * 60) + (minutes * 60));
}

function setFocusInputValues(totalSeconds) {
  const hoursInput = document.getElementById("focus-hours");
  const minutesInput = document.getElementById("focus-minutes");
  if (!hoursInput || !minutesInput) return;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  hoursInput.value = String(hours);
  minutesInput.value = String(minutes);
}

function bindCalendarNavigation(reloadPage) {
  const prevButton = document.getElementById("calendar-prev");
  const nextButton = document.getElementById("calendar-next");
  const todayButton = document.getElementById("calendar-today");

  if (prevButton) {
    prevButton.onclick = () => {
      const currentMonth = parseMonthKey(state.calendarMonth);
      state.calendarMonth = getMonthKey(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
      reloadPage();
    };
  }

  if (nextButton) {
    nextButton.onclick = () => {
      const currentMonth = parseMonthKey(state.calendarMonth);
      state.calendarMonth = getMonthKey(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
      reloadPage();
    };
  }

  if (todayButton) {
    todayButton.onclick = () => {
      const today = new Date();
      state.calendarMonth = getMonthKey(today);
      state.selectedDate = getLocalDateKey(today);
      reloadPage();
    };
  }
}

function getLectureMetaMap() {
  return readStorage(STORAGE_KEYS.lectureMeta, {});
}

function getLectureMeta(lectureId) {
  return getLectureMetaMap()[lectureId] || {
    starred: false,
    revisionStatus: ""
  };
}

function setLectureMetaField(lectureId, field, value) {
  const metaMap = getLectureMetaMap();
  metaMap[lectureId] = {
    ...getLectureMeta(lectureId),
    [field]: value
  };
  writeStorage(STORAGE_KEYS.lectureMeta, metaMap);
}

function getLectureNoteValue(lectureId) {
  const stored = readStorage(STORAGE_KEYS.lectureNotes, {});
  return stored[lectureId] || "";
}

function setLectureNoteValue(lectureId, value) {
  const stored = readStorage(STORAGE_KEYS.lectureNotes, {});
  stored[lectureId] = value;
  writeStorage(STORAGE_KEYS.lectureNotes, stored);
}

function formatRevisionLabel(value) {
  if (value === "revise-later") return "Revise later";
  if (value === "important") return "Important";
  if (value === "weak-area") return "Weak area";
  return "None";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function populateLectureSubjectFilter(subjects, selectedSubjectId) {
  const subjectFilter = document.getElementById("lecture-subject-filter");
  if (!subjectFilter || selectedSubjectId) {
    return;
  }

  const currentValue = subjectFilter.value || "all";
  subjectFilter.innerHTML = `<option value="all">All subjects</option>${subjects
    .map((subject) => `<option value="${subject.id}">${subject.name}</option>`)
    .join("")}`;
  subjectFilter.value = currentValue;
}

function compareLectures(a, b, sortBy) {
  if (sortBy === "number") {
    return a.lecture.lectureNumber - b.lecture.lectureNumber || a.lecture.date.localeCompare(b.lecture.date);
  }
  if (sortBy === "priority") {
    const priorityRank = { high: 0, medium: 1, low: 2 };
    return (priorityRank[a.priority] ?? 2) - (priorityRank[b.priority] ?? 2)
      || a.lecture.date.localeCompare(b.lecture.date)
      || a.lecture.lectureNumber - b.lecture.lectureNumber;
  }
  return a.lecture.date.localeCompare(b.lecture.date) || a.lecture.lectureNumber - b.lecture.lectureNumber;
}

function getPlannerConfig() {
  return readStorage(STORAGE_KEYS.plannerConfig, {
    examName: "",
    examDate: "",
    dailyGoal: DEFAULT_DAILY_GOAL,
    weekdaysOnly: false
  });
}

function savePlannerConfig(config) {
  writeStorage(STORAGE_KEYS.plannerConfig, config);
}

function savePlannerSchedule(schedule) {
  writeStorage(STORAGE_KEYS.plannerSchedule, schedule);
}

function getPlannerSchedule() {
  return readStorage(STORAGE_KEYS.plannerSchedule, []);
}

function buildStudyPlan(lectures, userCompletions, config) {
  const completedLectureIds = new Set(
    userCompletions.filter((item) => item.completed).map((item) => item.lectureId)
  );
  const pendingLectures = lectures
    .filter((lecture) => !completedLectureIds.has(lecture.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.lectureNumber - b.lectureNumber);

  if (!config.examDate || !pendingLectures.length) {
    return {
      plan: [],
      pendingLectures,
      behindCount: 0,
      readinessScore: completedLectureIds.size ? Math.round((completedLectureIds.size / lectures.length) * 100) : 0
    };
  }

  const plan = [];
  const cursor = parseDateString(getLocalDateKey(new Date()));
  let lectureIndex = 0;
  const examDate = parseDateString(config.examDate);
  const todayKey = getLocalDateKey(cursor);

  while (cursor <= examDate && lectureIndex < pendingLectures.length) {
    const dayOfWeek = cursor.getDay();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    if (!config.weekdaysOnly || isWeekday) {
      const dateKey = getLocalDateKey(cursor);
      const lecturesForDay = pendingLectures.slice(lectureIndex, lectureIndex + Number(config.dailyGoal || DEFAULT_DAILY_GOAL));
      lectureIndex += lecturesForDay.length;
      if (lecturesForDay.length) {
        plan.push({
          date: dateKey,
          lectures: lecturesForDay,
          isOverdueDay: dateKey < todayKey
        });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  const assignedLectureIds = new Set(plan.flatMap((entry) => entry.lectures.map((lecture) => lecture.id)));
  const unplanned = pendingLectures.filter((lecture) => !assignedLectureIds.has(lecture.id));
  if (unplanned.length) {
    plan.push({
      date: config.examDate,
      lectures: unplanned,
      isOverdueDay: false,
      overflow: true
    });
  }

  const behindCount = plan
    .filter((entry) => entry.date < todayKey)
    .reduce((total, entry) => total + entry.lectures.length, 0);
  const readinessScore = lectures.length ? Math.round(((lectures.length - pendingLectures.length) / lectures.length) * 100) : 0;

  return {
    plan,
    pendingLectures,
    behindCount,
    readinessScore
  };
}

function renderPlannerPage(lectures, subjects, userCompletions) {
  const examNameInput = document.getElementById("planner-exam-name");
  const examDateInput = document.getElementById("planner-exam-date");
  const dailyGoalInput = document.getElementById("planner-daily-goal");
  const weekdaysInput = document.getElementById("planner-weekdays-only");
  const generateButton = document.getElementById("planner-generate");
  const clearButton = document.getElementById("planner-clear");
  const status = document.getElementById("planner-status");
  const scheduleList = document.getElementById("planner-schedule-list");
  const config = getPlannerConfig();

  if (!examNameInput || !examDateInput || !dailyGoalInput || !weekdaysInput || !generateButton || !clearButton || !status || !scheduleList) {
    return;
  }

  examNameInput.value = config.examName || "";
  examDateInput.value = config.examDate || "";
  dailyGoalInput.value = String(config.dailyGoal || DEFAULT_DAILY_GOAL);
  weekdaysInput.checked = Boolean(config.weekdaysOnly);

  const renderCurrentPlan = () => {
    const nextConfig = {
      examName: examNameInput.value.trim(),
      examDate: examDateInput.value,
      dailyGoal: Math.max(1, Number(dailyGoalInput.value || DEFAULT_DAILY_GOAL)),
      weekdaysOnly: weekdaysInput.checked
    };

    savePlannerConfig(nextConfig);
    const { plan, pendingLectures, behindCount, readinessScore } = buildStudyPlan(lectures, userCompletions, nextConfig);
    savePlannerSchedule(plan);
    const countdown = nextConfig.examDate ? getDaysUntil(nextConfig.examDate) : null;

    document.getElementById("planner-health-title").textContent = nextConfig.examName
      ? `${nextConfig.examName} plan`
      : "Study plan";
    document.getElementById("planner-health-copy").textContent = pendingLectures.length
      ? `You have ${pendingLectures.length} pending lectures. ${behindCount ? `${behindCount} are behind your current plan.` : "You are on pace right now."}`
      : "All lectures are complete. Use the remaining time for revision and mock tests.";
    document.getElementById("planner-countdown").textContent = countdown === null ? "--" : `${countdown} days`;
    document.getElementById("planner-pending").textContent = String(pendingLectures.length);
    document.getElementById("planner-behind").textContent = String(behindCount);
    document.getElementById("planner-readiness").textContent = `${readinessScore}%`;
    document.getElementById("planner-progress-bar").style.width = `${readinessScore}%`;

    if (!nextConfig.examDate) {
      status.textContent = "Add an exam date to generate your schedule.";
      scheduleList.innerHTML = `<div class="empty-state compact">Set your exam date first, then Learnify Elite will distribute pending lectures across the calendar.</div>`;
      return;
    }

    status.textContent = behindCount
      ? `You are ${behindCount} lecture${behindCount === 1 ? "" : "s"} behind the plan.`
      : "You are aligned with your current study plan.";
    scheduleList.innerHTML = "";

    if (!plan.length) {
      scheduleList.innerHTML = `<div class="empty-state compact">No pending lectures left. You can now focus on revision and past papers.</div>`;
      return;
    }

    plan.forEach((entry) => {
      const card = document.createElement("article");
      card.className = `planner-day-card${entry.isOverdueDay ? " is-overdue" : ""}${entry.overflow ? " is-overflow" : ""}`;
      card.innerHTML = `
        <div class="planner-day-header">
          <div>
            <strong>${formatDate(entry.date)}</strong>
            <span class="muted-text">${entry.lectures.length} lecture${entry.lectures.length === 1 ? "" : "s"}</span>
          </div>
          <span class="status-pill">${entry.isOverdueDay ? "Catch up" : entry.overflow ? "Overflow" : "Planned"}</span>
        </div>
        <div class="planner-day-list">
          ${entry.lectures.map((lecture) => {
            const subject = subjects.find((item) => item.id === lecture.subjectId);
            return `<a class="planner-lecture-link" href="lectures.html?subject=${lecture.subjectId}&date=${lecture.date}">${subject?.name ?? "Subject"} - ${lecture.title}</a>`;
          }).join("")}
        </div>
      `;
      scheduleList.appendChild(card);
    });
  };

  generateButton.onclick = renderCurrentPlan;
  clearButton.onclick = () => {
    examNameInput.value = "";
    examDateInput.value = "";
    dailyGoalInput.value = String(DEFAULT_DAILY_GOAL);
    weekdaysInput.checked = false;
    renderCurrentPlan();
  };

  renderCurrentPlan();
}

function renderPlanStatusCard(lectures, userCompletions) {
  const container = document.getElementById("plan-status-card");
  if (!container) {
    return;
  }

  const config = getPlannerConfig();
  const { behindCount, pendingLectures, readinessScore } = buildStudyPlan(lectures, userCompletions, config);
  container.innerHTML = `
    <div class="metric-chip"><span>Pending</span><strong>${pendingLectures.length}</strong></div>
    <div class="metric-chip"><span>Behind</span><strong>${behindCount}</strong></div>
    <div class="metric-chip"><span>Readiness</span><strong>${readinessScore}%</strong></div>
  `;
}

function renderOverdueRecovery(lectures, subjects, userCompletions) {
  const container = document.getElementById("overdue-recovery-list");
  if (!container) {
    return;
  }

  const todayKey = getLocalDateKey(new Date());
  const completedLectureIds = new Set(userCompletions.filter((item) => item.completed).map((item) => item.lectureId));
  const overdue = lectures
    .filter((lecture) => lecture.date < todayKey && !completedLectureIds.has(lecture.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.lectureNumber - b.lectureNumber)
    .slice(0, 5);

  if (!overdue.length) {
    container.innerHTML = `<div class="empty-state compact">No overdue lectures right now. You can stay focused on today's plan.</div>`;
    return;
  }

  container.innerHTML = overdue.map((lecture, index) => {
    const subject = subjects.find((item) => item.id === lecture.subjectId);
    return `
      <article class="analysis-row">
        <div>
          <strong>${index + 1}. ${subject?.name ?? "Subject"} - ${lecture.title}</strong>
          <p class="muted-text">Scheduled for ${formatDate(lecture.date)}. Recover this before piling on newer lectures.</p>
        </div>
        <a class="ghost-button" href="lectures.html?subject=${lecture.subjectId}&date=${lecture.date}">Open</a>
      </article>
    `;
  }).join("");
}

async function getAnalyticsSnapshot(force = false) {
  const cached = getAnalyticsCache();
  if (!force && state.analyticsSnapshot) {
    return state.analyticsSnapshot;
  }
  if (!force && cached) {
    state.analyticsSnapshot = cached;
    return cached;
  }

  const requests = await Promise.allSettled([
    apiRequest("/analytics/weekly"),
    apiRequest("/analytics/subjects"),
    apiRequest("/analytics/insights")
  ]);

  const snapshot = {
    weekly: requests[0].status === "fulfilled" ? requests[0].value.data || null : null,
    subjects: requests[1].status === "fulfilled" ? requests[1].value.data || null : null,
    insights: requests[2].status === "fulfilled" ? requests[2].value.data || null : null
  };

  state.analyticsSnapshot = snapshot;
  saveAnalyticsCache(snapshot);
  return snapshot;
}

function renderInsightsPage(lectures, subjects, userCompletions, enhancements) {
  const completedLectureIds = new Set(userCompletions.filter((item) => item.completed).map((item) => item.lectureId));
  const completedCount = completedLectureIds.size;
  const readiness = lectures.length ? Math.round((completedCount / lectures.length) * 100) : 0;
  const overdueItems = getOverdueLectures(lectures, userCompletions);
  const weakSubjects = subjects
    .map((subject) => {
      const subjectLectures = lectures.filter((lecture) => lecture.subjectId === subject.id);
      const completed = subjectLectures.filter((lecture) => completedLectureIds.has(lecture.id)).length;
      const progress = subjectLectures.length ? Math.round((completed / subjectLectures.length) * 100) : 0;
      return { subject, completed, total: subjectLectures.length, progress };
    })
    .sort((a, b) => a.progress - b.progress);
  const recentDailyCounts = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = getLocalDateKey(date);
    return userCompletions.filter((item) => item.completedAt === key).length;
  });
  const velocity = recentDailyCounts.reduce((sum, count) => sum + count, 0) / recentDailyCounts.length;

  document.getElementById("insights-readiness-title").textContent = `${readiness}% readiness score`;
  document.getElementById("insights-readiness-copy").textContent = overdueItems.length
    ? `${overdueItems.length} overdue lecture${overdueItems.length === 1 ? "" : "s"} are dragging down your readiness.`
    : "You have no overdue lectures right now, which keeps your readiness healthier.";
  document.getElementById("insights-readiness-bar").style.width = `${readiness}%`;

  document.getElementById("velocity-title").textContent = `${velocity.toFixed(1)} lectures / day`;
  document.getElementById("velocity-copy").textContent = velocity >= 2
    ? "Your recent pace supports a strong finish if you keep the same rhythm."
    : "Your recent pace is below the default 2-lecture target, so recovery blocks will help.";

  const streakHistory = document.getElementById("streak-history");
  streakHistory.innerHTML = "";
  Array.from({ length: 8 }, (_, index) => {
    const days = 7 * (7 - index);
    const windowEnd = new Date();
    windowEnd.setDate(windowEnd.getDate() - days);
    const count = Array.from({ length: 7 }, (_, inner) => {
      const sample = new Date(windowEnd);
      sample.setDate(sample.getDate() + inner);
      const key = getLocalDateKey(sample);
      return userCompletions.some((item) => item.completedAt === key);
    }).filter(Boolean).length;
    const cell = document.createElement("div");
    cell.className = "streak-history-cell";
    cell.innerHTML = `<span>W${index + 1}</span><strong>${count}/7</strong>`;
    streakHistory.appendChild(cell);
  });

  applyAnalyticsImage(
    document.getElementById("insights-weekly-chart"),
    document.getElementById("insights-weekly-fallback"),
    enhancements.weekly?.chartUrl,
    "Weekly completion chart"
  );

  const weaknessList = document.getElementById("subject-weakness-list");
  weaknessList.innerHTML = weakSubjects.map((entry, index) => `
    <article class="analysis-row">
      <div>
        <strong>${index + 1}. ${entry.subject.name}</strong>
        <p class="muted-text">${entry.completed}/${entry.total} completed. ${progressColorLabel(entry.progress)}.</p>
      </div>
      <span class="status-pill">${entry.progress}%</span>
    </article>
  `).join("");

  const recoveryList = document.getElementById("recovery-plan-list");
  recoveryList.innerHTML = overdueItems.length
    ? overdueItems.slice(0, 6).map((lecture, index) => {
        const subject = subjects.find((item) => item.id === lecture.subjectId);
        return `
          <article class="analysis-row">
            <div>
              <strong>${index + 1}. ${subject?.name ?? "Subject"} - ${lecture.title}</strong>
              <p class="muted-text">Missed on ${formatDate(lecture.date)}. Recover this before newer lectures.</p>
            </div>
            <a class="ghost-button" href="lectures.html?subject=${lecture.subjectId}&date=${lecture.date}">Recover</a>
          </article>
        `;
      }).join("")
    : `<div class="empty-state compact">No overdue lectures. Your recovery plan is clear right now.</div>`;

  const suggestionsList = document.getElementById("insights-suggestions-list");
  const suggestions = Array.isArray(enhancements.insights?.suggestions) ? enhancements.insights.suggestions : [];
  suggestionsList.innerHTML = "";
  (suggestions.length ? suggestions.slice(0, 4) : getFallbackSuggestions(lectures, userCompletions)).forEach((suggestion) => {
    const item = document.createElement("li");
    item.textContent = suggestion;
    suggestionsList.appendChild(item);
  });
}

function getOverdueLectures(lectures, userCompletions) {
  const todayKey = getLocalDateKey(new Date());
  const completedLectureIds = new Set(userCompletions.filter((item) => item.completed).map((item) => item.lectureId));
  return lectures
    .filter((lecture) => lecture.date < todayKey && !completedLectureIds.has(lecture.id))
    .sort((a, b) => a.date.localeCompare(b.date) || a.lectureNumber - b.lectureNumber);
}

function getFallbackSuggestions(lectures, userCompletions) {
  const overdue = getOverdueLectures(lectures, userCompletions);
  const streak = getStreakCount(userCompletions);
  return [
    overdue.length
      ? `Clear your oldest overdue lecture first to stop recovery debt from growing.`
      : `Stay on plan by completing today's scheduled lecture block first.`,
    streak
      ? `Complete 1 more lecture today to protect your ${streak}-day streak.`
      : "Start a new streak with one finished lecture today.",
    "Use Focus Mode for the next lecture so notes, timer, and checklist stay in one place."
  ];
}

function renderSubjectNotes(subjects) {
  const grid = document.getElementById("subject-notes-grid");
  if (!grid) {
    return;
  }

  const storedNotes = readStorage(STORAGE_KEYS.subjectNotes, {});
  grid.innerHTML = "";

  subjects.forEach((subject) => {
    const card = document.createElement("article");
    card.className = "subject-note-card";
    card.innerHTML = `
      <div class="section-heading">
        <div>
          <span class="eyebrow">${subject.name}</span>
          <h4>Revision note</h4>
        </div>
        <a class="ghost-button" href="lectures.html?subject=${subject.id}">Open lectures</a>
      </div>
      <textarea class="focus-notes subject-note-input" placeholder="Add formulas, weak concepts, or revision reminders...">${escapeHtml(storedNotes[subject.id] || "")}</textarea>
    `;
    card.querySelector(".subject-note-input").addEventListener("input", (event) => {
      storedNotes[subject.id] = event.target.value;
      writeStorage(STORAGE_KEYS.subjectNotes, storedNotes);
    });
    grid.appendChild(card);
  });
}

function getDaysUntil(dateKey) {
  const today = parseDateString(getLocalDateKey(new Date()));
  const target = parseDateString(dateKey);
  return Math.max(Math.ceil((target - today) / (1000 * 60 * 60 * 24)), 0);
}

function maybeSuggestPlanRecovery() {
  const lectures = state.currentLectures || [];
  const completions = state.currentCompletions || [];
  const config = getPlannerConfig();
  if (!config.examDate) {
    return;
  }
  const { behindCount } = buildStudyPlan(lectures, completions, config);
  if (behindCount >= 2) {
    showToast(`You are ${behindCount} lectures behind your current plan.`, "warning");
  }
}

function maybeShowSmartNotifications(lectures, userCompletions) {
  const todayCount = getTodayCompletionCount(userCompletions);
  const streak = getStreakCount(userCompletions);
  if (streak > 0 && todayCount === 0) {
    showToast(`Streak risk: finish 1 lecture today to protect your ${streak}-day streak.`, "warning");
  }
  maybeSuggestPlanRecovery();
}

function renderWeeklyWinnerCard(friends) {
  const container = document.getElementById("weekly-winner-card");
  if (!container) {
    return;
  }

  const winner = friends[0];
  if (!winner) {
    container.innerHTML = `<div class="empty-state compact">Add friends to surface a weekly winner.</div>`;
    return;
  }

  container.innerHTML = `
    <article class="friend-chip spotlight">
      <div class="friend-chip-main">
        ${buildAvatarMarkup(winner, `${winner.name} avatar`)}
        <div>
          <strong>${winner.name}</strong>
          <span class="muted-text">Most likely to set the pace this week</span>
        </div>
      </div>
    </article>
  `;
}

function renderWeeklyChallengeCard() {
  const container = document.getElementById("challenge-card");
  if (!container) {
    return;
  }

  const weeklyCount = getWeeklyCompletionCount(state.currentCompletions || []);
  const remaining = Math.max(DEFAULT_WEEKLY_CHALLENGE - weeklyCount, 0);
  container.innerHTML = `
    <div class="goal-row">
      <span>This week</span>
      <strong>${weeklyCount} / ${DEFAULT_WEEKLY_CHALLENGE}</strong>
    </div>
    <div class="progress-bar"><span style="width:${Math.min((weeklyCount / DEFAULT_WEEKLY_CHALLENGE) * 100, 100)}%"></span></div>
    <p class="muted-text">${remaining ? `Complete ${remaining} more lecture${remaining === 1 ? "" : "s"} to finish the weekly challenge.` : "Challenge complete. Push for a personal best."}</p>
  `;
}

function renderFriendActivityFeed(friends) {
  const container = document.getElementById("friend-activity-feed");
  if (!container) {
    return;
  }

  if (!friends.length) {
    container.innerHTML = `<div class="empty-state compact">Add friends to see shared momentum and study activity.</div>`;
    return;
  }

  container.innerHTML = friends.slice(0, 4).map((friend, index) => `
    <article class="analysis-row">
      <div>
        <strong>${friend.name}</strong>
        <p class="muted-text">${index === 0 ? "is setting the pace this week." : index === 1 ? "just moved up the accountability board." : "is still in the race - one focused session could change the board."}</p>
      </div>
      <span class="status-pill">Active</span>
    </article>
  `).join("");
}

function renderLeaderboardSubjectComparison(lectures, subjects, userCompletions) {
  const container = document.getElementById("leaderboard-subject-compare");
  if (!container) {
    return;
  }

  const completedLectureIds = new Set(userCompletions.filter((item) => item.completed).map((item) => item.lectureId));
  const rows = subjects.map((subject) => {
    const subjectLectures = lectures.filter((lecture) => lecture.subjectId === subject.id);
    const completed = subjectLectures.filter((lecture) => completedLectureIds.has(lecture.id)).length;
    const progress = subjectLectures.length ? Math.round((completed / subjectLectures.length) * 100) : 0;
    return { subject, progress, completed, total: subjectLectures.length };
  });

  container.innerHTML = rows.map((row) => `
    <div class="comparison-row">
      <span>${row.subject.name}</span>
      <div class="comparison-track"><span style="width:${row.progress}%"></span></div>
      <strong>${row.progress}%</strong>
    </div>
  `).join("");
}

function getWeeklyCompletionCount(completions) {
  const start = parseDateString(getLocalDateKey(new Date()));
  start.setDate(start.getDate() - 6);
  return completions.filter((item) => item.completed && item.completedAt && parseDateString(item.completedAt) >= start).length;
}

function ensureToastHost() {
  if (document.getElementById("toast-host")) {
    return;
  }
  const host = document.createElement("div");
  host.id = "toast-host";
  host.className = "toast-host";
  host.setAttribute("aria-live", "polite");
  host.setAttribute("aria-atomic", "false");
  document.body.appendChild(host);
}

function showToast(message, tone = "info") {
  const host = document.getElementById("toast-host");
  if (!host) {
    return;
  }
  const signature = `${tone}:${message}`;
  const lastShown = Number(host.dataset.lastToastAt || 0);
  if (host.dataset.lastToastSignature === signature && Date.now() - lastShown < 4000) {
    return;
  }
  host.dataset.lastToastSignature = signature;
  host.dataset.lastToastAt = String(Date.now());
  const toast = document.createElement("div");
  toast.className = `toast toast-${tone}`;
  toast.textContent = message;
  host.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("visible"));
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

function showQueuedToasts() {
  popQueuedToasts().forEach((item) => showToast(item.message, item.tone));
}

function registerServiceWorker() {
  if (
    !("serviceWorker" in navigator)
    || window.location.protocol === "file:"
    || window.Capacitor?.isNativePlatform?.()
  ) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => undefined);
  }, { once: true });
}

function bindInstallPromptUi() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPromptEvent = event;
    const button = document.getElementById("install-app-button");
    const status = document.getElementById("install-app-status");
    if (button) {
      button.classList.remove("hidden");
      button.onclick = async () => {
        state.installPromptEvent?.prompt();
        const choice = await state.installPromptEvent?.userChoice;
        if (choice?.outcome === "accepted") {
          showToast("Learnify Elite is being installed.", "success");
          button.classList.add("hidden");
        }
      };
    }
    if (status) {
      status.textContent = "Install is available on this device.";
    }
  });
}

function getAdminApiKey() {
  return localStorage.getItem(STORAGE_KEYS.adminApiKey) || "";
}

function saveAdminApiKey(value) {
  if (value?.trim()) {
    localStorage.setItem(STORAGE_KEYS.adminApiKey, value.trim());
    return;
  }
  localStorage.removeItem(STORAGE_KEYS.adminApiKey);
}

async function adminRequest(path, body) {
  return apiRequest(path, {
    method: "POST",
    headers: {
      "x-admin-key": getAdminApiKey()
    },
    body: JSON.stringify(body)
  });
}

function renderAdminPage(subjects) {
  const keyInput = document.getElementById("admin-api-key");
  const keyButton = document.getElementById("save-admin-api-key");
  const keyStatus = document.getElementById("admin-key-status");
  const subjectName = document.getElementById("admin-subject-name");
  const createSubjectButton = document.getElementById("admin-create-subject");
  const subjectSelect = document.getElementById("admin-subject-select");
  const lectureTitle = document.getElementById("admin-lecture-title");
  const lectureDate = document.getElementById("admin-lecture-date");
  const lectureNumber = document.getElementById("admin-lecture-number");
  const lectureLink = document.getElementById("admin-lecture-link");
  const createLectureButton = document.getElementById("admin-create-lecture");
  const csvInput = document.getElementById("admin-csv-input");
  const importButton = document.getElementById("admin-import-csv");
  const clearButton = document.getElementById("admin-clear-csv");
  const activityLog = document.getElementById("admin-activity-log");

  if (!keyInput || !keyButton || !keyStatus || !subjectSelect || !activityLog) {
    return;
  }

  const appendLog = (message) => {
    const row = document.createElement("div");
    row.className = "admin-log-row";
    row.textContent = message;
    activityLog.prepend(row);
  };

  keyInput.value = getAdminApiKey();
  keyStatus.textContent = getAdminApiKey() ? "Admin key saved locally." : "Enter your admin key to create or import content.";
  subjectSelect.innerHTML = subjects.map((subject) => `<option value="${subject.id}">${subject.name}</option>`).join("");

  keyButton.onclick = () => {
    saveAdminApiKey(keyInput.value);
    keyStatus.textContent = getAdminApiKey() ? "Admin key saved locally." : "Admin key cleared.";
    showToast("Admin key updated.", "success");
  };

  createSubjectButton.onclick = async () => {
    if (!subjectName.value.trim()) {
      showToast("Enter a subject name first.", "warning");
      return;
    }
    try {
      await adminRequest("/admin/subjects", { name: subjectName.value.trim() });
      appendLog(`Created subject: ${subjectName.value.trim()}`);
      showToast("Subject created.", "success");
      subjectName.value = "";
      clearStudyDataCache();
      await initAdminPage();
    } catch (error) {
      showToast(error.message || "Unable to create subject.", "danger");
    }
  };

  createLectureButton.onclick = async () => {
    try {
      await adminRequest("/admin/lectures", {
        title: lectureTitle.value.trim(),
        subject: subjectSelect.value,
        youtubeLink: lectureLink.value.trim(),
        date: lectureDate.value,
        lectureNumber: Number(lectureNumber.value || 1)
      });
      appendLog(`Created lecture: ${lectureTitle.value.trim()}`);
      showToast("Lecture created.", "success");
      lectureTitle.value = "";
      lectureDate.value = "";
      lectureNumber.value = "1";
      lectureLink.value = "";
      clearStudyDataCache();
    } catch (error) {
      showToast(error.message || "Unable to create lecture.", "danger");
    }
  };

  importButton.onclick = async () => {
    const rows = parseCsvSchedule(csvInput.value);
    if (!rows.length) {
      showToast("Paste schedule rows before importing.", "warning");
      return;
    }

    const subjectMap = new Map(subjects.map((subject) => [subject.name.toLowerCase(), subject.id]));
    let imported = 0;
    for (const row of rows) {
      try {
        let subjectId = subjectMap.get(row.subject.toLowerCase());
        if (!subjectId) {
          const created = await adminRequest("/admin/subjects", { name: row.subject });
          subjectId = created.data?._id || created.data?.id;
          subjectMap.set(row.subject.toLowerCase(), subjectId);
          appendLog(`Created missing subject: ${row.subject}`);
        }
        await adminRequest("/admin/lectures", {
          title: row.lecture,
          subject: subjectId,
          youtubeLink: row.link,
          date: row.date,
          lectureNumber: row.lectureNumber
        });
        imported += 1;
      } catch (error) {
        appendLog(`Skipped row for ${row.subject} ${row.lecture}: ${error.message}`);
      }
    }
    clearStudyDataCache();
    appendLog(`CSV import finished. ${imported} lecture rows created.`);
    showToast(`Imported ${imported} lecture rows.`, "success");
  };

  clearButton.onclick = () => {
    csvInput.value = "";
  };
}

function parseCsvSchedule(raw) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.toLowerCase().startsWith("date,subject"))
    .map((line) => {
      const [dateText, subject, lecture, link = ""] = line.split(",");
      const date = normalizeImportedDate(dateText);
      const lectureNumberMatch = lecture.match(/(\d+)/);
      return {
        date,
        subject: subject.trim(),
        lecture: lecture.trim(),
        link: link.trim(),
        lectureNumber: lectureNumberMatch ? Number(lectureNumberMatch[1]) : 1
      };
    })
    .filter((row) => row.date && row.subject && row.lecture);
}

function normalizeImportedDate(value) {
  const raw = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return getLocalDateKey(parsed);
  }
  const parts = raw.split("-");
  if (parts.length === 3) {
    const [day, monthName, year] = parts;
    const probe = new Date(`${day} ${monthName} ${year}`);
    if (!Number.isNaN(probe.getTime())) {
      return getLocalDateKey(probe);
    }
  }
  return null;
}

function toggleBreakMode() {
  focusBreakMode = !focusBreakMode;
  focusRemainingSeconds = focusBreakMode ? DEFAULT_BREAK_SECONDS : DEFAULT_FOCUS_SECONDS;
  setFocusInputValues(focusRemainingSeconds);
  updateFocusTimerDisplay();
  const breakButton = document.getElementById("focus-break-toggle");
  if (breakButton) {
    breakButton.textContent = focusBreakMode ? "Back to focus timer" : "Start 10 min break";
  }
  const timerButton = document.getElementById("focus-timer-toggle");
  if (timerButton) {
    timerButton.textContent = "Start Timer";
  }
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
  }
}

function toggleFocusFullscreen() {
  const panel = document.querySelector(".focus-mode-panel");
  if (!panel) {
    return;
  }
  if (!document.fullscreenElement) {
    panel.requestFullscreen?.().catch(() => undefined);
    return;
  }
  document.exitFullscreen?.().catch(() => undefined);
}

function toggleAmbientSound() {
  const button = document.getElementById("focus-ambient-toggle");
  if (focusNoiseNode) {
    stopAmbientSound();
    if (button) {
      button.textContent = "Ambient sound off";
    }
    return;
  }

  try {
    focusAudioContext = focusAudioContext || new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = focusAudioContext.sampleRate * 2;
    const noiseBuffer = focusAudioContext.createBuffer(1, bufferSize, focusAudioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i += 1) {
      const white = (Math.random() * 2) - 1;
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 3.5;
    }

    focusNoiseNode = focusAudioContext.createBufferSource();
    focusNoiseNode.buffer = noiseBuffer;
    focusNoiseNode.loop = true;
    focusNoiseGain = focusAudioContext.createGain();
    focusNoiseGain.gain.value = 0.02;
    focusNoiseNode.connect(focusNoiseGain).connect(focusAudioContext.destination);
    focusNoiseNode.start();
    if (button) {
      button.textContent = "Ambient sound on";
    }
  } catch (error) {
    showToast("Ambient sound is unavailable in this browser.", "warning");
  }
}

function stopAmbientSound() {
  try {
    focusNoiseNode?.stop();
  } catch (error) {
    // noop
  }
  focusNoiseNode = null;
  if (focusNoiseGain) {
    focusNoiseGain.disconnect();
    focusNoiseGain = null;
  }
}

function getFocusChecklistMap() {
  return readStorage(STORAGE_KEYS.focusChecklist, {});
}

function renderFocusChecklist(lectureId) {
  const container = document.getElementById("focus-checklist");
  if (!container) {
    return;
  }
  const map = getFocusChecklistMap();
  const items = map[lectureId] || [
    { label: "Watch actively", done: false },
    { label: "Write 3 key points", done: false },
    { label: "Flag weak concepts", done: false }
  ];

  container.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("label");
    row.className = "focus-checklist-item";
    row.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""}>
      <span>${item.label}</span>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      items[index].done = event.target.checked;
      map[lectureId] = items;
      writeStorage(STORAGE_KEYS.focusChecklist, map);
    });
    container.appendChild(row);
  });
}

function storeFocusSession(lectureId) {
  const sessions = readStorage(STORAGE_KEYS.focusSessions, []);
  sessions.unshift({
    lectureId,
    recordedAt: new Date().toISOString(),
    durationMinutes: Math.round((getFocusInputSeconds() - focusRemainingSeconds) / 60)
  });
  writeStorage(STORAGE_KEYS.focusSessions, sessions.slice(0, 12));
  renderFocusHistory();
}

function renderFocusHistory() {
  const container = document.getElementById("focus-history");
  if (!container) {
    return;
  }
  const sessions = readStorage(STORAGE_KEYS.focusSessions, []);
  if (!sessions.length) {
    container.innerHTML = `<div class="empty-state compact">Your completed focus sessions will appear here.</div>`;
    return;
  }

  container.innerHTML = sessions.map((session) => {
    const lecture = (state.currentLectures || []).find((item) => item.id === session.lectureId);
    return `
      <article class="analysis-row">
        <div>
          <strong>${lecture?.title || "Lecture session"}</strong>
          <p class="muted-text">${new Date(session.recordedAt).toLocaleString()} - ${Math.max(session.durationMinutes, 0)} min</p>
        </div>
      </article>
    `;
  }).join("");
}

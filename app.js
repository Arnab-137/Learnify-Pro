const STORAGE_KEYS = {
  session: "study-tracker-session",
  theme: "study-tracker-theme",
  lastViewedLecture: "study-tracker-last-viewed-lecture",
  lastCelebration: "study-tracker-last-celebration",
  lectureNotes: "study-tracker-lecture-notes",
  apiBaseUrl: "study-tracker-api-base-url"
};

const LIVE_API_BASE_URL = "https://learnify-pro.onrender.com/api";

const DEFAULT_API_BASE_URL = (() => {
  if (window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:5000/api";
  }
  return LIVE_API_BASE_URL;
})();

const ESTIMATED_LECTURE_MINUTES = 45;

const DATA_SEED_VERSION = 6;

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
  hasStudyData: false
};

document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.page;

  if (page === "auth") {
    await initAuthPage();
    return;
  }

  state.currentUser = await hydrateCurrentUser();

  if (!state.currentUser) {
    window.location.href = "index.html";
    return;
  }

  if (!state.calendarMonth) {
    state.calendarMonth = getMonthKey(new Date());
  }

  if (!state.selectedDate) {
    state.selectedDate = getQueryParam("date") || getLocalDateKey(new Date());
  }

  renderAppFrame();

  if (page === "dashboard") {
    await initDashboardPage();
    return;
  }

  if (page === "calendar") {
    await initCalendarPage();
    return;
  }

  if (page === "subjects") {
    await initSubjectsPage();
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
    await initLecturesPage();
    return;
  }

  if (page === "settings") {
    initSettingsPage();
  }
});

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
  return localStorage.getItem(STORAGE_KEYS.apiBaseUrl) || DEFAULT_API_BASE_URL;
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
}

function getAuthToken() {
  return getStoredSession()?.token || null;
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
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
    try {
      response = await fetch(requestUrl, {
        ...options,
        headers
      });
    } catch (error) {
      if (attempt < maxAttempts) {
        await wait(450 * attempt);
        continue;
      }

      const networkError = new Error(`Unable to reach backend at ${getApiBaseUrl()}. Start the backend server and check the API base URL in Settings.`);
      networkError.isNetworkError = true;
      throw networkError;
    }

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

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email
  };
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
  if (!force && state.hasStudyData) {
    return {
      subjects: state.currentSubjects,
      lectures: state.currentLectures,
      userCompletions: state.currentCompletions
    };
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

  return {
    subjects,
    lectures,
    userCompletions: completions
  };
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

      const response = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const user = normalizeUser(response.data?.user);
      saveSession({
        token: response.data?.token,
        user
      });
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
  const navDashboard = document.getElementById("nav-dashboard");
  const navSubjects = document.getElementById("nav-subjects");
  const navLectures = document.getElementById("nav-lectures");
  const navFocus = document.getElementById("nav-focus");
  const navFriends = document.getElementById("nav-friends");
  const navLeaderboard = document.getElementById("nav-leaderboard");
  const navSettings = document.getElementById("nav-settings");
  const focusModeRequested = getQueryParam("focus") === "1";

  if (navDashboard) {
    navDashboard.classList.toggle("active", page === "dashboard");
  }
  if (navSubjects) {
    navSubjects.classList.toggle("active", page === "subjects");
  }
  if (navLectures) {
    navLectures.classList.toggle("active", page === "lectures" && !focusModeRequested);
  }
  if (navFocus) {
    navFocus.classList.toggle("active", page === "lectures" && focusModeRequested);
  }
  if (navFriends) {
    navFriends.classList.toggle("active", page === "friends");
  }
  if (navLeaderboard) {
    navLeaderboard.classList.toggle("active", page === "leaderboard");
  }
  if (navSettings) {
    navSettings.classList.toggle("active", page === "settings");
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
}

async function initSubjectsPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  renderSubjects(subjects, lectures, userCompletions, true);
}

async function initFriendsPage() {
  await renderFriendsPanel();
}

async function initLeaderboardPage() {
  await renderLeaderboardPanel();
}

async function initLecturesPage(force = false) {
  const { lectures, subjects, userCompletions } = await loadStudyData(force);
  const selectedSubjectId = getQueryParam("subject");
  const selectedDate = getQueryParam("date");
  const focusModeRequested = getQueryParam("focus") === "1";

  renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  renderResumeBanner(lectures, subjects);
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
    };
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
        <div>
          <strong>${friend.name}</strong>
          <span class="muted-text">${friend.email}</span>
        </div>
      `;
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
          <div>
            <strong>${friend.name}</strong>
            <span class="muted-text">${friend.email}</span>
          </div>
          <div class="friend-chip-meta">
            <button class="ghost-button accept-request" type="button">Accept</button>
            <button class="ghost-button danger reject-request" type="button">Reject</button>
          </div>
        `;
        card.querySelector(".accept-request").onclick = async () => {
          await apiRequest(`/friends/accept/${friend.id}`, { method: "POST" });
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
          <div>
            <strong>${friend.name}</strong>
            <span class="muted-text">${friend.email}</span>
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
          <div>
            <strong>${result.name}</strong>
            <span class="muted-text">${result.email}</span>
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
            await loadFriendsData();
            await runSearch();
          };
        }

        if (result.requestReceived) {
          actionButton.onclick = async () => {
            await apiRequest(`/friends/accept/${result.id}`, { method: "POST" });
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
          <div class="leaderboard-user">
            <strong>${entry.name}</strong>
            <span class="muted-text">${entry.completedLectures}/${entry.totalLectures} completed - ${entry.progressPercentage}% progress</span>
          </div>
          <span class="leaderboard-streak">${entry.streak} day streak</span>
        `;
        leaderboard.appendChild(row);
      });

      rivalryCopy.textContent = getRivalryMessage(competitors);
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
      return matchesSearch && matchesStatus;
    });

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
      .sort((a, b) => a.lecture.date.localeCompare(b.lecture.date) || a.lecture.lectureNumber - b.lecture.lectureNumber)
      .forEach((item) => {
        groupList.appendChild(createLectureCard(item, todayKey));
      });
    list.appendChild(section);
  });
}

function createLectureCard(item, todayKey) {
  const { lecture, subject, isCompleted, stateName, priority } = item;
  const lectureLinkAction = lecture.youtubeLink
    ? `<a class="playlist-link" href="${lecture.youtubeLink}" target="_blank" rel="noreferrer">Open Link</a>`
    : "";
  const isTodayLecture = lecture.date === todayKey;
  const card = document.createElement("article");
  card.className = `lecture-card ${stateName} priority-${priority}${isTodayLecture ? " today-highlight" : ""}`;
  card.dataset.lectureId = lecture.id;
  card.dataset.state = stateName;
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
  `;

  const checkbox = card.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", (event) => {
    card.querySelector(".completion-toggle")?.classList.add("just-updated");
    upsertCompletion(lecture.id, event.target.checked);
  });
  card.querySelector(".focus-launch").addEventListener("click", () => openFocusMode(lecture, subject));
  card.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("label") || event.target.closest("input") || event.target.closest("button")) {
      return;
    }
    writeStorage(STORAGE_KEYS.lastViewedLecture, {
      lectureId: lecture.id,
      subjectId: lecture.subjectId,
      date: lecture.date
    });
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
          agenda.scrollIntoView({ behavior: "smooth", block: "start" });
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
  try {
    await apiRequest("/completions/toggle", {
      method: "POST",
      body: JSON.stringify({
        lectureId,
        completed
      })
    });
    await refreshCurrentPage(true);
  } catch (error) {
    console.error(error);
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
  xpStatus.textContent = `${xp} XP - Level ${level}`;

  const badges = [];
  if (completedCount >= 1) badges.push("First Win");
  if (getStreakCount(userCompletions) >= 3) badges.push("3-Day Streak");
  if (completedCount >= 10) badges.push("10 Lectures");
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
  if (search) {
    search.oninput = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
  }
  if (filter) {
    filter.onchange = () => renderLectures(lectures, subjects, userCompletions, selectedSubjectId, selectedDate);
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

function bindFocusMode() {
  const closeButton = document.getElementById("focus-close");
  const toggleButton = document.getElementById("focus-timer-toggle");
  const resetButton = document.getElementById("focus-timer-reset");
  const completeButton = document.getElementById("focus-complete");
  const notes = document.getElementById("focus-notes");
  const hoursInput = document.getElementById("focus-hours");
  const minutesInput = document.getElementById("focus-minutes");
  if (!closeButton || !toggleButton || !resetButton || !completeButton || !notes || !hoursInput || !minutesInput) return;

  closeButton.onclick = closeFocusMode;
  toggleButton.onclick = toggleFocusTimer;
  resetButton.onclick = resetFocusTimer;
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
    const stored = readStorage(STORAGE_KEYS.lectureNotes, {});
    stored[lectureId] = notes.value;
    writeStorage(STORAGE_KEYS.lectureNotes, stored);
  };
  completeButton.onclick = () => {
    const lectureId = completeButton.dataset.lectureId;
    if (lectureId) upsertCompletion(lectureId, true);
    closeFocusMode();
  };
}

function openFocusMode(lecture, subject) {
  const focus = document.getElementById("focus-mode");
  const notes = document.getElementById("focus-notes");
  if (!focus || !notes) return;
  const stored = readStorage(STORAGE_KEYS.lectureNotes, {});
  document.getElementById("focus-lecture-title").textContent = `${subject?.name ?? "Subject"} - ${lecture.title}`;
  document.getElementById("focus-lecture-meta").textContent = `${formatDate(lecture.date)} - Lecture ${lecture.lectureNumber}`;
  document.getElementById("focus-open-link").href = lecture.youtubeLink || "#";
  document.getElementById("focus-complete").dataset.lectureId = lecture.id;
  notes.dataset.lectureId = lecture.id;
  notes.value = stored[lecture.id] || "";
  focus.classList.remove("hidden");
  document.body.classList.add("focus-active");
  writeStorage(STORAGE_KEYS.lastViewedLecture, { lectureId: lecture.id, subjectId: lecture.subjectId, date: lecture.date });
  resetFocusTimer();
}

function closeFocusMode() {
  const focus = document.getElementById("focus-mode");
  if (!focus) return;
  focus.classList.add("hidden");
  document.body.classList.remove("focus-active");
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
    }
  }, 1000);
}

function resetFocusTimer() {
  if (focusTimerInterval) {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
  }
  focusRemainingSeconds = DEFAULT_FOCUS_SECONDS;
  setFocusInputValues(DEFAULT_FOCUS_SECONDS);
  const button = document.getElementById("focus-timer-toggle");
  if (button) button.textContent = "Start Timer";
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

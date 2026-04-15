function addDays(dateString, daysToAdd) {
  const date = new Date(dateString);
  date.setUTCDate(date.getUTCDate() + daysToAdd);
  return date;
}

function createDailySeries({ subjectKey, titlePrefix = "Lec", startDate, count, link }) {
  return Array.from({ length: count }, (_, index) => ({
    title: `${titlePrefix}-${String(index + 1).padStart(2, "0")}`,
    lectureNumber: index + 1,
    date: addDays(startDate, index),
    youtubeLink: link,
    subjectKey
  }));
}

const subjects = [
  { key: "dme", name: "Design of Machine Elements" },
  { key: "or", name: "Operations Research" },
  { key: "ic-engines", name: "Internal Combustion Engines & Gas Turbines" },
  { key: "rac", name: "Refrigeration & Air Conditioning" },
  { key: "mt", name: "Manufacturing Technology" },
  { key: "som", name: "Strength of Materials" }
];

const lectures = [
  ...createDailySeries({
    subjectKey: "dme",
    startDate: "2026-04-15",
    count: 20,
    link: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htJM5_XqjO3OpSRDdbusy8Q"
  }),
  ...createDailySeries({
    subjectKey: "or",
    startDate: "2026-04-15",
    count: 19,
    link: "https://www.youtube.com/playlist?list=PLjtQ3BMex7htvmSm6iDmjweVVI4NfYW_x"
  }),
  ...createDailySeries({
    subjectKey: "ic-engines",
    startDate: "2026-05-10",
    count: 27,
    link: "https://unacademy.com/course/comprehensive-course-on-internal-combustion-engines/D01XIX1P"
  }),
  ...createDailySeries({
    subjectKey: "rac",
    startDate: "2026-05-10",
    count: 27,
    link: "https://unacademy.com/course/course-on-refrigeration-and-air-conditioning-622/0TNZWAIM"
  }),
  ...Array.from({ length: 17 }, (_, index) => {
    const earlyLink = "https://unacademy.com/course/jigs-fixture-cad-cnc/HRRLSGB3";
    const laterLink = "https://unacademy.com/course/course-on-advance-machining-ntm-and-am/FHJSBM1T";
    const dates = [
      "2026-06-11",
      "2026-06-11",
      "2026-06-11",
      "2026-06-11",
      "2026-06-11",
      "2026-06-11",
      "2026-06-17",
      "2026-06-18",
      "2026-06-19",
      "2026-06-20",
      "2026-06-21",
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
      "2026-06-26",
      "2026-06-27"
    ];

    return {
      title: `Lec-${String(index + 1).padStart(2, "0")}`,
      lectureNumber: index + 1,
      date: new Date(dates[index]),
      youtubeLink: index < 6 ? earlyLink : laterLink,
      subjectKey: "mt"
    };
  }),
  ...createDailySeries({
    subjectKey: "som",
    startDate: "2026-06-11",
    count: 16,
    link: "https://youtube.com/playlist?list=PLjtQ3BMex7hsUQZBZKfc4rKSBasLx2Srm"
  })
];

module.exports = {
  subjects,
  lectures
};

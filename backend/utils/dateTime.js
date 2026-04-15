const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isoWeek = require("dayjs/plugin/isoWeek");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

const DEFAULT_TIMEZONE = process.env.APP_TIMEZONE || "Asia/Calcutta";

function inAppTimezone(value = new Date()) {
  return dayjs(value).tz(DEFAULT_TIMEZONE);
}

function formatDateKey(value = new Date()) {
  return inAppTimezone(value).format("YYYY-MM-DD");
}

function startOfDay(value = new Date()) {
  return inAppTimezone(value).startOf("day").toDate();
}

function endOfDay(value = new Date()) {
  return inAppTimezone(value).endOf("day").toDate();
}

function startOfWeek(value = new Date()) {
  return inAppTimezone(value).startOf("isoWeek").toDate();
}

function addDays(value, days) {
  return inAppTimezone(value).add(days, "day").toDate();
}

function subtractDays(value, days) {
  return inAppTimezone(value).subtract(days, "day").toDate();
}

module.exports = {
  dayjs,
  DEFAULT_TIMEZONE,
  inAppTimezone,
  formatDateKey,
  startOfDay,
  endOfDay,
  startOfWeek,
  addDays,
  subtractDays
};

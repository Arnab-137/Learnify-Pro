const { formatDateKey, subtractDays } = require("./dateTime");

function toDateKey(value) {
  return formatDateKey(value);
}

function getCurrentStreak(completions) {
  const completedDates = Array.from(
    new Set(
      completions
        .filter((item) => item.completed && item.completedAt)
        .map((item) => toDateKey(item.completedAt))
    )
  ).sort((a, b) => b.localeCompare(a));

  if (!completedDates.length) {
    return 0;
  }

  const todayKey = toDateKey(new Date());
  const yesterdayKey = toDateKey(subtractDays(new Date(), 1));

  if (completedDates[0] !== todayKey && completedDates[0] !== yesterdayKey) {
    return 0;
  }

  let streak = 1;
  let previous = new Date(completedDates[0]);

  for (let index = 1; index < completedDates.length; index += 1) {
    const current = new Date(completedDates[index]);
    const expected = subtractDays(previous, 1);

    if (toDateKey(current) !== toDateKey(expected)) {
      break;
    }

    streak += 1;
    previous = current;
  }

  return streak;
}

module.exports = {
  getCurrentStreak
};

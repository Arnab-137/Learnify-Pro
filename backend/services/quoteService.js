const cacheService = require("./cacheService");

const CURATED_QUOTES = [
  {
    content: "You have to dream before your dreams can come true.",
    author: "A.P.J. Abdul Kalam",
    source: "Indian Voices"
  },
  {
    content: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    author: "A.P.J. Abdul Kalam",
    source: "Indian Voices"
  },
  {
    content: "All of us do not have equal talent. But all of us have an equal opportunity to develop our talents.",
    author: "A.P.J. Abdul Kalam",
    source: "Indian Voices"
  },
  {
    content: "Excellence is a continuous process and not an accident.",
    author: "A.P.J. Abdul Kalam",
    source: "Indian Voices"
  },
  {
    content: "Arise, awake, and stop not till the goal is reached.",
    author: "Swami Vivekananda",
    source: "Indian Voices"
  },
  {
    content: "Take up one idea. Make that one idea your life.",
    author: "Swami Vivekananda",
    source: "Indian Voices"
  },
  {
    content: "Education is the manifestation of the perfection already in man.",
    author: "Swami Vivekananda",
    source: "Indian Voices"
  },
  {
    content: "The highest education is that which does not merely give us information but makes our life in harmony with all existence.",
    author: "Rabindranath Tagore",
    source: "Indian Voices"
  },
  {
    content: "You can't cross the sea merely by standing and staring at the water.",
    author: "Rabindranath Tagore",
    source: "Indian Voices"
  },
  {
    content: "True teachers are those who help us think for ourselves.",
    author: "Sarvepalli Radhakrishnan",
    source: "Indian Voices"
  },
  {
    content: "Cultivation of mind should be the ultimate aim of human existence.",
    author: "B. R. Ambedkar",
    source: "Indian Voices"
  },
  {
    content: "Take the stones people throw at you and use them to build a monument.",
    author: "Ratan Tata",
    source: "Indian Voices"
  },
  {
    content: "The path from dreams to success does exist.",
    author: "Kalpana Chawla",
    source: "Indian Voices"
  },
  {
    content: "Vision without action is merely a dream. Action without vision just passes the time.",
    author: "Joel A. Barker",
    source: "Growth Voices"
  }
];

const FALLBACK_QUOTE = CURATED_QUOTES[0];

function getCurrentDateParts() {
  const timezone = process.env.APP_TIMEZONE || "UTC";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(new Date()).reduce((result, part) => {
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }
    return result;
  }, {});

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day)
  };
}

function getQuoteCacheKey() {
  const { year, month, day } = getCurrentDateParts();
  return `daily-quote-${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getQuoteIndex() {
  const { year, month, day } = getCurrentDateParts();
  const dayOfYear = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  return dayOfYear % CURATED_QUOTES.length;
}

async function getDailyQuote() {
  const cacheKey = getQuoteCacheKey();
  const cached = cacheService.get(cacheKey);
  if (cached) {
    return cached;
  }

  const payload = CURATED_QUOTES[getQuoteIndex()] || FALLBACK_QUOTE;
  cacheService.set(cacheKey, payload, 24 * 60 * 60 * 1000);
  return payload;
}

module.exports = {
  getDailyQuote
};

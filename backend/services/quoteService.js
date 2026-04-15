const cacheService = require("./cacheService");

const FALLBACK_QUOTE = {
  content: "Success is the sum of small efforts, repeated day in and day out.",
  author: "Robert Collier",
  source: "Learnify Elite"
};

function getQuoteCacheKey() {
  const timezone = process.env.APP_TIMEZONE || "UTC";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return `daily-quote-${formatter.format(new Date())}`;
}

async function getDailyQuote() {
  const cacheKey = getQuoteCacheKey();
  const cached = cacheService.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch("https://zenquotes.io/api/today");
    if (!response.ok) {
      throw new Error("Quote API request failed");
    }

    const [quote] = await response.json();
    const payload = {
      content: quote?.q || FALLBACK_QUOTE.content,
      author: quote?.a || FALLBACK_QUOTE.author,
      source: "ZenQuotes"
    };
    cacheService.set(cacheKey, payload, 24 * 60 * 60 * 1000);
    return payload;
  } catch (error) {
    return FALLBACK_QUOTE;
  }
}

module.exports = {
  getDailyQuote
};

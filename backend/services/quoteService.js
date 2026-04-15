const cacheService = require("./cacheService");

const FALLBACK_QUOTE = {
  content: "Small daily wins turn into full syllabus coverage.",
  author: "Study Tracker"
};

async function getDailyQuote() {
  const cached = cacheService.get("daily-quote");
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) {
      throw new Error("Quote API request failed");
    }

    const quote = await response.json();
    const payload = {
      content: quote.content,
      author: quote.author
    };
    cacheService.set("daily-quote", payload, 60 * 60 * 1000);
    return payload;
  } catch (error) {
    return FALLBACK_QUOTE;
  }
}

module.exports = {
  getDailyQuote
};

const cacheService = require("./cacheService");

function extractYouTubeVideoId(url = "") {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&]+)/i
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function getThumbnailFromLink(url = "") {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    return null;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

async function fetchYouTubeMetadata(url = "") {
  const cacheKey = `youtube-meta:${url}`;
  const cached = cacheService.get(cacheKey);
  if (cached) {
    return cached;
  }

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) {
    return {
      videoId: null,
      thumbnailUrl: null,
      title: null
    };
  }

  const fallback = {
    videoId,
    thumbnailUrl: getThumbnailFromLink(url),
    title: null
  };

  if (!process.env.YOUTUBE_API_KEY) {
    cacheService.set(cacheKey, fallback, 6 * 60 * 60 * 1000);
    return fallback;
  }

  try {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
    endpoint.searchParams.set("id", videoId);
    endpoint.searchParams.set("key", process.env.YOUTUBE_API_KEY);
    endpoint.searchParams.set("part", "snippet");

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("YouTube API request failed");
    }

    const payload = await response.json();
    const snippet = payload.items?.[0]?.snippet;
    const enriched = {
      videoId,
      thumbnailUrl: snippet?.thumbnails?.high?.url || fallback.thumbnailUrl,
      title: snippet?.title || null
    };
    cacheService.set(cacheKey, enriched, 6 * 60 * 60 * 1000);
    return enriched;
  } catch (error) {
    cacheService.set(cacheKey, fallback, 6 * 60 * 60 * 1000);
    return fallback;
  }
}

module.exports = {
  extractYouTubeVideoId,
  getThumbnailFromLink,
  fetchYouTubeMetadata
};

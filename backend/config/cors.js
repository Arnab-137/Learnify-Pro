function getAllowedOrigins() {
  return (process.env.FRONTEND_URLS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalDevOrigin(origin = "") {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

function isAllowedVercelOrigin(origin = "") {
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

function isAllowedRenderFrontendOrigin(origin = "") {
  return origin === "https://learnify-pro-frontend.onrender.com";
}

function isAllowedMobileAppOrigin(origin = "") {
  return origin === "https://localhost" || origin === "capacitor://localhost";
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return true;
  }

  if (isAllowedVercelOrigin(origin) || isAllowedRenderFrontendOrigin(origin) || isAllowedMobileAppOrigin(origin)) {
    return true;
  }

  return process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin);
}

module.exports = {
  isAllowedOrigin
};

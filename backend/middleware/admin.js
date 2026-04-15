const ApiError = require("../utils/ApiError");

function requireAdminKey(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;

  if (!configuredKey) {
    return next(new ApiError(503, "ADMIN_API_KEY is not configured on the server."));
  }

  const providedKey = req.headers["x-admin-key"];

  if (!providedKey || providedKey !== configuredKey) {
    return next(new ApiError(401, "Admin API key is invalid."));
  }

  return next();
}

module.exports = requireAdminKey;

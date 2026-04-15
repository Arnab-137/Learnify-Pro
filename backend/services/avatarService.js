function getAvatarUrl(seed) {
  const safeSeed = encodeURIComponent(seed || "Learner");
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${safeSeed}`;
}

module.exports = {
  getAvatarUrl
};

function getAvatarUrl(seed) {
  const safeSeed = encodeURIComponent(seed || "Learner");
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${safeSeed}&size=128&radius=50&scale=92&backgroundType=solid&backgroundColor=081225,17315a,1d4ed8&shape1Color=60a5fa,22d3ee,e9d5ff&shape2Color=e9d5ff,22d3ee,60a5fa&shape3Color=22d3ee,e9d5ff,60a5fa`;
}

module.exports = {
  getAvatarUrl
};

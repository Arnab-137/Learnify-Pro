function buildChartConfig({ type = "bar", labels = [], datasets = [] }) {
  return {
    type,
    data: {
      labels,
      datasets
    },
    options: {
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

function buildQuickChartUrl(config) {
  const encoded = encodeURIComponent(JSON.stringify(config));
  return `https://quickchart.io/chart?c=${encoded}`;
}

module.exports = {
  buildChartConfig,
  buildQuickChartUrl
};

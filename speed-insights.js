// Vercel Speed Insights initialization
// This script initializes Speed Insights for vanilla JavaScript projects
(function() {
  // Create the script element for Speed Insights
  if (typeof window !== 'undefined') {
    window.si = window.si || function () {
      (window.siq = window.siq || []).push(arguments);
    };
    
    // Load the Speed Insights script
    const script = document.createElement('script');
    script.src = '/_vercel/speed-insights/script.js';
    script.defer = true;
    document.head.appendChild(script);
  }
})();

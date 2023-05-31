import va from './src/tracker';

(function (window): void {
  if (typeof window.ViSenzeAnalytics === 'undefined') {
    window.ViSenzeAnalytics = va;
  }
})(window);

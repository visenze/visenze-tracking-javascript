import va from './tracker.js';

(function init(context): void {
  if (typeof window !== 'undefined' && context && !context.ViSenzeAnalytics) {
    context.ViSenzeAnalytics = va;
  }
})(typeof self !== 'undefined' ? self : this);

export default va;

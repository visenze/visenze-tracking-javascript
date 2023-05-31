import va from './src/tracker';

(function (window): void {
  if (typeof window.va === 'undefined') {
    window.va = va;
  }
})(window);

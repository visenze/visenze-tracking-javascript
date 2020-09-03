(function(window) {
    const va = require('./src/va.js'); 

    if(typeof(window.va === 'undefined')) {
        window.va = va; 
    }
})(window);
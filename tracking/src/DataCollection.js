const NOT_AVAILABLE = "Unknown"
class DataCollection {
    constructor() {
    }

    addData(defaultParams, userInput) {

        defaultParams.lang = this.getLanguage();
        defaultParams.sr = this.getScreenResolution();
        defaultParams.url = typeof window !== 'undefined' ? window.location.href : null;
        defaultParams.r = typeof document !== 'undefined' ? document.referrer : null;
        // override/remove user input for the following fields.
        defaultParams.db = null;
        defaultParams.dm = null;
        defaultParams.os = null;
        defaultParams.osv = null;
        defaultParams.p = null;
        defaultParams.web_host = null;

        return Object.assign(userInput, defaultParams);
    }


    getLanguage() {
        if (typeof navigator !== 'undefined') {
            return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE
        }
        return null;
    }


    getScreenResolution() {
        if (typeof screen !== 'undefined') {
            return screen.width + "x" + screen.height;
        }

        return null;
    }

}

module.exports = DataCollection; 
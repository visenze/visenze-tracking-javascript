const NOT_AVAILABLE = "Unknown"
class DataCollection {
    constructor() {
    }

    addData(defaultParams, userInput) {

        userInput.lang = this.getLanguage();
        userInput.sr = this.getScreenResolution();
        userInput.url = typeof window !== 'undefined' ? window.location.href : null;
        userInput.r = typeof document !== 'undefined' ? document.referrer : null;

        // override/remove user input for the following fields.
        userInput.db = null;
        userInput.dm = null;
        userInput.os = null;
        userInput.osv = null;
        userInput.p = null;
        userInput.web_host = null;

        // user input should override default params
        return Object.assign(defaultParams, userInput);
    }


    getLanguage() {
        if (typeof navigator !== 'undefined') {
            return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || NOT_AVAILABLE
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
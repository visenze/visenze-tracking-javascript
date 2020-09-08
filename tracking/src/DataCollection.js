const NOT_AVAILABLE = "Unknown"
class DataCollection {
    constructor() {
    }

    addData(defaultParams, userInput) {

        defaultParams.lang = this.getLanguage(); 
        defaultParams.sr = this.getScreenResolution(); 
        defaultParams.url = window.location.href;
        defaultParams.r = document.referrer;                 
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
        if(navigator) {
            return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE 
        }
        return null; 
    }


    getScreenResolution() {
        return screen.width + "x" + screen.height; 
    }

}

module.exports = DataCollection; 
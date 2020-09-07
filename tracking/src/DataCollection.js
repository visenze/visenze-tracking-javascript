const NOT_AVAILABLE = "Unknown"
class DataCollection {
    constructor() {
    }

    toJson() {
        // update data first
        this.getLanguage(); 
        this.getScreenResolution(); 
        this.getUrls();         

        const res = {}; 
        res.lang = this.language; 
        res.sr = this.resolution; 
        res.url = this.url;
        // override/remove user input for the following fields.
        res.db = null; 
        res.dm = null; 
        res.os = null; 
        res.osv = null; 
        res.p = null; 
        res.web_host = null; 
        res.r = null;         
        return res; 
    }

    getUrls() {
        this.url = window.location.href; 
    }

    getLanguage() {
        if(navigator) {
            this.language = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE 
        }
    }


    getScreenResolution() {
        this.resolution = screen.width + "x" + screen.height; 
    }

}

module.exports = DataCollection; 
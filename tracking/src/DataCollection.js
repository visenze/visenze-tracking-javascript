const NOT_AVAILABLE = "Unknown"
class DataCollection {
    constructor() {

        this.getLanguage(); 
        this.getScreenResolution(); 
        this.getUrls(); 
    }

    toJson() {
        const res = {}; 
        res.lang = this.language; 
        res.sr = this.resolution; 
        res.url = this.url; 
        res.r = this.referrer; 
        return res; 
    }

    getUrls() {
        this.url = window.location.href; 
        this.referrer = document.referrer; 
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
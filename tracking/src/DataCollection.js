const NOT_AVAILABLE = "not available"
class DataCollection {
    constructor() {
        console.log("DataCollection init"); 

        this.getPlatform(); 
        this.getLanguage(); 
        this.getOS(); 
        this.getScreenResolution(); 
        this.getAppName(); 
    }

    toJson() {
        const res = {}; 
        res.p = this.platform; 
        res.os = this.os; 
        res.lang = this.language; 
        res.sr = this.resolution; 
        res.an = this.browser; 
        return res; 
    }

    getPlatform() {
        if (navigator) {
            this.platform = navigator.platform || NOT_AVAILABLE; 
        }
    }

    getLanguage() {
        if(navigator) {
            this.language = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE 
        }
    }

    getOS() {
        if (navigator) {
            let userAgent = navigator.userAgent.toLowerCase() 
            if (userAgent.indexOf('windows phone') >= 0) {
                this.os = 'Windows Phone'
              } else if (userAgent.indexOf('windows') >= 0 || userAgent.indexOf('win16') >= 0 || userAgent.indexOf('win32') >= 0 || userAgent.indexOf('win64') >= 0 || userAgent.indexOf('win95') >= 0 || userAgent.indexOf('win98') >= 0 || userAgent.indexOf('winnt') >= 0 || userAgent.indexOf('wow64') >= 0) {
                this.os = 'Windows'
              } else if (userAgent.indexOf('android') >= 0) {
                this.os = 'Android'
              } else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0 || userAgent.indexOf('x11') >= 0) {
                this.os = 'Linux'
              } else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0 || userAgent.indexOf('ipod') >= 0 || userAgent.indexOf('crios') >= 0 || userAgent.indexOf('fxios') >= 0) {
                this.os = 'iOS'
              } else if (userAgent.indexOf('macintosh') >= 0 || userAgent.indexOf('mac_powerpc)') >= 0) {
                this.os = 'Mac'
              } else {
                this.os = 'Other'
              }
        }
    }

    getAppName() {
        if(navigator) {
            let userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('firefox/') >= 0) {
                this.browser = 'Firefox'
            } else if (userAgent.indexOf('opera/') >= 0 || userAgent.indexOf(' opr/') >= 0) {
                this.browser = 'Opera'
            } else if (userAgent.indexOf('chrome/') >= 0) {
                this.browser = 'Chrome'
            } else if (userAgent.indexOf('safari/') >= 0) {
                if (userAgent.indexOf('android 1.') >= 0 || userAgent.indexOf('android 2.') >= 0 || userAgent.indexOf('android 3.') >= 0 || userAgent.indexOf('android 4.') >= 0) {
                    this.browser = 'AOSP'
                } else {
                    this.browser = 'Safari'
                }
            } else if (userAgent.indexOf('trident/') >= 0) {
                this.browser = 'Internet Explorer'
            } else {
                this.browser = 'Other'
            }
        }
    }

    getScreenResolution() {
        this.resolution = screen.width + "x" + screen.height; 
    }

    
}

module.exports = DataCollection; 
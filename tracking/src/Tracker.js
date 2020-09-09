const fetch = window.fetch;  
const URI = require('jsuri'); 
const pjson = require('../../package.json')
const BASE_URL = "https://analytics.data.visenze.com/v3";
const BASE_URL_CN = "https://analytics.visenze.com.cn/v3";
const SDK = "javascript sdk"; 
const SDK_VERSION = pjson.version; 
const TIMEOUT = 15000;


/**
* Adds a list of query parameters
* @param  {params}  params object
* @return {URI}     returns self for fluent chaining
*/
URI.prototype.va_addQueryParams = function (params) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        const param = params[property];
        // do stuff
        if(param) {
            if (Array.isArray(param)) {
                for (let i = 0; i < param.length; i += 1) {
                  this.addQueryParam(property, param[i]);
                }
            } else {
                this.addQueryParam(property, param);
            }
        }
      }
    }
    return this;
};

const timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(`Timed out in ${ms} ms.`);
        }, ms);
        return promise.then(resolve, reject);
    });
}



const sendRequest = (fetchObj, path, callback, failure) => {
    const start = new Date().getTime(); 
    return timeout(TIMEOUT, fetchObj)
        .then(response => {
            const status = response.status; 
            if(status === 200) {
                return "success"; 
            } else {
                const errResp = response.json(); 
                return errResp; 
            }
        })
        .then(res => {
            if (res === "success") {
                if(callback) {
                    callback("send success")
                }
            } else {
                if (failure) {
                    failure(res);
                }
            }
        })
        .catch(ex => {
            if (failure) {
              failure(ex);
            }                
        })
}

const sendGetRequest = (path, params, callback, failure) => {
    const url = new URI(path)
        .va_addQueryParams(params)
        .toString(); 
    const fetchObj = fetch(url, {
        method: 'GET'
    });

    return sendRequest(fetchObj, path, callback, failure); 
}


class Tracker {
    constructor(dataCollection, sessionManager, code, isCN=false) {
        this.code = code; 
        this.dataCollection = dataCollection; 
        this.sessionManager = sessionManager; 

        if(isCN) {
            this.baseUrl = BASE_URL_CN; 
        } else {
            this.baseUrl = BASE_URL; 
        }
    }

    sendEvent(action, dataObj, callback) {
        const path = `${this.baseUrl}/__va.gif`; 

        let defaultParams = this.getDefaultParams(action); 
        let params = this.dataCollection.addData(defaultParams, dataObj); 
        sendGetRequest(path, params, null, callback); 
    }

    getDefaultParams(action) { 
        let defaultParams = {}; 
        defaultParams.code = this.code; 
        defaultParams.sid = this.sessionManager.getSessionId(); 
        defaultParams.uid = this.sessionManager.getUID(); 
        defaultParams.sdk = SDK; 
        defaultParams.v = SDK_VERSION;     
        defaultParams.action = action; 
        defaultParams.ts = new Date().getTime(); 
        return defaultParams; 
    }



    

}

module.exports = Tracker; 
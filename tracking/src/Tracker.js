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
        this.uid = sessionManager.getUserID(); 

        if(isCN) {
            this.baseUrl = BASE_URL_CN; 
        } else {
            this.baseUrl = BASE_URL; 
        }
    }

    sendEvent(eventName, dataObj, callback) {
        const path = `${this.baseUrl}/__va.gif`; 
        let defaultsParams = this.dataCollection.toJson(); 
        defaultsParams.uid = this.sessionManager.getUserID();
        defaultsParams.code = this.code; 

        let params = Object.assign(defaultsParams, dataObj); 
        params.sid = this.sessionManager.getSessionId(); 
        params.sdk = SDK; 
        params.v = SDK_VERSION;     
        params.name = eventName; 
        params.ts = new Date().getTime(); 
        sendGetRequest(path, params, null, callback); 
    }

    

}

module.exports = Tracker; 
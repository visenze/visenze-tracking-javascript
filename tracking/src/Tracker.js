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
URI.prototype.addQueryParams = function (params) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        const param = params[property];
        // do stuff
        if (Array.isArray(param)) {
          for (let i = 0; i < param.length; i += 1) {
            this.addQueryParam(property, param[i]);
          }
        } else {
          this.addQueryParam(property, param);
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
            console.error(`Failed to process ${path}`, ex);
            if (failure) {
              failure(ex);
            }                
        })
}

const sendGetRequest = (path, params, callback, failure) => {
    const url = new URI(path)
        .addQueryParams(params)
        .toString(); 
    console.log("url: ", url);    
    const fetchObj = fetch(url, {
        method: 'GET'
    });

    return sendRequest(fetchObj, path, callback, failure); 
}


class Tracker {
    constructor(dataCollection, sessionManager, code, country) {
        this.code = code; 
        this.dataCollection = dataCollection; 
        this.sessionManager = sessionManager; 
        this.uid = sessionManager.getUserID(); 
        this.country = country; 
        if(country === "CN") {
            this.baseUrl = BASE_URL_CN; 
        } else {
            this.baseUrl = BASE_URL; 
        }
    }

    sendEvent(eventName, dataObj, callback) {
        const path = `${this.baseUrl}/__va.gif`; 
        let defaultsParams = this.dataCollection.toJson(); 
        let params = Object.assign(defaultsParams, dataObj); 
        params.code = this.code; 
        params.uid = this.sessionManager.getUserID(); 
        params.sid = this.sessionManager.getSessionId(); 
        params.sdk = SDK; 
        params.v = SDK_VERSION; 
        if(this.country) {
            params.country = country; 
        }
    
        params.name = eventName; 
        params.ts = new Date().getTime(); 
        sendGetRequest(path, params, (res)=> {
            console.log("success: ", res)
        }, callback); 
    }

    

}

module.exports = Tracker; 
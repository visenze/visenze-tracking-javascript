
const SESSION_TIMEOUT = 1800000; 
const KEY_UID = "va-uid"; 
const KEY_SID = "va-key-sid";
const KEY_SID_TIMESTAMP = "va-key-sid-timestamp"; 

class SessionManager {
    constructor(uid) {
        this.setUid(uid)
    }

    setLocalStorage(key, val) {
        if(typeof(Storage) !== 'undefined') {
            localStorage.setItem(key, val); 
        }
    }

    getLocalStorage(key) {
        if(typeof(Storage) !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null; 
    }

    isSameDay(t1, t2) {

        const d1 = new Date(t1); 
        const d2 = new Date(t2); 
        return d1.getFullYear() === d2.getFullYear() 
            && d1.getMonth() === d2.getMonth()
            && d1.getDate() === d2.getDate();  
    }

    setUid(uid) {
        if(uid) {
            this.setLocalStorage(KEY_UID, uid)
        }
    }
    

    getSessionTimestamp() {
        let timestamp = this.getLocalStorage(KEY_SID_TIMESTAMP)
        if(!timestamp) {
            timestamp = new Date().getTime(); 
            this.setLocalStorage(KEY_SID_TIMESTAMP, timestamp); 
        }
        return parseInt(timestamp)
    }


    // get uid from local storage, if uuid is not created yet 
    // create a new uuid and store in localstorage. 
    getUID() {
        let uid = this.getLocalStorage(KEY_UID)
        if(!uid) {
            uid  = this.generateUUID()
            this.setLocalStorage(KEY_UID, uid)
        }
        return uid; 
    }

    generateUUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx.xxxx.4xxx.yxxx.xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;        
    }

    
    
    getSessionId() {
        let now = new Date().getTime();
        let sid = this.getLocalStorage(KEY_SID); 
        let sessionTimestamp = this.getSessionTimestamp(); 


        if (!sid || (now - sessionTimestamp) > SESSION_TIMEOUT || !this.isSameDay(now, sessionTimestamp)) {
            sid = this.generateUUID(); 
            this.setLocalStorage(KEY_SID, sid); 
        } 

        this.setLocalStorage(KEY_SID_TIMESTAMP, now); 
        return sid; 
    }


}

module.exports = SessionManager; 
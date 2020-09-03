
const SESSION_TIMEOUT = 1800000; 
const DAY_IN_MS = 86400000; 
const KEY_UID = "va-uid"; 
const KEY_SID = "va-key-sid";
const KEY_SID_TIMESTAMP = "va-key-sid-timestamp"; 

class SessionManager {
    constructor(uid) {

        this.uid = uid; 
        if(!this.uid) {
            this.uid = this.getUID(); 
        } else {
            // store uid in localstorage. 
            if (typeof(Storage) !== 'undefined') {
                localStorage.setItem(KEY_UID, this.uid);
            }
        }

        this.sid = this.getSID(); 
        this.sessionTimestamp =  this.getSessionTimestamp(); 
    }

    isSameDay(t1, t2) {

        const d1 = new Date(t1); 
        const d2 = new Date(t2); 
        return d1.getFullYear() === d2.getFullYear() 
            && d1.getMonth() === d2.getMonth()
            && d1.getDate() === d2.getDate();  
    }

    

    getSessionTimestamp() {
        if(typeof(Storage) !== "undefined") {
            let timestamp = localStorage.getItem(KEY_SID_TIMESTAMP); 
            if(!timestamp) {
                timestamp = new Date().getTime(); 
                localStorage.setItem(KEY_SID_TIMESTAMP, timestamp); 
            }
            return timestamp; 
        }
    }
    // get sid from local storage, if uuid is not created yet 
    // create a new sid and store in localstorage. 
    getSID() {
        if (typeof(Storage) !== 'undefined') {
            let sid = localStorage.getItem(KEY_SID); 
            if(!sid) { // initialize first
                sid = this.generateUUID(); 
                localStorage.setItem(KEY_SID, sid);  
            }
            return sid; 
        }
    }

    // get uid from local storage, if uuid is not created yet 
    // create a new uuid and store in localstorage. 
    getUID() {
        if (typeof(Storage) !== 'undefined') {
            let uid = localStorage.getItem(KEY_UID)
            if(!uid) {
                uid = this.generateUUID(); 
                localStorage.setItem(KEY_UID, uid); 
            }
            return uid; 
        }        
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
        if (now - this.sessionTimestamp > SESSION_TIMEOUT || !this.isSameDay(now, this.sessionTimestamp)) {
            this.sessionTimestamp = now; 
            this.sid = this.generateUUID(); 
            if(typeof(Storage) !== 'undefined') {
                localStorage.setItem(KEY_SID, this.sid); 
                localStorage.setItem(KEY_SID_TIMESTAMP, this.sessionTimestamp); 
            }
        } else {
            this.sessionTimestamp = now; 
        }
        return this.sid; 
    }

    getUserID() {
        return this.uid; 
    }

}

module.exports = SessionManager; 
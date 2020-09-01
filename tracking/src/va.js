const SessionManager = require('./SessionManager.js');
const DataCollection = require('./DataCollection.js');
const Tracker = require("./Tracker.js");


module.exports = {
    

    init: function(obj) {
        let code = obj.code; 
        let uid = obj.uid; 
        let country = obj.country; 

        if(this.dataCollection === undefined) {
            this.dataCollection = new DataCollection(); 
        }

        if(this.sessionManager === undefined) {
            this.sessionManager = new SessionManager(uid); 
        }

        return new Tracker(this.dataCollection, this.sessionManager, code, country)
        
    }

}


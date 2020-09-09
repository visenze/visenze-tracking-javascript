const SessionManager = require('./SessionManager.js');
const DataCollection = require('./DataCollection.js');
const Tracker = require("./Tracker.js");


module.exports = {
    

    init: function(obj) {
        let code = obj.code; 
        let isCN = obj.isCN; 

        if(this.dataCollection === undefined) {
            this.dataCollection = new DataCollection(); 
        }

        if(this.sessionManager === undefined) {
            this.sessionManager = new SessionManager(); 
        }

        return new Tracker(this.dataCollection, this.sessionManager, code, isCN)
        
    }

}


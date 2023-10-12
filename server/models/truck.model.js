const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
    driverName:{
        type:String,
        maxlength:[20, "Nobodys name is this long"]
    },
    truckNum:{
        type:String
    },
    trailerNum:{
        type:String
    },
    trailerType:{
        type:String
    },
    phoneNum:{
        type:String
    },
    endorsements:{
        type:Array
    },
    homeLocation:{
        type:String
    },
    notes:{
        type:String
    },
    onBoard:{
        type: Boolean
    },
    emptyLocation:{
        type: String,
        maxlength:[20, "to long"]
    },
    date:{
        type: String
    },
    emptyTime:{
        type: String
    }
},{timestamps:true});
module.exports = mongoose.model("Truck", TruckSchema)
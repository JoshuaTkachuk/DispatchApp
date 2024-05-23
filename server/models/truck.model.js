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
        type: Boolean,
        default : false
    },
    emptyLocation:{
        type: String,
        maxlength:[20, "to long"]
    },
    date:{
        type: String
    },
    status:{
        type: String,
        default: "CONFIRM"
    },
    dateReady:{
        type: String,
        default: null
    },
    timeReady:{
        type: String
    },
    dayIndex:{
        type: Number
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true});
module.exports = mongoose.model("Truck", TruckSchema)
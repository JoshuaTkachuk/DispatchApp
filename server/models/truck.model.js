const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
    driverName:{
        type:String,
        required: [ true, "driver name is required"],
        maxlength:[20, "Max character length exceeded"]
    },
    truckNum:{
        type:String,
        required: [true, "truck number is required"],
        maxlength:[10, "Max character length exceeded"]
    },
    trailerNum:{
        type:String,
        required: [true, "trailer number is required"],
        maxlength:[10, "Max character length exceeded"]
    },
    trailerType:{
        type:String,
        required: [true, "trailer type is required"]
    },
    phoneNum:{
        type:String,
        required: [true, "phone number is required"],
        maxlength: [20, "Max character length exceeded"]
    },
    endorsements:{
        type:Array
    },
    homeLocation:{
        type:String,
        required: [true, "home location is required"],
        maxlength: [50, "Max character length exceeded"]
    },
    additionalInfo:{
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
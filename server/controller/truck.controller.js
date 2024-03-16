const Truck = require("../models/truck.model");
const User = require("../models/user.model")
module.exports={
    CreateTruck:(req,res)=>{
        if(req.body.dateReady){
            let date = new Date(req.body.dateReady)
            console.log(req.body.dateReady, "date ready")
            console.log(date.setDate(date.getDate() + 1))
            console.log(date)
            req.body.dateReady = date;
        }
        else{
            req.body.dateReady = null;
        }
        const newTruck = new Truck(req.body);
        newTruck.createdBy = req.jwtpayload.id;
        newTruck.save()
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json(err)
            })
    },
    getAllTrucks:(req,res)=>{
        Truck.find()
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
                res.json(err)
            })
    },
    searchByDriverName:(req,res)=>{
        Truck.find({"driverName": new RegExp(req.params.driverName, "i")})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })
    },
    deleteAllTrucks:(req,res)=>{
        Truck.deleteMany({})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
            res.json(err)
        })
    },
    addToBoard:(req,res)=>{
        Truck.findByIdAndUpdate({_id: req.body.id}, {onBoard: true})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    removeFromBoard:(req,res)=>{
        Truck.findByIdAndUpdate({_id: req.body.truckId}, {onBoard: false})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    updateTruckDate:(req,res)=>{
        Truck.findByIdAndUpdate({_id: req.body.truckId}, {dateReady: req.body.dateReady})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    updateTruckIndex:(req,res)=>{
        Truck.findByIdAndUpdate({_id: req.body.truckId}, {dayIndex: req.body.dayIndex})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    updateTruckTime:(req,res)=>{
        Truck.findByIdAndUpdate({_id:req.body.truckId}, {timeReady: req.body.timeReady})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    findTrucksByUserId:(req,res)=>{
        if(req.jwtpayload.email !== req.params.email){
            User.findOne({email: req.params.email})
                .then((notLoggedUser)=>{
                    Truck.find({createdBy: notLoggedUser._id})
                    .then((trucks) =>{
                        res.json(trucks)
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
        //if user is logged in, simply find posts
        else{
            Truck.find({createdBy: req.jwtpayload.id})
                .then((trucks)=>{
                    res.json(trucks)
                })
                .catch((err)=>console.log(err))
        }
    }
}
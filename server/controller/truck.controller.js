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
        Truck.findByIdAndUpdate({_id: req.body.truck}, {onBoard: true})
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
    updateTruckStatus:(req,res)=>{
        Truck.findByIdAndUpdate({_id:req.body.truckId}, {status: req.body.status})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    updateNotes:(req,res)=>{
        Truck.findByIdAndUpdate({_id: req.body.truckId},{notes: req.body.notes})
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
    },
    updateTruckEmptyLocation:(req,res)=>{
        Truck.findByIdAndUpdate({ _id: req.body.truckId}, {emptyLocation: req.body.emptyLocation})
        .then((result)=>{
            console.log(result)
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    searchTrucks:(req,res)=>{
        // find trucks using operators and filter by user while also querying to find all matches for the searchParam
        console.log(req.params)
        Truck.find({
            $and:[
                {createdBy: req.jwtpayload.id},
                {$or:[{driverName:new RegExp(req.params.searchParam, "i")},{truckNum:new RegExp(req.params.searchParam, "i")},{trailerNum:new RegExp(req.params.searchParam, "i")}]}
            ]
        })
        .then((result)=>{
            console.log(result, "result after query")
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })

        
    },
    findTrucksById:(req,res)=>{
        Truck.find({createdBy: req.jwtpayload.id})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    filterTrucks:(req,res)=>{
        console.log(req.params, "params")
        if(req.params.Ttype !== "all" && req.params.endorsements !== "all"){
            console.log("im here")
            Truck.find({
                $and:[
                    {createdBy: req.jwtpayload.id},
                    {trailerType: req.params.Ttype},
                    {endorsements:req.params.endorsements}
                ]
            })
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        if(req.params.Ttype !== "all" && req.params.endorsements === "all" ){
            Truck.find({
                $and:[
                    {createdBy: req.jwtpayload.id},
                    {trailerType: req.params.Ttype}
                ]
            })
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        if(req.params.Ttype === "all" && req.params.endorsements !== "all" ){
            console.log(req.params.endorsements, "endorsement")
            Truck.find({
                $and:[
                    {createdBy: req.jwtpayload.id},
                    {endorsements:req.params.endorsements}
                ]
            })
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        if(req.params.Ttype === "all" && req.params.endorsements === "all" ){
            Truck.find({
                $and:[
                    {createdBy: req.jwtpayload.id}
                ]
            })
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
},
deleteTrucksById:(req,res)=>{
    Truck.findByIdAndDelete({_id: req.params.Id})
    .then((result)=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err)
    })
}
}
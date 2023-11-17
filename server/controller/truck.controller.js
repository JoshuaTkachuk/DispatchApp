const Truck = require("../models/truck.model");

module.exports={
    CreateTruck:(req,res)=>{
        const newTruck = new Truck(req.body);
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
        Truck.findByIdAndUpdate({_id: req.body.id}, {onBoard: false})
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
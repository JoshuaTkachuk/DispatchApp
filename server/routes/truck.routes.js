const { authenticate } = require('../config/jwt.config');
const truckController = require("../controller/truck.controller");

module.exports = app =>{
    app.post("/api/truck", authenticate, truckController.CreateTruck);
    app.get("/api/allTrucks", truckController.getAllTrucks);
    app.get("/api/searchByDriverName/:driverName", truckController.searchByDriverName);
    app.get("/api/TrucksByUserID/:email", authenticate, truckController.findTrucksByUserId)
    app.put("/api/addToBoard/", truckController.addToBoard);
    app.put("/api/removeFromBoard", truckController.removeFromBoard);
    app.put("/api/updateDate", truckController.updateTruckDate);
    app.put("/api/updateTruckIndex", truckController.updateTruckIndex);
    app.put("/api/updateTime", truckController.updateTruckTime);
    app.delete("/api/deleteAllTrucks", truckController.deleteAllTrucks);

}
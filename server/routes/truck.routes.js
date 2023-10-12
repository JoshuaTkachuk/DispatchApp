const truckController = require("../controller/truck.controller");

module.exports = app =>{
    app.post("/api/truck", truckController.CreateTruck);
    app.get("/api/allTrucks", truckController.getAllTrucks);
    app.get("/api/searchByDriverName/:driverName", truckController.searchByDriverName);
    app.delete("/api/deleteAllTrucks", truckController.deleteAllTrucks);
}
const { authenticate } = require('../config/jwt.config');
const userController = require('../controller/user.controller');

module.exports = app =>{
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);
    app.get("/api/user",authenticate, userController.getLoggedUser);
    app.get("/api/findUserId/:id", userController.getOneUserById);
    app.delete("/api/deleteAllUsers", authenticate, userController.deleteAllUsers);
}
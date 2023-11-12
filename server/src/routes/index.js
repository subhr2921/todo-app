const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
const { verifyToken, tokenExpiryCheck } = require("../middleware/verifyToken");

const routes = require("express").Router();

//Auth
routes.post("/auth/login", authController.login);
routes.post("/auth/verify-token", tokenExpiryCheck);

//Task
routes.post("/task/create", verifyToken, taskController.createTask);
routes.get("/task/list", verifyToken, taskController.getTask);
routes.post("/task/complete", verifyToken, taskController.markComplete);
routes.post("/task/delete/:id", verifyToken, taskController.deleteTask);

//User
routes.post("/user/register", userController.createUser);
routes.post("/user/update", verifyToken, userController.updateUser);
routes.get("/user/profile", verifyToken, userController.getUser);

module.exports = routes;

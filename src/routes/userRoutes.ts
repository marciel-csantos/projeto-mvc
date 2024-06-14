import { Router } from "express";
import UserController from "../controllers/userController";

const UserRouter = Router();

UserRouter.get("/users", UserController.listUsers);
UserRouter.post("/users", UserController.createUser);
UserRouter.put("/users/:id", UserController.updateUser); 
UserRouter.delete("/users/:id", UserController.deleteUser); 

export default UserRouter;
import { Router } from "express";
import UserController from "../controllers/UserController";

const USERROUTER: Router = Router();

USERROUTER.get("/users", (req, res) => UserController.getAll(req, res));
USERROUTER.get("/users/id", (req, res) => UserController.getById(req, res)); 
USERROUTER.get("/users/email", (req, res) => UserController.getByEmail(req, res));
USERROUTER.post("/users", (req, res) => UserController.create(req, res));
USERROUTER.put("/users/upd", (req, res) => UserController.update(req, res));
USERROUTER.delete("/users/del", (req, res) => UserController.delete(req, res));

export default USERROUTER;
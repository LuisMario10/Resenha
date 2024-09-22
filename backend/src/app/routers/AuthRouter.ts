import { Router } from "express";
import AuthController from "../controllers/AuthController";

const AUTHROUTER: Router = Router();

AUTHROUTER.post("/auth/login", (req, res) => AuthController.login(req, res)); 

export default AUTHROUTER;

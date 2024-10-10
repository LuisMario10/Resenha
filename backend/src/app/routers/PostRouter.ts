import { Router } from "express";
import PostController from "../controllers/PostController";
import AuthService from "../services/auth/Auth.Service";

const POSTROUTER: Router = Router();

POSTROUTER.get("/posts", AuthService.tokenValidate,(req, res) => PostController.getAll(req, res));
POSTROUTER.get("/posts/:id", AuthService.tokenValidate,(req, res) => PostController.getPostByRegister(req, res));
POSTROUTER.get("/posts/mypost/:regis", AuthService.tokenValidate, (req, res) => PostController.getPostByRegister(req, res));
POSTROUTER.get("/posts/myposts", (req, res) => PostController.getAllPostForUser(req, res));
POSTROUTER.post("/posts", (req, res) => PostController.post(req, res));
POSTROUTER.put("/posts/upt", (req, res) => PostController.put(req, res));
POSTROUTER.delete("/posts/del", (req, res) => PostController.delete(req, res));

export default POSTROUTER;

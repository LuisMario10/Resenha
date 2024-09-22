import { Router } from "express";
import PostController from "../controllers/PostController";

const POSTROUTER: Router = Router();

POSTROUTER.get("/posts", (req, res) => PostController.getAll(req, res));
POSTROUTER.get("/posts/:id", (req, res) => PostController.getPostByRegister(req, res));
POSTROUTER.get("/posts/myPost/:regis", (req, res) => PostController.getPostByRegister(req, res));
POSTROUTER.get("/posts/myPosts", (req, res) => PostController.getAllPostForUser(req, res));
POSTROUTER.post("/posts", (req, res) => PostController.post(req, res));
POSTROUTER.put("/posts/upt", (req, res) => PostController.put(req, res));
POSTROUTER.delete("/posts/del", (req, res) => PostController.delete(req, res));

export default POSTROUTER;

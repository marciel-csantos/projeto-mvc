import { Router } from "express";
import PostController from "../controllers/postController";

const PostRouter = Router();

PostRouter.get("/posts", PostController.listPosts);
PostRouter.post("/posts", PostController.createPost);
PostRouter.delete("/posts/:id", PostController.deletePost); 

export default PostRouter;

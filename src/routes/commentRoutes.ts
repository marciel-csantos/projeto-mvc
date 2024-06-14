import { Router } from "express";
import CommentController from "../controllers/commentController";

const CommentRouter = Router();

CommentRouter.get("/comments", CommentController.listComments);
CommentRouter.post("/comments", CommentController.createComment);
CommentRouter.put("/comments/:id", CommentController.updateComment); 
CommentRouter.delete("/comments/:id", CommentController.deleteComment); 

export default CommentRouter;
import express from "express";
import UserRouter from "./routes/userRoutes";
import PostRouter from "./routes/postRoutes";
import CommentRouter from "./routes/commentRoutes";

const app = express();

app.use(express.json());
app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter);

const port = 3000;

app.listen(port, function(){
    console.log(`Servidor está rodando na porta ${port}`);
});
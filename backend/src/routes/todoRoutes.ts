import express,{Request, Response} from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todoController";
const todoRouter = express.Router();
import auth from "../middlewares/auth";
todoRouter.get("/",auth,getTodo);

todoRouter.post("/",auth, createTodo);

todoRouter.delete("/:id",auth, deleteTodo);

todoRouter.put("/:id",auth, updateTodo);


export default todoRouter;
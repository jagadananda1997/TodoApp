import express,{Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";
import connectDB from "./db/connection";
dotenv.config();
const app = express();
connectDB();
app.use(cors({
origin: "http://localhost:3000",
credentials:true
}))
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//     res.cookie('name', 'value');
//     console.log(req.cookies.token);
// next();
// })
app.use("/users", userRouter);
app.use("/todo", todoRouter);


app.listen(process.env.PORT,()=>{
    console.log(`server is started at port no ${process.env.PORT}` );
    
})

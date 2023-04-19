
import express,{NextFunction, Request, Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
      interface Request {
        userId: string;
      }
    }
  }
const auth = (req:Request,res:Response, next:NextFunction)=>{
  
try {
    let token = req.headers.authorization;
    if(token){
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY!)as JwtPayload
   req.userId = user.id;
    }
    else{
        res.status(401).json({message: "Unauthorized user"});
    }
    next();
} catch (error) {
    console.log(error);
    
    res.status(401).json({message: "Unauthorized user"});
}
}

export default auth;
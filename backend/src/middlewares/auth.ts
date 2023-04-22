import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;
    if (token) {
      let user = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user" });
  }
};

export default auth;

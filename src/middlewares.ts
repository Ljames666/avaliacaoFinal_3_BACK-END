import { Response, Request, NextFunction } from "express";

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ auth: false, message: "No token provided." });

  next();
}

import { Response, Request, NextFunction } from "express";

export const requestProprietary = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  console.log(req.method);
  console.log(req.path);
  console.log(req.protocol);
  // console.log(res.charset);
  next();
};

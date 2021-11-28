import { Response, Request, NextFunction } from "express";
import { userList } from "./arrays";

let validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const pass = userList.findIndex((user) => user.password === req.body.password);
  const name = userList.findIndex((user) => user.name === req.body.name);
  if (!req.body.name || !req.body.password) {
    res.status(418).send();
  } else if (pass < 0 && name >= 0) {
    res.status(400).send();
  } else if (name < 0 && pass >= 0) {
    res.status(406).send();
  }

  next();
};

// function verifyJWT(req: Request, res: Response, next: NextFunction) {
//   const token = req.headers.token;

//   if (!token) return res.status(401).json({ auth: false, message: "No token provided." });

//   next();
// }

export { validateLogin };

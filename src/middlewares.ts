import { Response, Request, NextFunction } from "express";
import { userList } from "./arrays";

let validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const pass = userList.findIndex((user) => user.password === req.body.password);
  const username = userList.findIndex((user) => user.username === req.body.username);
  if (!req.body.username || !req.body.password) {
    res.status(418).send();
  } else if (pass < 0 && username >= 0) {
    res.status(400).send();
  } else if (username < 0 && pass >= 0) {
    res.status(406).send();
  }

  next();
};

let requestProprietary = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);

  console.log(req.method);
  console.log(req.path);
  console.log(req.protocol);
  console.log(res.charset);
  next();
};
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  console.log(token);
  const authorization = userList.findIndex((user) => user.token === token);
  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  } else if (authorization < 0) {
    return res.status(401).send({ message: "Unauthenticated." });
  }
  next();
}

let validateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = userList.findIndex((user) => user.username === req.body.username);
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.reppeatPassword
  ) {
    return res.status(418).send();
  } else if (username >= 0) {
    return res.status(400).send();
  }
  next();
};

export { validateLogin, requestProprietary, verifyToken, validateUser };

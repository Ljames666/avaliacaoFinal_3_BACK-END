import { Response, Request, NextFunction } from "express";
import { Equal, getRepository } from "typeorm";
import { TableToken } from "../database/models/TableToken";
import { TableUsers } from "../database/models/TableUsers";

let validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const repo = getRepository(TableUsers);
  const user = await repo.findOne({
    where: { username: Equal(req.body._username), password: Equal(req.body._password) },
  });
  // const userPass = await repo.findOne({
  //   where: {},
  // });
  // const pass = userPass.findIndex((item) => item.password === req.body._password);
  // console.log(pass);

  // const username = user.findIndex((item) => item.username === req.body._username);
  // console.log(username);

  if (!req.body._username || !req.body._password) {
    res.status(418);
  } else if (!user.password && user.username) {
    res.status(400);
  } else if (user.password && !user.username) {
    res.status(406);
  } else if (!user) {
    res.status(404);
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

let validateUser = (req: Request, res: Response, next: NextFunction) => {
  const username = getRepository(TableUsers).findOne({ username: Equal(req.body.username) });
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.reppeatPassword
  ) {
    return res.status(418).send();
  } else if (!username) {
    return res.status(400).send();
  }
  next();
};
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(TableToken);
  const token = req.headers["authorization"];
  console.log(token);
  const authorization = await repository.findOne({ id: token });
  console.log(authorization);
  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  } else if (!authorization) {
    return res.status(401).send({ message: "Unauthenticated." });
  }
  next();
};

export { validateLogin, requestProprietary, validateUser, verifyToken };

import { Response, Request, NextFunction } from "express";
import { Equal, getRepository } from "typeorm";
import { TableUsers } from "../models/TableUsers";

let validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const repo = getRepository(TableUsers);
  const user = await repo.find({
    where: { username: Equal(req.body._username) },
  });
  const userPass = await repo.find({
    where: { password: Equal(req.body._password) },
  });
  const pass = userPass.findIndex((item) => item.password === req.body._password);
  console.log(pass);

  const username = user.findIndex((item) => item.username === req.body._username);
  console.log(username);

  if (!req.body._username || !req.body._password) {
    res.status(418);
  } else if (pass < 0 && username >= 0) {
    res.status(400);
  } else if (username < 0 && pass >= 0) {
    res.status(406);
  } else if (username < 0 && pass < 0) {
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
  const username = getRepository(TableUsers).find({ username: Equal(req.body.username) });
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

export { validateLogin, requestProprietary, validateUser };

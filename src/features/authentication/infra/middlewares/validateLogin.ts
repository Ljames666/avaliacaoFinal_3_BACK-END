import { NextFunction, Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import { TableUsers } from "../../../../core/infra/database/models/TableUsers";

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const repo = getRepository(TableUsers);
  console.log(req.body);

  const user = await repo.find({
    where: { username: Equal(req.body.username) },
  });
  const userPass = await repo.find({
    where: { password: Equal(req.body.password) },
  });
  const pass = userPass.findIndex((item) => item.password === req.body.password);
  console.log(pass);

  const username = user.findIndex((item) => item.username === req.body.username);
  console.log(username);

  if (!req.body.username || !req.body.password) {
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

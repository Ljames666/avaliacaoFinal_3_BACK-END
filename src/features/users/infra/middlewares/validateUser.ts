import { NextFunction, Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import { TableUsers } from "../../../../core/infra/database/models/TableUsers";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.reppeatPassword
  ) {
    return res.status(418).send();
  }

  const username = getRepository(TableUsers).find({ username: Equal(req.body.username) });

  if (!username) {
    return res.status(400).send();
  }
  next();
};

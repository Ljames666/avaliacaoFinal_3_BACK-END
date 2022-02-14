import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TableUsers } from '../../../../core/infra/database/models/TableUsers';

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.body.name ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.reppeatPassword
  ) {
    return res.status(418).send({ message: 'There is no way to return a null request' });
  }

  const username = await getRepository(TableUsers).findOne({ username: req.body.username });

  if (username) {
    return res.status(400).send({ message: 'username already registered, try another!' });
  }
  next();
};

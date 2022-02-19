import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TableUsers } from '../../../../core/infra/database/models/TableUsers';

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const repo = getRepository(TableUsers);

  const user = await repo.find({
    where: { username: req.body.username },
  });
  const userPass = await repo.find({
    where: { password: req.body.password },
  });
  const pass = userPass.findIndex((item) => item.password === req.body.password);

  const username = user.findIndex((item) => item.username === req.body.username);

  if (!req.body.username || !req.body.password) {
    res.status(418).send({ message: 'There is no way to return a null request' });
  } else if (pass < 0 && username >= 0) {
    res.status(400).send({ message: 'password does not exist, try again!' });
  } else if (username < 0 && pass >= 0) {
    res.status(406).send({ message: 'username does not exist, try again!' });
  } else if (username < 0 && pass < 0) {
    res.status(404).send({ message: 'username e password does not exists, try again!' });
  }

  next();
};

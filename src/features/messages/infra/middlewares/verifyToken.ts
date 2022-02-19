import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { TableToken } from "../../../../core/infra/database/models/TableToken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const repository = getRepository(TableToken);
  const token = req.headers["authorization"];

  const authorization = await repository.findOne({ id: token });

  if (!token) {
    return res.status(404).send({ message: "No token provided." });
  } else if (!authorization) {
    return res.status(401).send({ message: "Unauthenticated." });
  }
  next();
};

import express from "express";
import { AuthRoutes } from "../../features/authentication/presentation/routes/LoginTokenRouters";
import { MessageRoutes } from "../../features/messages/presentation/routes/MessagesRouters";

import { UserRoutes } from "../../features/users/presentation/routes/UsersRouters";

export const makeRoutes = (app: express.Application) => {
  app.use("/cadastro", UserRoutes.getRoutes());
  app.use("/login", AuthRoutes.getRoutes());
  app.use("/messages", MessageRoutes.getRoutes());
};

import "reflect-metadata";
import express from "express";
import cors from "cors";
import { initConnection } from "./core/infra/database/connection/connection";
import { router } from "./features/authentication/presentation/routes/LoginTokenRouters";
import { routerMessages } from "./features/messages/presentation/routes/MessagesRouters";
import { routerUsers } from "./features/users/presentation/routes/UsersRouters";

const app = express();
const port = process.env.PORT || 8081;

initConnection()
  .then(() => {
    app.use(express.json(), cors(), routerUsers, routerMessages, router);
    app.listen(port, () => console.log("Starter server..."));
  })
  .catch((err) => {
    console.log("erro na comunicação com DB");
    console.log({ err });
  });

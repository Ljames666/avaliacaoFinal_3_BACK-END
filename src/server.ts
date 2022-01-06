import "reflect-metadata";
import express from "express";
import cors from "cors";
import { initConnection } from "./database/connection/connection";
import { routerUsers } from "./routers/UsersRouters";
import { routerLogin } from "./routers/LoginTokenRouters";
import { routerMessages } from "./routers/MessagesRouters";

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json(), cors(), routerUsers, routerLogin, routerMessages);

initConnection()
  .then(() => app.listen(port, () => console.log("Starter server...")))
  .catch((err) => {
    console.log("erro na comunicação com DB");
    console.log({ err });
  });

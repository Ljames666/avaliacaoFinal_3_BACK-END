import { Router } from "express";
import {
  CreateTokenByLoginController,
  DeleteTokenByLoginController,
  GetTokenController,
} from "../controllers/TokenControllers";
import { requestProprietary, validateLogin } from "../services/middlewares";

let routerLogin = Router();

routerLogin.use(requestProprietary);

routerLogin.post("/login", validateLogin, new CreateTokenByLoginController().handle);

routerLogin.get("/login/:uId", new GetTokenController().handle);

routerLogin.delete("/logout/:token", new DeleteTokenByLoginController().handle);

export { routerLogin };

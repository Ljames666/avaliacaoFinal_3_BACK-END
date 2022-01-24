import { Router } from "express";
import { requestProprietary, validateLogin } from "../../../../core/infra/Middlewares/middlewares";

import { GetTokenController } from "../controllers/GetTokenController";
import { LoginController } from "../controllers/LoginController";
import { LogoffController } from "../controllers/logoffController";

const router = Router();
router.use(requestProprietary);

router.post("/login", validateLogin, new LoginController().handle);

router.get("/login/:id", new GetTokenController().handle);

router.delete("/logoff/:id", new LogoffController().handle);
export { router };

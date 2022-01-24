import { Router } from "express";
import { requestProprietary } from "../../../../core/infra/Middlewares/middlewares";
import { validateLogin } from "../../infra/middlewares/validateLogin";

import { GetTokenController } from "../controllers/GetTokenController";
import { LoginController } from "../controllers/LoginController";
import { LogoffController } from "../controllers/logoffController";

const router = Router();
router.use(requestProprietary);

router.post("/login", validateLogin, new LoginController().handle);

router.get("/login/:id", new GetTokenController().handle);

router.delete("/logoff/:id", new LogoffController().handle);
export { router };

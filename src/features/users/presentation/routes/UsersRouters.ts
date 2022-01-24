import { Router } from "express";
import { requestProprietary, validateUser } from "../../../../core/infra/Middlewares/middlewares";

import { CreateUserController } from "../controllers/CreateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { GetUserByIdController, GetUsersController } from "../controllers/GetUserControllers";
import { UpdateUserController } from "../controllers/UpdateUserController";

const routerUsers = Router();

routerUsers.use(requestProprietary);

routerUsers.post("/cadastro", validateUser, new CreateUserController().handle);

routerUsers.get("/cadastro", new GetUsersController().handle);

routerUsers.get("/cadastro/:id", new GetUserByIdController().handle);

routerUsers.put("/cadastro/:id", new UpdateUserController().handle);

routerUsers.delete("/cadastro/:id", new DeleteUserController().handle);

export { routerUsers };

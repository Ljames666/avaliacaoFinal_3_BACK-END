import { Router } from "express";
import {
  CreateUsersController,
  DeleteUsersController,
  GetByIdUsersController,
  GetUsersController,
  UpdateUsersController,
} from "../controllers/UsersControllers";

const routerUsers = Router();

routerUsers.post("/cadastro", new CreateUsersController().handle);

routerUsers.get("/cadastro", new GetUsersController().handle);

routerUsers.get("/cadastro/:id", new GetByIdUsersController().handle);

routerUsers.put("/cadastro/:id", new UpdateUsersController().handle);

routerUsers.delete("/cadastro/:id", new DeleteUsersController().handle);

export { routerUsers };

import { Router } from "express";
import {
  CreateMessagesController,
  DeleteMessagesController,
  GetByUserIdMessageController,
  UpdateMessagesController,
} from "../controllers/MessagesControllers";
import { requestProprietary } from "../services/middlewares";

let routerMessages = Router();

routerMessages.use(requestProprietary);

routerMessages.get("/messages/:userId", new GetByUserIdMessageController().handle);

routerMessages.post("/messages/:userId", new CreateMessagesController().handle);

routerMessages.put("/messages/:id", new UpdateMessagesController().handle);

routerMessages.delete("/messages/:id", new DeleteMessagesController().handle);

export { routerMessages };

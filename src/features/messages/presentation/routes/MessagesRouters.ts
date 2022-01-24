import { Router } from "express";
import { requestProprietary } from "../../../../core/infra/Middlewares/middlewares";
import { verifyToken } from "../../infra/middlewares/verifyToken";

import { CreateMessageController } from "../controllers/CreateMessageController";
import { DeleteMessageController } from "../controllers/DeleteMessageController";
import {
  GetMessageByIdController,
  GetMessagesController,
} from "../controllers/GetMessagesControllers";
import { UpdateMessageController } from "../controllers/UpdateMessageController";

const routerMessages = Router();
// routerMessages.get("/messages", new GetMessagesController().handle);     //controle do admin algo futuro no app

routerMessages.use(requestProprietary);
routerMessages.use("/messages", verifyToken);

routerMessages.post("/messages/:userId", new CreateMessageController().handle);

routerMessages.get("/messages/:userId", new GetMessageByIdController().handle);

routerMessages.put("/messages/:id", new UpdateMessageController().handle);

routerMessages.delete("/messages/:id", new DeleteMessageController().handle);
export { routerMessages };

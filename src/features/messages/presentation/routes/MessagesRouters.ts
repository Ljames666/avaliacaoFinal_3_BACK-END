import { Request, Response, Router } from "express";
import { requestProprietary } from "../../../../core/infra/Middlewares/middlewares";
import { verifyToken } from "../../infra/middlewares/verifyToken";

import { CreateMessageController } from "../controllers/CreateMessageController";
import { DeleteMessageController } from "../controllers/DeleteMessageController";
import {
  GetMessageByIdController,
  GetMessagesController,
} from "../controllers/GetMessagesControllers";
import { UpdateMessageController } from "../controllers/UpdateMessageController";

import { RouterContract } from "../../../../core/presentation/contracts/routeContract";
import { MessageRepository } from "../../infra/repository/MessageRepository";
import { CacheRepository } from "../../../../core/infra/repositories/cacheRedis";
import { CreateMessageService } from "../../domain/services/CreateMessageService";
import {
  GetMessageByIdService,
  GetMessagesService,
} from "../../domain/services/GetMessagesServices";
import { UpdateMessageService } from "../../domain/services/UpdateMessageService";
import { DeleteMessageService } from "../../domain/services/DeleteMessageService";

export class MessageRoutes implements RouterContract {
  static getRoutes() {
    const repository = new MessageRepository();
    const cache = new CacheRepository();

    const createMessageService = new CreateMessageService(repository, cache);
    const createMessageController = new CreateMessageController(createMessageService);

    const getMessageService = new GetMessagesService(repository, cache);
    const getMessageController = new GetMessagesController(getMessageService);

    const getMessageByIdService = new GetMessageByIdService(repository, cache);
    const getMessageByIdController = new GetMessageByIdController(getMessageByIdService);

    const updateMessageService = new UpdateMessageService(repository, cache);
    const updateMessageController = new UpdateMessageController(updateMessageService);

    const deleteMessageService = new DeleteMessageService(repository, cache);
    const deleteMessageController = new DeleteMessageController(deleteMessageService);

    const routerMessages = Router();
    // routerMessages.get("/messages", new GetMessagesController().handle);     //controle do admin algo futuro no app

    routerMessages.use(requestProprietary);

    routerMessages.use("/", verifyToken);

    routerMessages.post("/:userId", (req: Request, res: Response) => {
      createMessageController.handle(req, res);
    });

    routerMessages.get("/:userId", (req: Request, res: Response) => {
      getMessageByIdController.handle(req, res);
    });

    routerMessages.put("/:id", (req: Request, res: Response) => {
      updateMessageController.handle(req, res);
    });

    routerMessages.delete("/:id", (req: Request, res: Response) => {
      deleteMessageController.handle(req, res);
    });

    return routerMessages;
  }
}

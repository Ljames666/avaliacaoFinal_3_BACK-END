import { IService } from "../../../../core/domain/interface/IService";
import { MessageRepository } from "../../infra/repository/MessageRepository";

export class GetMessagesService implements IService {
  async execute() {
    try {
      const repository = new MessageRepository();
      const messagesAll = await repository.messagesFind();
      if (!messagesAll) throw new Error("not has messages!");
      return messagesAll;
    } catch (error) {
      return error;
    }
  }
}

export class GetMessageByIdService implements IService {
  async execute(id: string) {
    try {
      const repository = new MessageRepository();

      const thisMessage = await repository.messageFindById(id);
      return thisMessage;
    } catch (error) {
      return error;
    }
  }
}

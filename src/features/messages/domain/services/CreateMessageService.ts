import { IService } from "../../../../core/domain/interface/IService";
import { MessageRepository } from "../../infra/repository/MessageRepository";
import { IMessage } from "../interfaces/IMessage";

export class CreateMessageService implements IService {
  async execute({ description, details, user_id }: IMessage) {
    try {
      const repository = new MessageRepository();

      const message = await repository.messageCreate({ description, details, user_id });

      return message;
    } catch (error) {
      if (error instanceof Error) return error.message;
    }
  }
}

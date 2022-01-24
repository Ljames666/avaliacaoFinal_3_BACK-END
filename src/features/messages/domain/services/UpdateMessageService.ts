import { IService } from "../../../../core/domain/interface/IService";
import { MessageRepository } from "../../infra/repository/MessageRepository";
import { IMessageUpdateRequest } from "../interfaces/IMessageUpdateRequest";

export class UpdateMessageService implements IService {
  async execute({ id, description, details }: IMessageUpdateRequest) {
    try {
      const repository = new MessageRepository();
      if (description != description.toString() || details != details.toString()) {
        throw new Error("Invalid description or details");
      }
      const editedMessage = await repository.messageUpdate({ id, description, details });
      return editedMessage;
    } catch (error) {
      return error;
    }
  }
}

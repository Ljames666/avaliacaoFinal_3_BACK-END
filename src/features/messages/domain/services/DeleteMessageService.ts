import { IService } from "../../../../core/domain/interface/IService";
import { MessageRepository } from "../../infra/repository/MessageRepository";

export class DeleteMessageService implements IService {
  async execute(id: string) {
    try {
      const repository = new MessageRepository();
      const deletedMessage = await repository.messageDelete(id);
      return deletedMessage;
    } catch (error) {
      return error;
    }
  }
}

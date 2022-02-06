import { IService } from "../../../../core/domain/interface/IService";
import { CacheRepository } from "../../../../core/infra/repositories/cacheRedis";
import { MessageRepository } from "../../infra/repository/MessageRepository";
import { IMessageUpdateRequest } from "../interfaces/IMessageUpdateRequest";

export class UpdateMessageService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute({ id, description, details }: IMessageUpdateRequest) {
    try {
      if (description != description.toString() || details != details.toString()) {
        throw new Error("Invalid description or details");
      }
      const inCache = await this.repository.findOneMessage(id);

      const deletedCache = await this.cache.delete(`messages:${inCache.user_id}`);

      const editedMessage = await this.repository.messageUpdate({ id, description, details });

      return editedMessage;
    } catch (error) {
      return error;
    }
  }
}

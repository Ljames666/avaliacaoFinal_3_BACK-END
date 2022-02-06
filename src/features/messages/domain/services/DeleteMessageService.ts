import { IService } from "../../../../core/domain/interface/IService";
import { CacheRepository } from "../../../../core/infra/repositories/cacheRedis";
import { MessageRepository } from "../../infra/repository/MessageRepository";

export class DeleteMessageService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute(id: string) {
    try {
      const userMessage = await this.repository.findOneMessage(id);
      const inCache = await this.cache.get(`messages:${userMessage.user_id}`);

      if (inCache) {
        await this.cache.delete(`messages:${userMessage.user_id}`);
      }

      const deletedMessage = await this.repository.messageDelete(id);

      return deletedMessage;
    } catch (error) {
      return error;
    }
  }
}

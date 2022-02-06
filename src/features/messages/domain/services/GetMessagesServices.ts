import { IService } from "../../../../core/domain/interface/IService";
import { CacheRepository } from "../../../../core/infra/repositories/cacheRedis";
import { MessageRepository } from "../../infra/repository/MessageRepository";

export class GetMessagesService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute() {
    try {
      const allCache = await this.cache.get(`messages:all`);

      if (allCache) return allCache;

      const messagesAll = await this.repository.messagesFind();

      if (!messagesAll) throw new Error("not has messages!");

      await this.cache.set(`messages:all`, messagesAll);
      return { ...messagesAll, cache: "ok" };
    } catch (error) {
      return error;
    }
  }
}

export class GetMessageByIdService implements IService {
  constructor(private repository: MessageRepository, private cache: CacheRepository) {}
  async execute(id: string) {
    try {
      const inCache = await this.cache.get(`messages:${id}`);

      if (inCache) return inCache;

      const thisMessage = await this.repository.messageFindById(id);

      await this.cache.set(`messages:${id}`, thisMessage);

      return thisMessage;
    } catch (error) {
      return error;
    }
  }
}

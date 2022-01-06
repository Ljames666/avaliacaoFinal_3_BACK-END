import { getRepository } from "typeorm";
import { TableMessages } from "../models/TableMessages";

type MessageRequest = {
  description: string;
  details: string;
  user_id: string;
};
type UpdateMessageRequest = {
  id: string;
  description: string;
  details: string;
};

export class CreateMessagesService {
  async execute({ description, details, user_id }: MessageRequest): Promise<TableMessages | Error> {
    const repository = getRepository(TableMessages);

    if (await repository.findOne({ description })) {
      return new Error(`Message already exists`);
    }

    const message = repository.create({ description, details, user_id });

    await repository.save(message);

    return message;
  }
}

export class GetMessagesService {
  async execute() {
    const repository = getRepository(TableMessages);

    const messages = await repository.find({
      relations: ["users"],
    });

    return messages;
  }
}

export class GetByUserIdMessageService {
  async execute(uid: string) {
    const repository = getRepository(TableMessages);

    const messages = await repository.find({
      where: {
        user_id: uid,
      },
      order: { created_at: "ASC" },
      relations: ["users"],
    });

    return messages;
  }
}

export class UpdateMessagesService {
  async execute({
    id,
    description,
    details,
  }: UpdateMessageRequest): Promise<TableMessages | Error> {
    const repository = getRepository(TableMessages);

    const message = await repository.findOne(id);

    if (!message) {
      return new Error(`message does not exists`);
    }

    message.description = description ? description : message.description;
    message.details = details ? details : message.details;
    message.created_at = message.created_at;
    message.updated_at = new Date();

    await repository.save(message);

    return message;
  }
}

export class DeleteMessagesService {
  async execute(id: string) {
    const repository = getRepository(TableMessages);

    if (!(await repository.findOne(id))) {
      return new Error("Message does not exists");
    }

    await repository.delete(id);
  }
}

import { v4 } from 'uuid';

import { MessageRepository } from '../../../src/features/messages/infra/repository/MessageRepository';

export const makeMessage = async (userId: string) => {
  const message = {
    description: `teste-${v4()}`,
    details: `teste details-${v4()}`,
    user_id: userId,
  };
  const repo = new MessageRepository();

  const newMessage = await repo.messageCreate(message);
  return { newMessage };
};

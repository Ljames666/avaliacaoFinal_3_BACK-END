import { ItIsError } from './it-is-error';

export class NotFoundError extends ItIsError {
  constructor(data: string) {
    super(`${data} not found.`, 404);
    this.name = 'NotFoundError';
  }
}

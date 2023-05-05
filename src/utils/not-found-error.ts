import { STATUS_NOT_FOUND } from '../constants/status-codes';

export default class NotFoundError extends Error {
  status: number;

  constructor (message: string) {
    super(message);
    this.status = STATUS_NOT_FOUND;
  }
}

import { STATUS_FORBIDDEN } from '../constants/status-codes';

export default class ForbiddenError extends Error {
  status;

  constructor (message: string) {
    super(message);
    this.status = STATUS_FORBIDDEN;
  }
}

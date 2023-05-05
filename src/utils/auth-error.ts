import { STATUS_NOT_AUTHORIZED } from '../constants/status-codes';

export default class AuthError extends Error {
  status: number;

  constructor (message: string) {
    super(message);
    this.status = STATUS_NOT_AUTHORIZED;
  }
}

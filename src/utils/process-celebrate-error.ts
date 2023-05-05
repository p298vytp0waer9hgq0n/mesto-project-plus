import { CelebrateError } from 'celebrate';
import { STATUS_BAD_REQUEST } from '../constants/status-codes';

export default function processCelebrateError (err: CelebrateError) {
  let message = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [, joiError] of err.details.entries()) {
    message = joiError.message;
  }

  const status = STATUS_BAD_REQUEST;

  return { status, message };
}

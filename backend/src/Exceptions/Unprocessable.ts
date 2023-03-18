import HttpException from './HttpException';

export default class UnprocessableException extends HttpException {
  private static status = 422;

  constructor(message: string) {
    super(UnprocessableException.status, message);
  }
}
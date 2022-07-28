class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные.') {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = BadRequestError;

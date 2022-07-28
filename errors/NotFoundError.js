class NotFoundError extends Error {
  constructor(message = 'Переданные данные не найдены.') {
    super(message);
    this.statusCode = 404;
    this.message = message;
  }
}

module.exports = NotFoundError;

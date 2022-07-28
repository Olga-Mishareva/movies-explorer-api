class ForbiddenError extends Error {
  constructor(message = 'У пользователя нет прав для этого действия.') {
    super(message);
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = ForbiddenError;

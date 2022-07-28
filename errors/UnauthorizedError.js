class UnauthorizedError extends Error {
  constructor(message = 'Необходима авторизация.') {
    super(message);
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = UnauthorizedError;

class ConflictError extends Error {
  constructor(message = 'Такой email уже существует.') {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

module.exports = ConflictError;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = message;
    this.code = 'NotFoundError';
    this.status = 404;
  }
}

module.exports = NotFoundError;
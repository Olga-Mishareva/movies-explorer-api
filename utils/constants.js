module.exports.CREATED = 201;
module.exports.BAD_REQ = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.CONFLICT = 409;
module.exports.SERVER_ERR = 500;

module.exports.badRequest = '400: Invalid data';
module.exports.unauthorized = '401: Authorisation is required';
module.exports.forbidden = '403: No rights for this action';
module.exports.notFound = '404: Data not found';
module.exports.conflict = '409: This email already exists';
module.exports.serverErr = '500: Server error';
module.exports.pathNotFound = '404: Path not found';
module.exports.badUserData = '401: Invalid email or password';

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://movies.om.nomoredomains.xyz',
];

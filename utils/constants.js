module.exports.CREATED = 201;
module.exports.BAD_REQ = 400;
module.exports.UNAUTHORIZED = 401;
module.exports.FORBIDDEN = 403;
module.exports.NOT_FOUND = 404;
module.exports.CONFLICT = 409;
module.exports.SERVER_ERR = 500;

module.exports.badRequest = 'Переданы некорректные данные.';
module.exports.unauthorized = 'Необходима авторизация.';
module.exports.forbidden = 'У пользователя нет прав для этого действия.';
module.exports.notFound = 'Переданные данные не найдены.';
module.exports.conflict = 'Такой email уже существует.';
module.exports.serverErr = 'На сервере произошла ошибка.';
module.exports.pathNotFound = 'Путь не найден.';
module.exports.serverErr = 'На сервере произошла ошибка.';
module.exports.badUserData = 'Неправильные почта или пароль.';

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://movies.om.nomoredomains.xyz',
];

module.exports.emailRegex = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/;
module.exports.linkRegex = /^https?:\/\/(www\.)?([\w\-\\.]+)\.([a-z]{2,})([\w\\.\-\\~:\\/\\?#\\[\]@!\\$&'\\(\\)\\*\\+\\,;\\=]*)#?$/;
module.exports.relativeLinkRegex = /^\/([\w\\-\\/]+)\.([a-z]{2,})$/;

module.exports.CREATED = 201;

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://movies.om.nomoredomains.xyz',
];

var success = function (res, message, data = null) {
  return res.status(200).json({
    message: message,
    data: data,
  });
};

var created = function (res, message, data = null) {
  return res.status(201).json({
    message: message,
    data: data,
  });
};

var error = function (res, message, data = null) {
  return res.status(400).json({
    message: message,
    data: data,
  });
};

var badRequest = function (res, message, data = null) {
  return res.status(400).json({
    message: message,
    data: data,
  });
};

var unauthorized = function (res, message, data = null) {
  return res.status(401).json({
    message: message,
    data: data,
  });
};

var forbidden = function (res, message, data = null) {
  return res.status(403).json({
    message: message,
    data: data,
  });
};

var notFound = function (res, message, data = null) {
  return res.status(404).json({
    message: message,
    data: data,
  });
};

var conflict = function (res, message, data = null) {
  return res.status(409).json({
    message: message,
    data: data,
  });
};

var serverError = function (res, message, data = null) {
  return res.status(500).json({
    message: message,
    data: data,
  });
};

module.exports = {
  success: success,
  created: created,
  error: error,
  badRequest: badRequest,
  unauthorized: unauthorized,
  conflict: conflict,
  forbidden: forbidden,
  notFound: notFound,
  serverError: serverError,
};

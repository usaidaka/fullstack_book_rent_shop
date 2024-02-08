const Boom = require("boom");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Moment = require("moment");

const GeneralHelper = require("../helpers/generalHelper");

const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "super_strong_key";
const fileName = "server/middlewares/authMiddleware.js";

// eslint-disable-next-line no-unused-vars
const validateToken = (request, reply, next) => {
  const { authorization } = request.headers;

  try {
    if (_.isEmpty(authorization)) {
      throw Boom.unauthorized();
    }

    const token = authorization.split(" ")[1];
    const verifiedUser = jwt.verify(token, jwtSecretToken);
    if (_.isEmpty(verifiedUser) || !_.has(verifiedUser, "exp")) {
      throw Boom.unauthorized();
    }

    const isTokenExpired = verifiedUser.exp < Moment().unix();
    if (isTokenExpired) {
      throw Boom.unauthorized();
    }

    request.user = verifiedUser;
    return next();
  } catch (err) {
    console.log([fileName, "validateToken", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const isAdminChecker = (request, reply, next) => {
  try {
    const { role } = request.user;

    if (role !== "Admin" && role !== "Super") {
      throw Boom.unauthorized();
    }
    next();
  } catch (err) {
    console.log([fileName, "isAdminChecker", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const isSuperChecker = (request, reply, next) => {
  try {
    const { role } = request.user;

    if (role !== "Super") {
      throw Boom.unauthorized();
    }
    next();
  } catch (err) {
    console.log([fileName, "isAdminChecker", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const isCustomerChecker = (request, reply, next) => {
  try {
    const { role } = request.user;

    if (role !== "Customer") {
      throw Boom.unauthorized();
    }
    next();
  } catch (err) {
    console.log([fileName, "isAdminChecker", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  validateToken,
  isAdminChecker,
  isSuperChecker,
  isCustomerChecker,
};

const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middleware/authMiddleware");
const { decryptPayload } = require("../../utils/decrypt");

const fileName = "server/api/book.js";

const login = async (request, reply) => {
  try {
    console.log(request.body, "<<<< BODY");
    const data = decryptPayload(request.body);
    console.log(data, "<<< DATA");
    Validation.loginValidation(data);

    const { email, password } = data;

    const response = await AuthHelper.login({
      email,
      password,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addAdmin = async (request, reply) => {
  try {
    Validation.addAdmin(request.body);

    const { name, email, password, confirmPassword, phone, address } =
      request.body;
    const response = await AuthHelper.createAdmin({
      name,
      email,
      password,
      confirmPassword,
      phone,
      address,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "addAdmin", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const forgotPassword = async (request, reply) => {
  try {
    Validation.forgotPassword(request.body);

    const { email } = request.body;
    const response = await AuthHelper.forgotPassword({
      email,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "forgotPassword api", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const resetPassword = async (request, reply) => {
  try {
    Validation.resetPassword(request.body);

    const { credential, email, newPassword, confirmPassword } = request.body;
    const response = await AuthHelper.resetPassword({
      credential,
      email,
      newPassword,
      confirmPassword,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "resetPassword api", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (request, reply) => {
  try {
    Validation.changePassword(request.body);
    const { id } = request.user;
    const { newPassword, password } = request.body;
    const response = await AuthHelper.changePassword({
      id,
      newPassword,
      password,
    });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "changePassword api", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.post("/login", login);
Router.post(
  "/register-admin",
  Middleware.validateToken,
  Middleware.isSuperChecker,
  addAdmin
);
Router.patch("/forgot-password", forgotPassword);
Router.patch("/reset-password", resetPassword);
Router.patch("/change-password", Middleware.validateToken, changePassword);

module.exports = Router;

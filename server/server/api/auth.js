const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middleware/authMiddleware");
const { decryptPayload } = require("../../utils/decrypt");
const handleImageCustomerUpload = require("../middleware/uploadCustomer");

const fileName = "server/api/auth.js";

const login = async (request, reply) => {
  try {
    const data = decryptPayload(request.body);
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
    const data = decryptPayload(request.body);
    Validation.addAdmin(data);

    const { name, email, password, confirmPassword, phone, address } = data;
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
    const { newPassword, confirmPassword } = request.body;
    const response = await AuthHelper.changePassword({
      id,
      newPassword,
      confirmPassword,
    });
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "changePassword api", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const editProfile = async (request, reply) => {
  try {
    Validation.editProfile(request.body);

    const data = request.body;
    console.log(data);

    const image = request.file?.filename;

    const { id } = request.user;

    const response = await AuthHelper.patchProfile(id, data, image);
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "edit profile", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const dataDashboard = async (request, reply) => {
  try {
    const response = await AuthHelper.getDataDashboard();
    return reply.send(response);
  } catch (err) {
    console.log([fileName, "edit profile", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE
  return reply.send("HELLO");
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
Router.patch(
  "/profile",
  Middleware.validateToken,
  handleImageCustomerUpload,
  editProfile
);
Router.get("/dashboard", Middleware.validateToken, dataDashboard);
Router.get("/hello", Middleware.validateToken, hello);

module.exports = Router;

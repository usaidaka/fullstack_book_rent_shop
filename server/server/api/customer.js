const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const CustomerHelper = require("../helpers/customerHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middleware/authMiddleware");
const handleImageCustomerUpload = require("../middleware/uploadCustomer");

const fileName = "server/api/customer.js";

const customerList = async (request, reply) => {
  try {
    const { name } = request.query;
    const response = await CustomerHelper.getCustomerList(name);

    if (!response.ok) {
      return reply.status(404).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "customer list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const customerDetail = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await CustomerHelper.getCustomerDetail(id);
    if (!response.ok) {
      return reply.status(404).json(response);
    }
    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "customer detail", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const customerProfile = async (request, reply) => {
  try {
    const { id } = request.user;

    const response = await CustomerHelper.getCustomerProfile(id);

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "customer profile", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addCustomer = async (request, reply) => {
  try {
    const data = request.body;

    Validation.addCustomer(data);

    const response = await CustomerHelper.createCustomer(data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "add customer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const editCustomer = async (request, reply) => {
  try {
    const data = request.body;
    const { id } = request.params;
    const image = request.file?.filename;

    Validation.editCustomer(data);

    const response = await CustomerHelper.patchCustomer(id, data, image);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "edit customer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const removeCustomer = async (request, reply) => {
  try {
    const { id } = request.params;
    const idAuth = request.user;

    const response = await CustomerHelper.deleteCustomer(id, idAuth);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(202).json(response);
  } catch (err) {
    console.log([fileName, "remove custodmer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get(
  "/customer",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  customerList
);
Router.get("/customer-profile", Middleware.validateToken, customerProfile);
Router.get(
  "/customer/:id",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  customerDetail
);
Router.post(
  "/customer",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  addCustomer
);
Router.patch(
  "/customer/:id",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  handleImageCustomerUpload,
  editCustomer
);
Router.delete(
  "/customer/:id",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  removeCustomer
);

module.exports = Router;

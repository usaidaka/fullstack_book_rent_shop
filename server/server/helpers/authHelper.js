const Boom = require("boom");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const crypto = require("crypto");
const moment = require("moment");

const db = require("../../models");
const GeneralHelper = require("./generalHelper");
const { getCustomerDetail } = require("./customerHelper");
const isExist = require("../../utils/isExist");

const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "super_strong_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
const fileName = "server/helpers/authHelper.js";
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

const createAdmin = async (dataObject) => {
  const { name, email, password, confirmPassword, phone, address } = dataObject;
  const transaction = await db.sequelize.transaction();

  try {
    const customer = await db.Customer.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (_.isEqual(email, customer?.email)) {
      await transaction.rollback();
      return Promise.reject(Boom.badRequest("Email has been used"));
    }

    if (!_.isEqual(password, confirmPassword)) {
      await transaction.rollback();
      return Promise.reject(
        Boom.badRequest("Password and confirm password should to be equal")
      );
    }

    if (_.isEqual(phone, customer?.phone)) {
      await transaction.rollback();
      return Promise.reject(Boom.badRequest("Phone has been used"));
    }

    const hashedPass = __hashPassword(password);
    await db.Customer.create(
      {
        name,
        email,
        password: hashedPass,
        phone,
        address,
        role: "Admin",
        image: "default.png",
      },
      { transaction }
    );

    await transaction.commit();
    const response = {
      ok: true,
      message: "Congrats! Successfully create new admin",
    };
    return Promise.resolve(response);
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "createAdmin", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const login = async (dataObject) => {
  const { email, password } = dataObject;

  try {
    const customer = await db.Customer.findOne({
      where: { email },
    });
    if (_.isEmpty(customer)) {
      return Promise.reject(Boom.notFound("Customer not found"));
    }

    const isPassMatched = __comparePassword(password, customer.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("Wrong credentials!"));
    }

    const token = __generateToken({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
    });

    return Promise.resolve({
      ok: true,
      message: "Login successful",
      result: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        role: customer.role,
        image: customer.image,
      },
      token,
    });
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const forgotPassword = async (dataObject) => {
  const { email } = dataObject;
  const transaction = await db.sequelize.transaction();

  try {
    const customer = await db.Customer.findOne({
      where: { email },
    });
    if (_.isEmpty(customer)) {
      await transaction.rollback();
      return Promise.reject(Boom.notFound("Customer not found"));
    }

    const __generateCredential = Math.random(
      crypto.randomBytes(16).toString("hex") * 543241
    )
      .toString()
      .substring(2, 8);

    const expDate = new Date(moment().add(10, "minutes").format());

    await db.Customer.update(
      {
        credential: __generateCredential,
        credentialExpAt: expDate,
      },
      { where: { id: customer.id }, transaction }
    );

    await transaction.commit();
    const response = {
      ok: true,
      message: `Please carefully! use this credential to reset your password ${__generateCredential}, it will expires in 10 minutes`,
    };
    return Promise.resolve(response);
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "forgotPassword helper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const resetPassword = async (dataObject) => {
  const { credential, email, newPassword, confirmPassword } = dataObject;
  const transaction = await db.sequelize.transaction();
  try {
    const customer = await db.Customer.findOne({
      where: { email },
    });

    if (!_.isEqual(newPassword, confirmPassword)) {
      await transaction.rollback();
      return Promise.reject(
        Boom.badRequest("Password and confirm password should to be equal")
      );
    }

    if (_.isEmpty(customer)) {
      await transaction.rollback();
      return Promise.reject(Boom.notFound("Customer not found"));
    }

    if (!_.isEqual(credential, customer.credential)) {
      await transaction.rollback();
      return Promise.reject(Boom.notFound("Invalid credential"));
    }

    const hashedPass = __hashPassword(newPassword);

    await db.Customer.update(
      {
        credential: null,
        credentialExpAt: null,
        password: hashedPass,
      },
      { where: { id: customer.id }, transaction }
    );

    await transaction.commit();
    const response = {
      ok: true,
      message: `Congrats! Password successfully reset`,
    };
    return Promise.resolve(response);
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "resetPassword helper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (dataObject) => {
  const { id, newPassword, confirmPassword } = dataObject;
  const transaction = await db.sequelize.transaction();
  try {
    const customer = await db.Customer.findOne({
      where: { id },
    });

    if (newPassword === confirmPassword) {
      await transaction.rollback();
      return Promise.reject(
        Boom.notFound("Password and confirm password should to be equal")
      );
    }

    if (_.isEmpty(customer)) {
      await transaction.rollback();
      return Promise.reject(Boom.notFound("Customer not found"));
    }

    const hashedPass = __hashPassword(newPassword);

    await db.Customer.update(
      {
        password: hashedPass,
      },
      { where: { id }, transaction }
    );

    await transaction.commit();
    const response = {
      ok: true,
      message: `Congrats! Password successfully changed`,
    };
    return Promise.resolve(response);
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "resetPassword helper", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const patchProfile = async (id, data, image) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    console.log(data, "<<< data");
    const { name, phone, address } = data;
    const isCustomerExist = await getCustomerDetail(id);

    if (!isCustomerExist.ok) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isDataExist = await isExist.isCustomerExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    if (image) {
      if (isCustomerExist.result.image !== "default.png") {
        await isExist.isPrevImageExist(
          "customer",
          isCustomerExist.result.image
        );
      } else {
        await db.Customer.update({ image }, { where: { id }, transaction });
      }
    }

    const result = await db.Customer.update(
      { name, phone, address, image },
      { where: { id }, transaction }
    );

    if (!result) {
      response = {
        ok: false,
        message: "Edit customer failed!",
      };
      await transaction.rollback();
      return response;
    }

    response = {
      ok: true,
      message: `Congrats! Customer : ${isCustomerExist.result?.name}'s data successfully updated `,
      result: data,
    };
    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "patch customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getDataDashboard = async () => {
  try {
    const customer = await db.Customer.findAll({});
    const book = await db.Book.findAll();
    const lending = await db.Lending.findAll({ paranoid: false });
    const category = await db.Category.findAll();

    const result = {
      customer: customer.length,
      book: book.length,
      lending: lending.length,
      category: category.length,
    };
    return Promise.resolve(result);
  } catch (err) {
    console.log([fileName, "patch customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  createAdmin,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  patchProfile,
  getDataDashboard,
};

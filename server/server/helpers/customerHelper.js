const { Op } = require("sequelize");
const _ = require("lodash");
const Boom = require("boom");
const bcrypt = require("bcryptjs");

const db = require("../../models");
const isExist = require("../../utils/isExist");
const GeneralHelper = require("./generalHelper");

const fileName = "server/helpers/customerHelper.js";
const salt = bcrypt.genSaltSync(10);
// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const getCustomerList = async (name) => {
  let response = {};
  let query = {};
  try {
    if (name) {
      query = { name: { [Op.like]: `%${name}%` } };
    }
    const result = await db.Customer.findAll({
      where: query,
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (result?.length === 0) {
      response = { ok: false, message: "Customer list still empty", result };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving customer list successful",
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "get customer list", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getCustomerProfile = async (id) => {
  try {
    const customer = await db.Customer.findOne({
      where: { id },
      attributes: {
        exclude: [
          "deletedAt",
          "createdAt",
          "updatedAt",
          "credential",
          "isAdmin",
          "password",
        ],
      },
    });

    if (_.isEmpty(customer)) {
      return Promise.reject(Boom.notFound("Customer not found"));
    }

    const response = {
      ok: true,
      message: "Congrats! Your profile successfully retrieved",
      result: customer,
    };
    return Promise.resolve(response);
  } catch (err) {
    console.log([fileName, "get customer profile", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getCustomerDetail = async (id) => {
  let response = {};
  try {
    const result = await db.Customer.findByPk(id, {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    });

    if (!result) {
      response = { ok: false, message: "Customer Not Found", result };
      return response;
    }
    response = {
      ok: true,
      message: `Retrieving customer: "${result.name} " detail successful`,
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "get customer detail", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createCustomer = async (data) => {
  let response = {};
  const transaction = await db.sequelize.transaction();
  try {
    const { name, phone, address, password, confirmPassword, email } = data;

    if (!_.isEqual(password, confirmPassword)) {
      response = {
        ok: false,
        message: "Password and confirm password must be equal",
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

    const hashedPass = __hashPassword(password);

    const result = await db.Customer.create(
      {
        name,
        phone,
        address,
        password: hashedPass,
        email,
        role: "Customer",
        image: "default.png",
      },
      { transaction }
    );

    response = {
      ok: true,
      message: `Customer: ${name} successfully created!`,
      result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "create customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const patchCustomer = async (id, data, image) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
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

const deleteCustomer = async (id, idAuth) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    if (Number(id) === Number(idAuth.id)) {
      response = {
        ok: false,
        message: "You cannot delete your own self",
      };
      await transaction.rollback();
      return response;
    }

    const isCustomerExist = await getCustomerDetail(id);

    if (!isCustomerExist.ok) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isCustomerStillHaveLending = await db.Lending.findOne({
      where: { idCustomer: id },
    });

    if (isCustomerStillHaveLending) {
      response = {
        ok: false,
        message:
          "This customer still have lending book in your shop. He/she cannot cancel his/her self. Should to return the book first",
      };
      await transaction.rollback();
      return response;
    }
    await db.Customer.destroy({ where: { id } }, { transaction });

    response = {
      ok: true,
      message: `Customer: ${isCustomerExist.result?.name}'s data successfully deleted!`,
      result: isCustomerExist.result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "delete customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getRoleCustomer = async () => {
  try {
    const customer = await db.Customer.findAll({
      where: { role: "Customer" },
      attributes: {
        exclude: [
          "deletedAt",
          "updatedAt",
          "createdAt",
          "credential",
          "credentialExpAt",
          "password",
        ],
      },
    });

    return Promise.resolve({ ok: true, result: customer });
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getRoleAdmin = async () => {
  try {
    const customer = await db.Customer.findAll({
      where: { role: "Admin" },
      attributes: {
        exclude: [
          "deletedAt",
          "updatedAt",
          "createdAt",
          "credential",
          "credentialExpAt",
          "password",
        ],
      },
    });

    return Promise.resolve({ ok: true, result: customer });
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getCustomerList,
  createCustomer,
  getCustomerDetail,
  patchCustomer,
  deleteCustomer,
  getCustomerProfile,
  getRoleCustomer,
  getRoleAdmin,
};

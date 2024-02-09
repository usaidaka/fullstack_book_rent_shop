const fs = require("fs");
const Boom = require("boom");
const path = require("path");
const db = require("../models");
const GeneralHelper = require("../server/helpers/generalHelper");

const fileName = "utils/isExist.js";

const isCustomerExist = async (data) => {
  let response = {};
  const { name, phone, email } = data;
  console.log(name);
  try {
    let isNameExist;
    let isPhoneExist;
    let isEmailExist;

    if (name) {
      console.log(name);
      isNameExist = await db.Customer.findAll({ where: { name } });
      console.log(isNameExist);
    }
    if (phone) {
      isPhoneExist = await db.Customer.findAll({ where: { phone } });
      console.log(isPhoneExist);
    }
    if (email) {
      isEmailExist = await db.Customer.findAll({ where: { email } });
      console.log(isEmailExist);
    }

    if (isNameExist.length !== 0) {
      response = {
        ok: false,
        message: `Unfortunately! this customer's name is used`,
      };

      return Promise.reject(Boom.badRequest(JSON.stringify(response)));
    }

    if (isPhoneExist.length !== 0) {
      response = {
        ok: false,
        message: `Unfortunately! this customer's phone number is already used`,
      };
      return Promise.reject(Boom.badRequest(JSON.stringify(response)));
    }

    if (email) {
      if (isEmailExist.length !== 0) {
        response = {
          ok: false,
          message: `Unfortunately! this customer's email is already used`,
        };
        return Promise.reject(Boom.badRequest(JSON.stringify(response)));
      }
    }

    response = {
      ok: true,
      message: `Congrats! All data input is literally new`,
    };
    return Promise.resolve(response);
  } catch (err) {
    console.log([fileName, "Is customer name exist", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const isBookExist = async (data) => {
  let response = {};
  const { title } = data;
  try {
    let isTitleExist;

    if (title) {
      isTitleExist = await db.Book.findAll({ where: { title } });
    }
    if (isTitleExist.length !== 0) {
      response = {
        ok: false,
        message: `Unfortunately! this book's title is used`,
      };
      return response;
    }

    response = {
      ok: true,
      message: `Congrats! All data input is literally new`,
      result: isTitleExist,
    };
    return response;
  } catch (err) {
    console.log([fileName, "Is customer name exist", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const isPrevImageExist = async (dir, name) => {
  const imagePath = path.join(__dirname, "..", "public", `${dir}`, `${name}`);

  fs.unlinkSync(imagePath);
};

module.exports = {
  isCustomerExist,
  isBookExist,
  isPrevImageExist,
};

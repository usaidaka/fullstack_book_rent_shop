const fs = require("fs");
const path = require("path");
const db = require("../models");
const GeneralHelper = require("../server/helpers/generalHelper");

const fileName = "utils/isExist.js";

const isCustomerExist = async (data) => {
  let response = {};
  const { name, phone, email } = data;
  try {
    let isNameExist;
    let isPhoneExist;
    let isEmailExist;

    if (name) {
      isNameExist = await db.Customer.findOne({ where: { name } });
    }
    if (phone) {
      isPhoneExist = await db.Customer.findOne({ where: { phone } });
    }
    if (email) {
      isEmailExist = await db.Customer.findOne({ where: { email } });
    }

    if (isNameExist) {
      response = {
        ok: false,
        message: `Unfortunately! this customer's name is used`,
      };
      return response;
    }

    if (isPhoneExist) {
      response = {
        ok: false,
        message: `Unfortunately! this customer's phone number is already used`,
      };
      return response;
    }

    if (email) {
      if (isEmailExist) {
        response = {
          ok: false,
          message: `Unfortunately! this customer's email is already used`,
        };
        return response;
      }
    }

    response = {
      ok: true,
      message: `Congrats! All data input is literally new`,
    };
    return response;
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
      isTitleExist = await db.Book.findOne({ where: { title } });
    }
    if (isTitleExist) {
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

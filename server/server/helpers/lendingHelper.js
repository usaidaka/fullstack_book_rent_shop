const _ = require("lodash");
const db = require("../../models");
const GeneralHelper = require("./generalHelper");
const isExist = require("../../utils/isExist");

const fileName = "server/helpers/lendingHelper.js";

const getLendingList = async () => {
  let response = {};

  try {
    const result = await db.Lending.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: db.Book,
          as: "Books",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          include: [
            {
              model: db.Category,
              as: "Categories",
              attributes: ["name"],
            },
          ],
        },
        {
          model: db.Customer,
          as: "Customers",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
    });

    if (result.length === 0) {
      response = { ok: false, message: "Lending list still empty", result };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving lending list successful!",
      result,
    };
    return response;
  } catch (err) {
    console.log([fileName, "get lending list", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createLending = async (data) => {
  let response = {};
  const transaction = await db.sequelize.transaction();
  try {
    const { email, idBook } = data;

    const isCustomerExist = await db.Customer.findOne({ where: { email } });
    const isBookExist = await db.Book.findByPk(idBook);

    if (!isCustomerExist) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    if (!isBookExist) {
      response = {
        ok: false,
        message: "Book Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isBooked = await db.Lending.findOne({
      where: {
        idCustomer: isCustomerExist.id,
        idBook: isBookExist.id,
      },
    });

    if (isBooked) {
      response = {
        ok: false,
        message: `Book: "${isBookExist.title}" already booked by customer: "${isCustomerExist.name}"`,
      };
      await transaction.rollback();
      return response;
    }

    const result = await db.Lending.create(
      {
        idCustomer: isCustomerExist.id,
        idBook,
      },
      { transaction }
    );

    response = {
      ok: true,
      message: `Lending book "${isBookExist.title}" for customer: "${isCustomerExist.name}" successful`,
      result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    console.log([fileName, "create lending", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getCustomerLending = async (id) => {
  let response = {};

  try {
    const result = await db.Lending.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: db.Book,
          as: "Books",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          include: [
            {
              model: db.Category,
              as: "Categories",
              attributes: ["name"],
            },
          ],
        },
        {
          model: db.Customer,
          as: "Customers",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
          where: { id },
        },
      ],
    });

    if (!result) {
      response = {
        ok: false,
        message: "Customer's lending list still empty",
        result,
      };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving  customer's lending list successful!",
      result,
    };
    return response;
  } catch (err) {
    console.log([fileName, "get customer's lending list", "ERROR"], {
      info: `${err}`,
    });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteLending = async (data) => {
  let response = {};
  const transaction = await db.sequelize.transaction();

  try {
    const { email, idBook } = data;

    const isCustomerExist = await db.Customer.findOne({ where: { email } });
    const isBookExist = await db.Book.findByPk(idBook);

    if (!isCustomerExist) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    if (!isBookExist) {
      response = {
        ok: false,
        message: "Book Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isBooked = await db.Lending.findOne({
      where: {
        idCustomer: isCustomerExist.id,
        idBook: isBookExist.id,
      },
    });

    if (!isBooked) {
      response = {
        ok: false,
        message: `Book: "${isBookExist.title}" never booked by customer: "${isCustomerExist.name}"`,
      };
      await transaction.rollback();
      return response;
    }

    const result = await db.Lending.destroy(
      {
        where: {
          idCustomer: isCustomerExist.id,
          idBook,
        },
      },
      { transaction }
    );

    response = {
      ok: true,
      message: `Book: "${isBookExist.title}" for customer: "${isCustomerExist.name}" successfully returned`,
      result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    console.log([fileName, "create lending", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getLendingList,
  createLending,
  getCustomerLending,
  deleteLending,
};

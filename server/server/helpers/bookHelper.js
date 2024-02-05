const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../../models");
const GeneralHelper = require("./generalHelper");
const isExist = require("../../utils/isExist");

const fileName = "server/helpers/bookHelper.js";

const getBookList = async (title) => {
  let response = {};
  let query = {};
  try {
    if (title) {
      query = { title: { [Op.like]: `%${title}%` } };
    }
    const result = await db.Book.findAll({
      where: query,
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: db.Category,
          as: "Categories",
          attributes: ["name"],
        },
      ],
    });

    if (result.length === 0) {
      response = { ok: false, message: "Book list still empty", result };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving book list successful!",
      result,
    };
    return response;
  } catch (err) {
    console.log([fileName, "getBlogList", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getBookDetail = async (id) => {
  let response = {};
  try {
    const result = await db.Book.findByPk(id, {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
      include: [
        {
          model: db.Category,
          as: "Categories",
          attributes: ["name"],
        },
      ],
    });

    if (!result) {
      response = { ok: false, message: "Book Not Found", result };
      return response;
    }
    response = {
      ok: true,
      message: `Retrieving book: "${result.title} " detail successful`,
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "get book detail", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createBook = async (data) => {
  let response = {};
  const transaction = await db.sequelize.transaction();
  try {
    const { title, author, idCategory } = data;

    const isDataExist = await isExist.isBookExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    const result = await db.Book.create(
      { title, author, idCategory, image: "default.jpeg" },
      { transaction }
    );

    response = {
      ok: true,
      message: `Book: ${title} successfully created!`,
      result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "create book", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const patchBook = async (id, data, image) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    const { title, author, idCategory } = data;
    const isBookExist = await getBookDetail(id);

    if (!isBookExist.ok) {
      response = {
        ok: false,
        message: "Book Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isDataExist = await isExist.isBookExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    if (image) {
      if (isBookExist.result.image !== "default.jpeg") {
        await isExist.isPrevImageExist("book", isBookExist.result.image);
      } else {
        await db.Book.update({ image }, { where: { id }, transaction });
      }
    }

    const result = await db.Book.update(
      { title, author, idCategory },
      { where: { id }, transaction }
    );

    if (!result) {
      response = {
        ok: false,
        message: "Edit book failed!",
      };
      await transaction.rollback();
      return response;
    }

    response = {
      ok: true,
      message: `Congrats! Book : ${isBookExist.result?.title}'s data successfully updated `,
      result: data,
    };
    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "patch book", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteBook = async (id) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    const isBookExist = await getBookDetail(id);

    if (!isBookExist.ok) {
      response = {
        ok: false,
        message: "Book Not Found",
      };
      await transaction.rollback();
      return response;
    }

    await db.Book.destroy({ where: { id } }, { transaction });

    response = {
      ok: true,
      message: `Book: ${isBookExist.result?.title}'s data successfully deleted!`,
      result: isBookExist.result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "delete book", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getBookList,
  getBookDetail,
  createBook,
  patchBook,
  deleteBook,
};

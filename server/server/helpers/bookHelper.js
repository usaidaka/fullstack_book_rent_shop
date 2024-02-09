const { Op } = require("sequelize");
const Boom = require("boom");
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
      order: [["id", "DESC"]],
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
    return Promise.resolve(response);
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

const createBook = async (data, image) => {
  let response = {};
  const transaction = await db.sequelize.transaction();
  try {
    const { title, author, idCategory, synopsis, publishAt } = data;

    const isDataExist = await isExist.isBookExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    let result = {};
    if (image) {
      result = await db.Book.create(
        {
          title,
          author,
          idCategory: Number(idCategory),
          image,
          synopsis,
          publishAt: Number(publishAt),
        },
        { transaction }
      );
    } else {
      result = await db.Book.create(
        {
          title,
          author,
          idCategory: Number(idCategory),
          image: "default.jpeg",
          synopsis,
          publishAt: Number(publishAt),
        },
        { transaction }
      );
    }

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
    const { title, author, idCategory, publishAt, synopsis } = data;

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
    const prevImage = isBookExist.result.image;

    if (image) {
      if (isBookExist.result.image !== "default.jpeg") {
        await isExist.isPrevImageExist("book", prevImage);
        await db.Book.update({ image }, { where: { id }, transaction });
      } else {
        await db.Book.update({ image }, { where: { id }, transaction });
      }
    }

    let result;

    if (title) {
      result = await db.Book.update(
        {
          title,
        },
        { where: { id }, transaction }
      );
    }

    if (author) {
      result = await db.Book.update(
        {
          author,
        },
        { where: { id }, transaction }
      );
    }

    if (idCategory) {
      result = await db.Book.update(
        {
          idCategory: Number(idCategory),
        },
        { where: { id }, transaction }
      );
    }

    if (publishAt) {
      result = await db.Book.update(
        {
          publishAt: Number(publishAt),
        },
        { where: { id }, transaction }
      );
    }

    if (synopsis) {
      result = await db.Book.update(
        {
          synopsis,
        },
        { where: { id }, transaction }
      );
    }

    if (!result) {
      response = {
        ok: false,
        message: "You are not update anything",
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

    const isBooked = await db.Lending.findOne({ where: { idBook: id } });

    if (isBooked) {
      response = {
        ok: false,
        message:
          "Book still in lending. You cannot delete book while it still lent",
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

const getAllCategory = async () => {
  try {
    const result = await db.Category.findAll({
      attributes: { exclude: ["createdAt", "deletedAt", "updatedAt  "] },
    });

    if (result.length === 0) {
      return Promise.reject(Boom.badRequest("Category still empty"));
    }

    const response = {
      ok: true,
      message: "Retrieving category list successful",
      result,
    };
    return Promise.resolve(response);
  } catch (err) {
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
  getAllCategory,
};

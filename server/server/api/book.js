const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const BookHelper = require("../helpers/bookHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middleware/authMiddleware");
const handleImageBookUpload = require("../middleware/uploadBook");

const fileName = "server/api/book.js";

const bookList = async (request, reply) => {
  try {
    const { title } = request.query;
    const response = await BookHelper.getBookList(title);
    if (!response.ok) {
      return reply.status(404).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "book list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const bookDetail = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await BookHelper.getBookDetail(id);
    if (!response.ok) {
      return reply.status(404).json(response);
    }
    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "book detail", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addBook = async (request, reply) => {
  try {
    const data = request.body;
    const image = request.file?.filename;

    Validation.addBook(data);

    const response = await BookHelper.createBook(data, image);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "add book", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const editBook = async (request, reply) => {
  try {
    const data = request.body;

    const { id } = request.params;
    const image = request.file?.filename;

    Validation.editBook(data);

    const response = await BookHelper.patchBook(id, data, image);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "edit book", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const removeBook = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await BookHelper.deleteBook(id);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(202).json(response);
  } catch (err) {
    console.log([fileName, "remove book", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const categoryList = async (request, reply) => {
  try {
    const response = await BookHelper.getAllCategory();

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "remove book", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/book", bookList);
Router.get("/book/:id", bookDetail);
Router.post(
  "/book",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  handleImageBookUpload,
  addBook
);
Router.patch(
  "/book/:id",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  handleImageBookUpload,
  editBook
);
Router.delete(
  "/book/:id",
  Middleware.validateToken,
  Middleware.isAdminChecker,
  removeBook
);
Router.get("/categories", categoryList);

module.exports = Router;

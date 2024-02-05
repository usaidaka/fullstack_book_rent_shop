const Joi = require("joi");
const Boom = require("boom");

const addCustomer = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description("Name; i.e. Usaid Aka"),
    email: Joi.string()
      .required()
      .description("Email; i.e. usaidaka@gmail.com"),
    password: Joi.string().required().description("Password; i.e. Phincon123!"),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .valid(Joi.ref("password"))
      .description("Should match password"),
    phone: Joi.string().required().description("Phone; i.e. 089652433206"),
    address: Joi.string()
      .required()
      .description("Address; i.e.Jl TB Simatupang"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editCustomer = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional().description("Name; i.e. Usaid Aka"),
    phone: Joi.string().optional().description("Phone; i.e. 089652433206  "),
    address: Joi.string()
      .optional()
      .description("Address; i.e.Jl TB Simatupang"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addBook = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(20)
      .required()
      .description("name; i.e. Usaid AKA"),
    author: Joi.string()
      .min(3)
      .max(20)
      .required()
      .description("author; i.e. Tere Liye"),
    idCategory: Joi.number()
      .required()
      .description("address; i.e. Jl TB Simatupang"),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editBook = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("name; i.e. Usaid AKA"),
    author: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("author; i.e. Tere Liye"),
    idCategory: Joi.number()
      .optional()
      .description("address; i.e. Jl TB Simatupang"),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addLending = (data) => {
  const schema = Joi.object({
    customerName: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("name; i.e. Usaid AKA"),
    bookName: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("book name; i.e. Matahari Tenggelam di wajahmu"),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addAdmin = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description("Person's full name"),
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .valid(Joi.ref("password"))
      .description("Should match password"),
    phone: Joi.string().required().description("Phone; i.e. 089652433206"),
    address: Joi.string()
      .required()
      .description("Address; i.e.Jl TB Simatupang"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description("Active email"),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const forgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().description("Active email"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const resetPassword = (data) => {
  const schema = Joi.object({
    credential: Joi.string().required().description("191234"),
    email: Joi.string().required().description("Active email"),
    newPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .valid(Joi.ref("newPassword"))
      .description("Should match password"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const changePassword = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .description("Should be between 8-20 characters"),
    confirmPassword: Joi.string()
      .min(8)
      .max(20)
      .required()
      .valid(Joi.ref("newPassword"))
      .description("Should match password"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  addCustomer,
  editCustomer,
  addBook,
  editBook,
  addAdmin,
  loginValidation,
  forgotPassword,
  resetPassword,
  changePassword,
  addLending,
};

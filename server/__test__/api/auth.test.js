const Request = require("supertest");
const QS = require("qs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const AuthPlugin = require("../../server/api/auth");
const MockCustomer = require("../fixtures/database/customer.json");

const MockAllBook = require("../fixtures/database/allBook.json");
const MockAllCustomer = require("../fixtures/database/allCustomer.json");
const MockAllLending = require("../fixtures/database/allLending.json");
const MockAllCategory = require("../fixtures/database/allCategory.json");

let apiUrl;
let server;
let header;
let getCustomer;
let getAllCustomer;
let getAllBook;
let getAllLending;
let getAllCategory;
let payload;
let mockCustomer;
let mockJsonWebTokenData;
let jwtVerify;
let createCustomer;
let updateCustomer;
let mockAllBook;
let mockAllCustomer;
let mockAllLending;
let mockAllCategory;

describe("Auth", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/", AuthPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Login", () => {
    beforeEach(() => {
      apiUrl = "/login";
      payload = {
        email: "super_admin@gmail.com",
        password: "Password123!",
      };

      mockCustomer = _.cloneDeep(MockCustomer);

      getCustomer = jest.spyOn(db.Customer, "findOne");
    });

    test("Should Return 200: Login Success", async () => {
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server)
        .post(apiUrl)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body)).toBeTruthy();
          expect(!_.isEmpty(res.body.token)).toBeTruthy();
        });
    });

    test("Should Return 400: Wrong Credential", async () => {
      payload.password = "wrong_password";
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server).post(apiUrl).send(payload).expect(400);
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.randomKey = "random_key";

      await Request(server).post(apiUrl).send(payload).expect(400);
    });

    test("Should Return 404: Customer Not Found", async () => {
      getCustomer.mockResolvedValue({});

      await Request(server).post(apiUrl).send(payload).expect(404);
    });

    test("Should Return 400: Missing Required Payload", async () => {
      payload = {};

      await Request(server).post(apiUrl).send(payload).expect(400);
    });
  });

  describe("JWT Middleware", () => {
    beforeEach(() => {
      apiUrl = "/hello";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NDY0ODYyLCJleHAiOjE3MDc1NTEyNjJ9.kEYl_gDgltwXhSPCBtQdK_clCi41B0sJGwoIF5nEwXE",
      };

      mockJsonWebTokenData = {
        id: 1,
        name: "Super Admins",
        email: "super_admin@gmail.com",
        role: "Super",
        iat: 1707464862,
        exp: 1707551262,
      };

      jwtVerify = jest.spyOn(jwt, "verify");
      jwtVerify.mockImplementation(() => mockJsonWebTokenData);
    });

    test("Should Return 200: JWT Verify Success", async () => {
      await Request(server).get(apiUrl).set(header).expect(200);
    });

    test("Should Return 401: JWT Does Not Contain Expiry Epoch", async () => {
      delete mockJsonWebTokenData.exp;
      jwtVerify.mockImplementation(() => mockJsonWebTokenData);

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: JWT Expired", async () => {
      mockJsonWebTokenData.exp = 946684800;
      jwtVerify.mockImplementation(() => mockJsonWebTokenData);

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: JWT Empty", async () => {
      mockJsonWebTokenData = {};
      jwtVerify.mockImplementation(() => mockJsonWebTokenData);

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: JWT Empty", async () => {
      mockJsonWebTokenData = {};
      jwtVerify.mockImplementation(() => mockJsonWebTokenData);

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: Invalid JWT Secret", async () => {
      header.authorization =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      jwtVerify.mockImplementation(() => new Error("Invalid Secret"));

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: Malformed Token", async () => {
      header.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      jwtVerify.mockImplementation(() => new Error("Malformed Token"));

      await Request(server).get(apiUrl).set(header).expect(401);
    });

    test("Should Return 401: Header Not Sent", async () => {
      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Register Admin", () => {
    beforeEach(() => {
      apiUrl = "/register-admin";
      payload = {
        name: "test",
        email: "test@gmail.com",
        password: "Phincon123!",
        confirmPassword: "Phincon123!",
        phone: "012345678",
        address: "JL TB Simatupang",
      };
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NDY3MTgxLCJleHAiOjE3MDc1NTM1ODF9.dAvEuKVxqtAVIxqPEog1idQE2M89TVbMLvtgjQFSQms",
      };

      mockCustomer = _.cloneDeep(MockCustomer);

      getCustomer = jest.spyOn(db.Customer, "findOne");
      createCustomer = jest.spyOn(db.Customer, "create");
    });

    test("Should Return 200: Register Success", async () => {
      getCustomer.mockResolvedValue(null);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 400: Email Already Exists", async () => {
      payload.email = "super_admin@gmail.com";
      getCustomer.mockResolvedValue(mockCustomer);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Password and Confirm password not match", async () => {
      payload.password = "Phincon123!";
      payload.confirmPassword = "Phincon123";
      getCustomer.mockResolvedValue(mockCustomer);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Phone Already Exist", async () => {
      payload.phone = "087512485142";
      getCustomer.mockResolvedValue(mockCustomer);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Name Already Exist", async () => {
      payload.name = "Super Admin";
      getCustomer.mockResolvedValue(mockCustomer);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Missing Required Payload", async () => {
      payload = {};

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Something Went Wrong with Database", async () => {
      createCustomer.mockRejectedValue("Something Went Wrong");

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 401: Unauthorized", async () => {
      header = {};

      await Request(server).post(apiUrl).set(header).send(payload).expect(401);
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.randomKey = "random_key";

      await Request(server).post(apiUrl).set(header).send(payload).expect(400);
    });
  });

  describe("Change Password", () => {
    beforeEach(() => {
      apiUrl = "/change-password";
      payload = {
        newPassword: "Password123!",
        confirmPassword: "Password123!",
      };
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NDY3MTgxLCJleHAiOjE3MDc1NTM1ODF9.dAvEuKVxqtAVIxqPEog1idQE2M89TVbMLvtgjQFSQms",
      };

      mockCustomer = _.cloneDeep(MockCustomer);

      getCustomer = jest.spyOn(db.Customer, "findOne");
      updateCustomer = jest.spyOn(db.Customer, "update");
    });

    test("Should Return 200: Change Password Success", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 400: Password and Confirm password not match", async () => {
      payload.password = "Phincon123!";
      payload.confirmPassword = "Phincon123";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 500: Something Went Wrong with Database", async () => {
      updateCustomer.mockRejectedValue("Something Went Wrong");

      await Request(server).patch(apiUrl).set(header).send(payload).expect(500);
    });

    test("Should Return 401: Unauthorized", async () => {
      header = {};

      await Request(server).patch(apiUrl).set(header).send(payload).expect(401);
    });

    test("Should Return 400: Missing Required Payload", async () => {
      payload = {};

      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Missing Required Payload", async () => {
      payload = {};

      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.randomKey = "random_key";

      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });
  });

  describe("Patch Profile", () => {
    beforeEach(() => {
      apiUrl = "/profile";
      payload = {
        name: "Customer",
        phone: "123123123",
        address: "JL ChangeAddress",
      };
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NDY3MTgxLCJleHAiOjE3MDc1NTM1ODF9.dAvEuKVxqtAVIxqPEog1idQE2M89TVbMLvtgjQFSQms",
      };

      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
      updateCustomer = jest.spyOn(db.Customer, "update");
    });

    test("Should Return 200: Update Profile Success", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 400: Name Already User", async () => {
      payload.name = "Super Admin";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 400: Phone Already User", async () => {
      payload.phone = "087512485142";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });

    test("Should Return 401: Unauthorized", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(401)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.randomKey = "randomKey";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server).patch(apiUrl).set(header).send(payload).expect(400);
    });
  });

  describe("Forgot Password", () => {
    beforeEach(() => {
      apiUrl = "/forgot-password";
      payload = {
        email: "super_admin@gmail.com",
      };
      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
      updateCustomer = jest.spyOn(db.Customer, "update");
    });

    test("Should Return 200: Forgot Password Success", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");
      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 404: Email / Customer Not Found", async () => {
      payload.email = "wrong_email@gmail.com";
      getCustomer.mockResolvedValue({});

      await Request(server).patch(apiUrl).send(payload).expect(404);
    });

    test("Should Return 400: Missing Required Payload", async () => {
      payload = {};

      await Request(server).patch(apiUrl).send(payload).expect(400);
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.randomKey = "random_key";

      await Request(server).patch(apiUrl).send(payload).expect(400);
    });
  });

  describe("Reset Password", () => {
    beforeEach(() => {
      apiUrl = "/reset-password";
      payload = {
        credential: "123456",
        email: "super_admin@gmail.com",
        newPassword: "Password123!",
        confirmPassword: "Password123!",
      };
      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
      updateCustomer = jest.spyOn(db.Customer, "update");
    });

    test("Should Return 200: Reset Password Successful", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 404: Invalid Credential", async () => {
      payload.credential = "11111";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Invalid Credential Type", async () => {
      payload.credential = 11111;
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: New Password and Confirm Password Not Equal", async () => {
      payload.newPassword = "Password123!";
      payload.confirmPassword = "Password123";
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Dashboard", () => {
    beforeEach(() => {
      apiUrl = "/dashboard";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NDY3MTgxLCJleHAiOjE3MDc1NTM1ODF9.dAvEuKVxqtAVIxqPEog1idQE2M89TVbMLvtgjQFSQms",
      };
      mockAllBook = _.cloneDeep(MockAllBook);
      mockAllCustomer = _.cloneDeep(MockAllCustomer);
      mockAllLending = _.cloneDeep(MockAllLending);
      mockAllCategory = _.cloneDeep(MockAllCategory);

      getAllBook = jest.spyOn(db.Book, "findAll");
      getAllCustomer = jest.spyOn(db.Book, "findAll");
      getAllLending = jest.spyOn(db.Book, "findAll");
      getAllCategory = jest.spyOn(db.Book, "findAll");
    });
    test("Should Return 200: Get Dashboard Data", async () => {
      getAllBook.mockResolvedValue(mockAllBook);
      getAllCustomer.mockResolvedValue(mockAllCustomer);
      getAllLending.mockResolvedValue(mockAllLending);
      getAllCategory.mockResolvedValue(mockAllCategory);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.customer).toEqual(12);
          expect(res.body.book).toEqual(8);
          expect(res.body.lending).toEqual(6);
          expect(res.body.category).toEqual(8);
        });
    });
  });
});

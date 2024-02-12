const Request = require("supertest");
const _ = require("lodash");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const CustomerPlugin = require("../../server/api/customer");

const MockCustomer = require("../fixtures/database/customer.json");
const MockAllCustomer = require("../fixtures/database/allCustomer.json");

let id;
let server;
let apiUrl;
let header;
let payload;
let mockCustomer;
let mockAllCustomer;
let getCustomer;
let getAllCustomer;
let createCustomer;
let updateCustomer;
let deleteCustomer;

describe("Customer", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/", CustomerPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Get All Customer", () => {
    beforeEach(() => {
      apiUrl = "/customer";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockAllCustomer = _.cloneDeep(MockAllCustomer);
      getAllCustomer = jest.spyOn(db.Customer, "findAll");
    });

    test("Should Return 200: Retrieve All Customer Success", async () => {
      getAllCustomer.mockResolvedValue(mockAllCustomer);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => expect(res.body.ok).toBeTruthy());
    });

    test("Should Return 404: Retrieve All Customer Success but Empty", async () => {
      getAllCustomer.mockResolvedValue([]);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      getAllCustomer.mockResolvedValue(mockAllCustomer);

      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Get Customer Detail", () => {
    beforeEach(() => {
      apiUrl = "/customer/1";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
    });

    test("Should Return 200: Get Customer Detail", async () => {
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 404: Get Customer Detail Not Found", async () => {
      getCustomer.mockResolvedValue(null);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Customer Profile", () => {
    beforeEach(() => {
      apiUrl = "/customer-profile";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
    });

    test("Should Return 200: Get Customer Profile", async () => {
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server).get(apiUrl).set(header).expect(200);
    });

    test("Should Return 401: Unauthorized", async () => {
      getCustomer.mockResolvedValue(mockCustomer);

      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Add Customer", () => {
    beforeEach(() => {
      apiUrl = "/customer";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = {
        name: "John Doe",
        phone: "0201030405",
        address: "JL Kasablanka",
        password: "Phincon123!",
        confirmPassword: "Phincon123!",
        email: "john_doe@gmail.com",
      };

      mockCustomer = _.cloneDeep(MockCustomer);
      getCustomer = jest.spyOn(db.Customer, "findOne");
      createCustomer = jest.spyOn(db.Customer, "create");
    });

    test("Should Return 201: Add Book Success", async () => {
      getCustomer.mockResolvedValue(null);
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400: Add Customer Fail, Name Already Used", async () => {
      getCustomer.mockResolvedValue((payload.name = "Super Admin"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Add Customer Fail, Phone Already Used", async () => {
      getCustomer.mockResolvedValue((payload.phone = "087512485142"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Add Customer Fail, Email Already Used", async () => {
      getCustomer.mockResolvedValue((payload.email = "super_admin@gmail.com"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Invalid Payload", async () => {
      getCustomer.mockResolvedValue((payload.email = "super_admin@gmail.com"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Empty Payload", async () => {
      getCustomer.mockResolvedValue((payload.email = "super_admin@gmail.com"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      getCustomer.mockResolvedValue((payload.email = "super_admin@gmail.com"));
      createCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .send(payload)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Edit Customer", () => {
    beforeEach(() => {
      id = 1;
      apiUrl = `/customer/${id}`;
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = {
        name: "John Doe",
        phone: "0201030405",
        address: "JL Kasablanka",
      };

      mockCustomer = _.cloneDeep(MockCustomer);

      getCustomer = jest.spyOn(db.Customer, "findOne");
      updateCustomer = jest.spyOn(db.Customer, "update");
    });

    test("Should Return 201: Edit Customer Success", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(201)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400: Invalid Type phone", async () => {
      payload.phone = 12315152;
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Invalid Payload", async () => {
      payload.Wrong = 2023;
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 500: Something Bad in Internal Server", async () => {
      payload = {};
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(500)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      payload = {};
      getCustomer.mockResolvedValue(mockCustomer);
      updateCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Delete Customer", () => {
    beforeEach(() => {
      id = 1;
      apiUrl = `/customer/${id}`;
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockCustomer = _.cloneDeep(MockCustomer);

      getCustomer = jest.spyOn(db.Customer, "findOne");
      deleteCustomer = jest.spyOn(db.Customer, "destroy");
    });

    test("Should Return 202 : Delete Customer Success", async () => {
      id = 5;
      apiUrl = `/customer/${id}`;
      getCustomer.mockResolvedValue(mockCustomer);
      deleteCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(202)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400 : Delete Customer Failed. You Cannot Delete Your Self", async () => {
      getCustomer.mockResolvedValue(mockCustomer);
      deleteCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400 : Delete Customer Failed. Customer Still Have Some Lent", async () => {
      id = 1;
      apiUrl = `/customer/${id}`;
      getCustomer.mockResolvedValue(mockCustomer);
      deleteCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400 : Customer Not Found", async () => {
      id = 100;
      apiUrl = `/customer/${id}`;
      getCustomer.mockResolvedValue(null);
      deleteCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401 : Unauthorized", async () => {
      getCustomer.mockResolvedValue(null);
      deleteCustomer.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Role Customer", () => {
    beforeEach(() => {
      apiUrl = "/customer-role";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockAllCustomer = _.cloneDeep(MockAllCustomer);
      getAllCustomer = jest.spyOn(db.Customer, "findAll");
    });

    test("Should Return 200: Customer Role List", async () => {
      getAllCustomer.mockResolvedValue(mockAllCustomer);

      const expectedRoleCustomer = mockAllCustomer.filter(
        (customer) => customer.role === "Customer"
      );

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(
            res.body.result.filter((customer) => customer.role === "Customer")
          ).toEqual(expectedRoleCustomer);
        });
    });
  });

  describe("Role Admin", () => {
    beforeEach(() => {
      apiUrl = "/customer-role";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockAllCustomer = _.cloneDeep(MockAllCustomer);
      getAllCustomer = jest.spyOn(db.Customer, "findAll");
    });

    test("Should Return 200: Customer Role List", async () => {
      getAllCustomer.mockResolvedValue(mockAllCustomer);

      const expectedRoleAdmin = mockAllCustomer.filter(
        (customer) => customer.role === "Admin"
      );

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(
            res.body.result.filter((customer) => customer.role === "Admin")
          ).toEqual(expectedRoleAdmin);
        });
    });
  });
});

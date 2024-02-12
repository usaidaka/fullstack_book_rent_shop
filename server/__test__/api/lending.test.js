const Request = require("supertest");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const LendingPlugin = require("../../server/api/lending");

const MockLending = require("../fixtures/database/lending.json");
const MockAllLending = require("../fixtures/database/allLending.json");

let id;
let server;
let apiUrl;
let header;
let payload;
let mockLending;
let mockAllLending;
let getLending;
let getAllLending;
let createLending;
let deleteLending;
let mockJsonWebTokenData;
let jwtVerify;

describe("Lending", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/", LendingPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Get All Lending", () => {
    beforeEach(() => {
      apiUrl = "/lending";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockAllLending = _.cloneDeep(MockAllLending);
      getAllLending = jest.spyOn(db.Lending, "findAll");
    });
    test("Should Return 200: Retrieve All Lending Success", async () => {
      getAllLending.mockResolvedValue(mockAllLending);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => expect(res.body.ok).toBeTruthy());
    });

    test("Should Return 404: Retrieve All Lending Success but Empty", async () => {
      getAllLending.mockResolvedValue([]);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      getAllLending.mockResolvedValue(mockAllLending);

      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Add Lending", () => {
    beforeEach(() => {
      apiUrl = "/lending";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = { email: "veronika@gmail.com", idBook: "1" };

      mockLending = _.cloneDeep(MockLending);
      getLending = jest.spyOn(db.Lending, "findOne");
      createLending = jest.spyOn(db.Lending, "create");
    });

    test("Should Return 200: Add Book Success", async () => {
      getLending.mockResolvedValue(null);
      createLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400: Invalid Type idBook", async () => {
      getLending.mockResolvedValue((payload.book = 1));
      createLending.mockResolvedValue("SUCCESS");

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
      getLending.mockResolvedValue((payload.wrong = 1));
      createLending.mockResolvedValue("SUCCESS");

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
      getLending.mockResolvedValue((payload = {}));
      createLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Customer Already Lent the Book", async () => {
      payload.email = "super_admin@gmail.com";
      payload.idBook = "1";
      getLending.mockResolvedValue(mockLending);
      createLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Book Not Found", async () => {
      payload.idBook = "100";
      getLending.mockResolvedValue(mockLending);
      createLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Customer Not Found", async () => {
      payload.email = "wrong_email@gmail.com";
      getLending.mockResolvedValue(mockLending);
      createLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Customer Lending", () => {
    beforeEach(() => {
      apiUrl = "/lending/1";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockLending = _.cloneDeep(MockLending);
      getLending = jest.spyOn(db.Lending, "findOne");
    });

    test("Should Return 200: Get Customer Lending Detail", async () => {
      getLending.mockResolvedValue(mockLending);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 400: Get Unknown Customer Lending List", async () => {
      getLending.mockResolvedValue(null);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          console.log(res);
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      getLending.mockResolvedValue(mockLending);

      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Delete Lending", () => {
    beforeEach(() => {
      apiUrl = "/lending";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = { email: "super_admin@gmail.com", idBook: "1" };

      mockLending = _.cloneDeep(MockLending);
      getLending = jest.spyOn(db.Lending, "findOne");
      deleteLending = jest.spyOn(db.Lending, "destroy");
    });

    test("Should Return 200 : Delete Lending Success", async () => {
      getLending.mockResolvedValue(mockLending);
      deleteLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .send(payload)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400 : Delete Lending Failed. ", async () => {
      payload = { email: "super_admin@gmail.com", idBook: "7" };
      getLending.mockResolvedValue(payload);
      deleteLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .send(payload)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Invalid Type idBook", async () => {
      getLending.mockResolvedValue((payload.book = 1));
      deleteLending.mockResolvedValue("SUCCESS");

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
      getLending.mockResolvedValue((payload.wrong = 1));
      deleteLending.mockResolvedValue("SUCCESS");

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
      getLending.mockResolvedValue((payload = {}));
      deleteLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Book Not Found", async () => {
      payload.idBook = "100";
      getLending.mockResolvedValue(mockLending);
      deleteLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Customer Not Found", async () => {
      payload.email = "wrong_email@gmail.com";
      getLending.mockResolvedValue(mockLending);
      deleteLending.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("My Lending", () => {
    beforeEach(() => {
      apiUrl = "/my-lending";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockAllLending = _.cloneDeep(MockAllLending);
      getAllLending = jest.spyOn(db.Lending, "findAll");
    });

    test("Should Return 200: Get My Lending", async () => {
      getAllLending.mockResolvedValue(mockAllLending);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          console.log(res.body.result);
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 200: Get My Lending List but Still Empty", async () => {
      getAllLending.mockResolvedValue([]);

      await Request(server)
        .get(apiUrl)
        .set(header)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body?.result?.length).toEqual(0);
        });
    });

    test("Should Return 500: Internal Server Error", async () => {
      getAllLending.mockResolvedValue(null);

      await Request(server).get(apiUrl).set(header).expect(500);
    });

    test("Should Return 401: Unauthorized", async () => {
      getAllLending.mockResolvedValue(mockAllLending);

      await Request(server).get(apiUrl).expect(401);
    });
  });
});

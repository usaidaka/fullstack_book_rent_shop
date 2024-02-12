const Request = require("supertest");
const _ = require("lodash");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const BookPlugin = require("../../server/api/book");

const MockBook = require("../fixtures/database/book.json");
const MockAllBook = require("../fixtures/database/allBook.json");
const MockAllCategory = require("../fixtures/database/allCategory.json");

let id;
let server;
let apiUrl;
let header;
let payload;
let mockBook;
let mockAllBook;
let getBook;
let getAllBook;
let createBook;
let updateBook;
let deleteBook;
let mockAllCategory;
let getAllCategory;

describe("Book", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/", BookPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Get All Book", () => {
    beforeEach(() => {
      apiUrl = "/book";

      mockAllBook = _.cloneDeep(MockAllBook);
      getAllBook = jest.spyOn(db.Book, "findAll");
    });

    test("Should Return 200: Retrieve All Book Success", async () => {
      getAllBook.mockResolvedValue(mockAllBook);

      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body).toBeTruthy();
          expect(res.body?.result?.length).toEqual(10);
        });
    });

    test("Should Return 404: Retrieve All Book Success but Empty", async () => {
      getAllBook.mockResolvedValue([]);

      await Request(server)
        .get(apiUrl)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
          expect(res.body?.result.length).toEqual(0);
        });
    });
  });

  describe("Get Book Detail", () => {
    beforeEach(() => {
      apiUrl = "/book/1";

      mockBook = _.cloneDeep(MockBook);
      getBook = jest.spyOn(db.Book, "findOne");
    });

    test("Should Return 200: Get Book Detail", async () => {
      getBook.mockResolvedValue(MockBook);

      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 404: Get Book Detail Not Found", async () => {
      getBook.mockResolvedValue(null);

      await Request(server)
        .get(apiUrl)
        .expect(404)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Add Book", () => {
    beforeEach(() => {
      apiUrl = "/book";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = {
        title: "Anak Singkong",
        author: "Khairul Tanjung",
        idCategory: 2,
        synopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime doloremque recusandae praesentium provident consectetur sit magni quis aliquam minus! Cumque.",
        publishAt: 2011,
      };

      mockBook = _.cloneDeep(MockBook);

      getBook = jest.spyOn(db.Book, "findOne");
      createBook = jest.spyOn(db.Book, "create");
    });

    test("Should Return 201: Add Book Success", async () => {
      getBook.mockResolvedValue(null);
      createBook.mockResolvedValue("SUCCESS");

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

    test("Should Return 400: Add Book Fail, Title Already Used", async () => {
      getBook.mockResolvedValue((payload.title = "Bumi"));
      createBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue((payload.Wrong = "Bumi"));
      createBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue((payload = {}));
      createBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue((payload = {}));
      createBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .post(apiUrl)
        .send(payload)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Edit Book", () => {
    beforeEach(() => {
      apiUrl = "/book/1";
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };
      payload = {
        title: "Anak Singkong",
        author: "Khairul Tanjung",
        idCategory: "2",
        synopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime doloremque recusandae praesentium provident consectetur sit magni quis aliquam minus! Cumque.",
        publishAt: "2011",
      };

      mockBook = _.cloneDeep(MockBook);

      getBook = jest.spyOn(db.Book, "findOne");
      updateBook = jest.spyOn(db.Book, "update");
    });

    test("Should Return 201: Edit Book Success", async () => {
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(201)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400: Invalid Type idCategory", async () => {
      payload.idCategory = 1;
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .set(header)
        .send(payload)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400: Invalid Type publishAt", async () => {
      payload.publishAt = 2023;
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

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
      getBook.mockResolvedValue(mockBook);
      updateBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .patch(apiUrl)
        .send(payload)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Delete Book", () => {
    beforeEach(() => {
      id = 45;
      apiUrl = `/book/${id}`;
      header = {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlN1cGVyIEFkbWlucyIsImVtYWlsIjoic3VwZXJfYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IlN1cGVyIiwiaWF0IjoxNzA3NzMwMDg2LCJleHAiOjE3MDc4MTY0ODZ9.4dFiUnOQv2iRmfVN9LNeZk9LDuJqbkqlcXxpqQf4xeE",
      };

      mockBook = _.cloneDeep(MockBook);
      getBook = jest.spyOn(db.Book, "findOne");
      deleteBook = jest.spyOn(db.Book, "destroy");
    });

    test("Should Return 202 : Delete Book Success", async () => {
      getBook.mockResolvedValue(mockBook);
      deleteBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(202)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
        });
    });

    test("Should Return 400 : Delete Book Failed. Book Still on Lent", async () => {
      id = 1;
      apiUrl = `/book/${id}`;
      getBook.mockResolvedValue(mockBook);
      deleteBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 400 : Book Not Found", async () => {
      id = 100;
      apiUrl = `/book/${id}`;
      getBook.mockResolvedValue(null);
      deleteBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .set(header)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });

    test("Should Return 401 : Unauthorized", async () => {
      id = 100;
      apiUrl = `/book/${id}`;
      getBook.mockResolvedValue(null);
      deleteBook.mockResolvedValue("SUCCESS");

      await Request(server)
        .delete(apiUrl)
        .expect(401)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });

  describe("Get Category", () => {
    beforeEach(() => {
      apiUrl = "/categories";

      mockAllCategory = _.cloneDeep(MockAllCategory);
      getAllCategory = jest.spyOn(db.Category, "findAll");
    });

    test("Should Return 200: Retrieve All Category Success", async () => {
      getAllCategory.mockResolvedValue(mockAllCategory);

      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(res.body.ok).toBeTruthy();
          expect(res.body).toBeTruthy();
          expect(res.body.result.length).toEqual(8);
        });
    });

    test("Should Return 400: Retrieve All Category Success but Empty", async () => {
      getAllCategory.mockResolvedValue([]);

      await Request(server)
        .get(apiUrl)
        .expect(400)
        .then((res) => {
          expect(res.body.ok).toBeFalsy();
        });
    });
  });
});

# Rental Book Shop

## Welcome to Rental Book Shop!

first of all. you can clone this repo if you wanna use my backend application. Next, follow step that i mention bellow

## install

run: npm install
this command for installing all package or dependencies that i used in this project

run: npx sequelize-cli db:create
make sure you are already connected with your local MySQL or etc. this command use for create a new schema. you can set up your config db in config folder by using .env files. i also attached .env.exp

run: npx sequelize-cli db:migrate
make sure the previous command already running and you have your own schema in your DB. so, this command will be migrate all table that we need.

run: npx sequelize-cli db:seed:all
i also provide many initial data that you can use for trial query. or even you wanna try CRUD operation, you can immediately hit those API.

## Postman Collection

i serve postman collection for your easy access. you can read all those API collection there. i will attach for any hint endpoint for your API:

### Customer Endpoint

- (GET) /api/customer/ : GET ALL CUSTOMER DATA
  > these endpoint are equipped with query search by name
  > /api/customer/?name=aka
- (POST) /api/customer : CREATE NEW CUSTOMER
  > this endpoint ask you to send name, email, phone and address (all field are required)
- (GET) /api/customer/:id : GET CUSTOMER DETAIL
- (PATCH) /api/customer/:id : EDIT CUSTOMER
  > this endpoint ask you to send name, email, phone and address (all field are optional)
- (DELETE) /api/customer/:id : DELETE CUSTOMER

### Book Endpoint

- (GET) /api/book/ : GET ALL BOOK DATA
  > these endpoint are equipped with query search by name
  > /api/book/?title=negeri para bedebah
- (POST) /api/book : CREATE NEW BOOK
  > this endpoint ask you to send title, author, and id category (all field are required)
- (GET) /api/book/:id : GET BOOK DETAIL
- (PATCH) /api/book/:id : EDIT BOOK
  > this endpoint ask you to send title, author, and id category (all field are optional)
- (DELETE) /api/book/:id : DELETE CUSTBOOKMER

### Lending Endpoint

- (GET) /api/lending/ : GET ALL LENDING DATA
  > this endpoint ask you to send body with email and idBook
- (GET) /api/lending/:id : GET CUSTOMER'S LENDING LIST
- (POST) /api/lending/ : CREATE LENDING
  > by hit this endpoint, it means the customer will lend the book that signed with idBook (all field are required)
- (DELETE) /api/lending/ : DELETE LENDING
  > this endpoint ask you to send body with email and idBook
  > this api means if customer wanna returned their lending book. we have to delete their id Customer + id Book in lending table

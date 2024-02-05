"use strict";

const bcrypt = require("bcryptjs");

const makePassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPassword = await makePassword(process.env.DEFAULT_PASSWORD);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Customers", [
      {
        id: 1,
        name: "SuperAdmin",
        phone: "0875124851",
        email: "super_admin@gmail.com",
        password: defaultPassword,
        address: "Jl TB Simatupang",
        image: "default.png",
        role: "Super",
        credential: null,
        credentialExpAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        name: "Admin",
        phone: "08123515212",
        email: "admin_1@gmail.com",
        password: defaultPassword,
        address: "Jl Letjen Katamso",
        image: "default.png",
        role: "Admin",
        credential: null,
        credentialExpAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 3,
        name: "Michael Anderson",
        phone: "08568234734",
        email: "anderson@gmail.com",
        password: defaultPassword,
        address: "Jl Sudirman",
        image: "default.png",
        role: "Customer",
        credential: null,
        credentialExpAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 4,
        name: "Veronica Yang",
        phone: "08912352312",
        email: "veronika@gmail.com",
        password: defaultPassword,
        address: "Jl Gatot Subroto",
        image: "default.png",
        role: "Customer",
        credential: null,
        credentialExpAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 5,
        name: "Cristine Alberto",
        phone: "08123515245",
        email: "cristine@gmail.com",
        password: defaultPassword,
        address: "Jl Dewi Sartika",
        image: "default.png",
        role: "Customer",
        credential: null,
        credentialExpAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Customers", null, {});
  },
};

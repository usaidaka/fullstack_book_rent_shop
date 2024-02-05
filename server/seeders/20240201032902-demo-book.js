"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Books", [
      {
        id: 1,
        title: "Bumi",
        author: "Tere Liye",
        idCategory: 2,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        title: "Hafalan Salat Delisa",
        author: "Tere Liye",
        idCategory: 4,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 3,
        title: "si anak pintar si anak kuat",
        author: "Tere Liye",
        idCategory: 2,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 4,
        title: "Pulang",
        author: "Tere Liye",
        idCategory: 5,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 5,
        title: "about love",
        author: "Tere Liye",
        idCategory: 5,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 6,
        title: "Harga Sebuah Percaya",
        author: "Tere Liye",
        idCategory: 1,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 7,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        idCategory: 4,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 8,
        title: "Cashflow Quadrant",
        author: "Robert Kiyosaki",
        idCategory: 6,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 9,
        title: "Why We Want You To Be Rich",
        author: "Robert Kiyosaki",
        idCategory: 7,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 10,
        title: "The Business School",
        author: "Robert Kiyosaki",
        idCategory: 2,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 11,
        title: "Atlas Penciptaan",
        author: "Harun Yahya",
        idCategory: 4,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 12,
        title: "Eternity Has Already Begun",
        author: "Harun Yahya",
        idCategory: 5,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 13,
        title: "Keruntuhan Teori Evolusi",
        author: "Harun Yahya",
        idCategory: 6,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 14,
        title: "Mengenal Allah lewat akal",
        author: "Harun Yahya",
        idCategory: 2,
        image: "default.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 15,
        title: "Yahudilik ve Masonluk",
        author: "Harun Yahya",
        idCategory: 8,
        image: "default.jpeg",
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
    return queryInterface.bulkDelete("Books", null, {});
  },
};

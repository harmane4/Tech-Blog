const { User } = require("../models");

const userData = [
  {
    username: "John",
    password: "password1234",
  },
  {
    username: "Meg",
    password: "password12345",
  },
];

const seedCategories = () => User.bulkCreate(userData);

module.exports = seedCategories;

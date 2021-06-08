const { Post } = require("../models");

const postData = [
  {
    title: "How good is Handlebars?",
    content: "Handlebars is a great templating engine.",
    user_id: 1,
  },
];

const seedCategories = () => Post.bulkCreate(postData);

module.exports = seedCategories;

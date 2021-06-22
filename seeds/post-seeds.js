const { Post } = require("../models");

const postData = [
  {
    title: "How good is Handlebars?",
    content:
      "Handlebars is a great templating engine. It is simple and allows an input object to generate HTML or other text formats",
    user_id: 1,
  },
  {
    title: "The importance of CSS",
    content:
      "CSS or Cascading Style Sheet allows developers to have complete control of how a webpage looks.",
    user_id: 2,
  },
];

const seedCategories = () => Post.bulkCreate(postData);

module.exports = seedCategories;

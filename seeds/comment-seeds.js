const { Comment } = require("../models");

const commentData = [
  {
    content: "Handlebars is great, 10/10 rating",
    user_id: 1,
    post_id: 1,
  },
];

const seedCategories = () => Comment.bulkCreate(commentData);

module.exports = seedCategories;

const { Comment } = require("../models");

const commentData = [
  {
    comment_content: "Handlebars is great, 10/10 rating",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_content: "test test",
    user_id: 2,
    post_id: 2,
  },
];

const seedCategories = () => Comment.bulkCreate(commentData);

module.exports = seedCategories;

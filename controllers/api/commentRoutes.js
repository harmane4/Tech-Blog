const router = require("express").Router();
const { Comment } = require("../../models");

// View all comments in ascending order by name
router.get("/", async (request, response) => {
  try {
    const postData = await Comment.findAll({
      order: [["name", "ASC"]],
    });
    response.status(200).json(postData);
  } catch (error) {
    response.status(500).json(error);
  }
});

// Add a comments
router.post("/", async (request, response) => {
  // create a new category
  try {
    const categoryData = await Comment.create({
      content: request.body.content,
      user_id: request.session.user_id,
      post_id: request.body.post_id,
    });
    response.status(200).json(categoryData);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;

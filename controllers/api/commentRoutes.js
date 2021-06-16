const router = require("express").Router();
const { Comment } = require("../../models");

// View all comments in ascending order by name
router.get("/", async (request, response) => {
  try {
    const commentData = await Comment.findAll();
    response.status(200).json(commentData);
  } catch (error) {
    response.status(500).json(error);
  }
});

// Add a comment
router.post("/", async (request, response) => {
  try {
    const commentData = await Comment.create({
      comment_content: request.body.comment_content,
      user_id: request.session.user_id,
      post_id: request.body.post_id,
    });
    response.status(200).json(commentData);
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = router;

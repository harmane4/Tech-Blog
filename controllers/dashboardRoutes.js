const router = require("express").Router();
const { Post } = require("../models");

// View all posts by a user_id from the current session
router.get("/", async (request, response) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: request.session.user_id },
    });
    response.status(200).json(postData);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const { Post } = require("../../models");

// View all posts in ascending order by name
router.get("/", async (request, response) => {
  try {
    const postData = await Post.findAll({
      order: [["name", "ASC"]],
    });
    response.status(200).json(postData);
  } catch (error) {
    response.status(500).json(error);
  }
});

// Add a post
router.post("/", async (request, response) => {
  try {
    const postData = await Post.create({
      title: request.body.title,
      content: request.body.content,
    });

    request.session.save(() => {
      request.session.loggedIn = true;

      response.status(200).json(postData);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

// View all posts in ascending order by name
router.get("/", async (request, response) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "user_id",
            "post_id",
            "created_at",
          ],
          include: { model: User, attributes: ["username"] },
        },
      ],
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

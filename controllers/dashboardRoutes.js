const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// View all posts by a user_id from the current session
router.get("/", withAuth, async (request, response) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: request.session.user_id },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_content", "user_id", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
        { model: User, attributes: ["username"] },
      ],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    response.render("dashboard", { posts, loggedIn: request.session.loggedIn });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;

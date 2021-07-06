const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");
const chalk = require("chalk");

// View all posts by a user_id from the current session only if logged in
router.get("/", withAuth, async (request, response) => {
  console.log("dashboard");
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
    console.log(chalk.blue("postdata", postData));
    const posts = postData.map((project) => project.get({ plain: true }));
    console.log(chalk.red("posts", posts));

    response.render("dashboard", { posts, loggedIn: request.session.loggedIn });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/post", withAuth, async (request, response) => {
  try {
    response.render("edit-post", { loggedIn: request.session.loggedIn });
  } catch (error) {
    console.log(error);
    response.status(500).json(error.message);
  }
});

// View & edit a single post
router.get("/post/:id", withAuth, async (request, response) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: request.params.id,
      },
      attributes: ["id", "title", "content"],
      include: [
        {
          model: Comment,
          attribute: ["id", "comment_content"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    response.render("edit-post", {
      postData,
      loggedIn: request.session.loggedIn,
    });
  } catch (error) {
    console.log("error", error);
    response.status(500).json(error);
  }
});

module.exports = router;

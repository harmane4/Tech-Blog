const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const chalk = require("chalk");

// Home page shows all blog posts
router.get("/", async (request, response) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
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

    const posts = postData.map((project) => project.get({ plain: true }));

    // Renders response to the homepage template users the posts array if they are logged in
    response.render("homepage", {
      posts,
      loggedIn: request.session.loggedIn,
    });
  } catch (err) {
    response.status(500).json(err);
    console.log("error", err);
  }
});

// View & edit a single post
router.get("/post/:id", async (request, response) => {
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
    const posts = postData.map((project) => project.get({ plain: true }));
    response.render("edit-post", { posts, loggedIn: request.session.loggedIn });
  } catch (error) {
    response.status(500).json(error);
  }
});

// Login page
router.get("/login", (request, response) => {
  if (request.session.loggedIn) {
    response.redirect("/");
    return;
  }

  response.render("login");
});

// Sign up page
router.get("/signup", (request, response) => {
  if (request.session.loggedIn) {
    response.redirect("/");
    return;
  }

  response.render("signup");
});

module.exports = router;

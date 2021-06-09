const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

// Home page shows all blog posts
router.get("/", withAuth, async (request, response) => {
  try {
    const postData = await Post.findAll({
      attributes: [["title", "content", "created_at"]],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    response.render("homepage", {
      posts,
      logged_in: request.session.logged_in,
    });
  } catch (err) {
    response.status(500).json(err);
  }
});

// Login page
router.get("/login", (request, response) => {
  if (request.session.logged_in) {
    response.redirect("/");
    return;
  }

  response.render("login");
});

// Sign up page
router.get("/signup", (request, response) => {
  if (request.session.logged_in) {
    response.redirect("/");
    return;
  }

  response.render("signup");
});

module.exports = router;

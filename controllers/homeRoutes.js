const router = require("express").Router();
const { Post, User, Comment } = require("../models");

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

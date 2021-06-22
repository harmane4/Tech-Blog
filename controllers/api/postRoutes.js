const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, Comment, User } = require("../../models");
const chalk = require("chalk");

// View all posts
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
    response.status(200).json(postData);
  } catch (error) {
    response.status(500).json(error);
  }
});

// // Get a single post by id
// router.get(":id", async (request, response) => {
//   try {
//     const postData = await Post.findOne({
//       where: {
//         id: request.params.id,
//       },
//       attributes: ["id", "title", "content", "create_at"],
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//         {
//           model: Comment,
//           attributes: ["id", "comment_content", "user_id"],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//       ],
//     });
//     response.status(200).json(postData);
//   } catch (error) {
//     console.log(error);
//     response.status(500).json(error);
//   }
// });

// Add a post
router.post("/", async (request, response) => {
  console.log(chalk.red("session", request.session));
  try {
    const postData = await Post.create({
      title: request.body.title,
      content: request.body.content,
      user_id: request.session.user_id,
    });

    response.status(200).json(postData);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

module.exports = router;

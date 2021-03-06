const router = require("express").Router();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { User } = require("../../models");
const chalk = require("chalk");

// Get all users
router.get("/", async (request, response) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    response.status(200).json(userData);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (request, response) => {
  try {
    const userData = await User.create({
      username: request.body.username,
      password: request.body.password,
    });
    // Log user in and save their session id
    request.session.save(() => {
      console.log(chalk.green("userData", userData));
      request.session.user_id = userData.id;
      request.session.username = userData.username;
      request.session.loggedIn = true;

      response.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

// Login a user
router.post("/login", async (request, response) => {
  try {
    const userData = await User.findOne({
      where: {
        username: request.body.username,
      },
    });

    if (!userData) {
      response
        .status(400)
        .json({ message: "Incorrect username. Please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(request.body.password);

    if (!validPassword) {
      response
        .status(400)
        .json({ message: "Incorrect password. Please try again!" });
      return;
    }

    request.session.save(() => {
      request.session.user_id = userData.id;
      request.session.username = userData.username;
      request.session.loggedIn = true;

      response
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
});

// Logout a user
router.post("/logout", (request, response) => {
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

module.exports = router;

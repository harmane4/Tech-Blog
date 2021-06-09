const router = require("express").Router();
const { User } = require("../../models");

// Create a new user
router.post("/", async (request, response) => {
  try {
    const userData = await User.create({
      username: request.body.username,
      password: request.body.password,
    });

    request.session.save(() => {
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
        email: request.body.email,
      },
    });

    if (!userData) {
      response
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(request.body.password);

    if (!validPassword) {
      response
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    request.session.save(() => {
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
  if (request.session.logged_in) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

module.exports = router;
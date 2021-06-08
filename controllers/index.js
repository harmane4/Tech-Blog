const router = require("express").Router();

// Here is where we provide hardcoded data to render dynamically

// wk14 day 2 === 2.35
// Get all responses
router.get("/", async (request, response) => {
  response.render("homepage");
});

module.exports = router;

// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const expressHandlebars = exphbs.create({});

// Stores all session data once user is signed in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Used to store session data
const sess = {
  secret: "Super secret secret", // Key to the session
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//Register template engine with express
app.engine("handlebars", expressHandlebars.engine);
// Specify the view directory
app.set("views ", "./views");
// Register the template engine
app.set("view engine", "handlebars");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log("Now listening on http://localhost:" + PORT);
});

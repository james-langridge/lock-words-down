const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const fileRoute = require('./routes/file');

const app = express();

// Bodyparser middleware;
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
// what is the first string arg here?
app.use("/api/users", users);
app.use("/file", fileRoute);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

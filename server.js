require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

const termEntryRoute = require('./routes/termEntries');
const selectionRoute = require('./routes/selections');
const userRoute = require("./routes/users");
const studentRoute = require("./routes/students");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/term", termEntryRoute);
app.use("/selection", selectionRoute);
app.use("/user", userRoute);
app.use("/students", studentRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const { PORT, DATABASE_URL } = require("./config/database");

const app = express();

// ASSIGNING ROUTES TO VARIABLES
const { router: usersRouter } = require("./routes/users");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");
const { router: businessRouter } = require("./routes/businesses");
const { router: notesRouter } = require("./routes/notes");

// INITIALIZE MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));
passport.use(localStrategy);
passport.use(jwtStrategy);

// ROUTES ENDPOINTS
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/businesses", businessRouter);
app.use("/api/notes", notesRouter);

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

// SERVER SETUP
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on("error", err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

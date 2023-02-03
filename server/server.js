/*
|--------------------------------------------------------------------------
| server.js -- The core of the server
|--------------------------------------------------------------------------
|
| Server start up. 
| - Connect to database
| - Sets up server middleware (json parsing, user login, etc.)
| - Hooks up backend routes specified in api.js.
| - Fowards frontend routes to be handled by React router
| - Sets up error handling for bad requests
| - Starts the webserver
*/

const validator = require("./validator");
validator.checkSetup();

// Library imports
const http = require("http");
const express = require("express"); // backend framework for node server.
const session = require("express-session"); // To store user session info 
const mongoose = require("mongoose"); // MongoDb
const path = require("path"); // File and directory paths

const api = require("./api");
const object = require("./apis/object");
const auth = require("./auth");

// socket stuff
const socketManager = require("./server-socket");

// Mongo Setup
const mongoConnectionURL = "mongodb+srv://17pearlj:mN7XScmlVgkxgXHH@proj-lido-cluster.bwgqldw.mongodb.net/?retryWrites=true&w=majority";

const databaseName = "Proj-Lido";

mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// New express server
const app = express();
app.use(validator.checkRoutes);

// Allow process POST requests
app.use(express.json());

// Set up session to persist login data across requests
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Check if user is logged in, and if so, populate "req.user"
app.use(auth.populateCurrentUser);

// Connect user-defined routes
app.use("/api", api);
app.use("/api/object", object);

// Load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// For all other routes, render index.html and let react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// Any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500: Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// Hardcode port to 3000 for now
const port = 3000;
const server = http.Server(app);
socketManager.init(server);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

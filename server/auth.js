const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// TODO: replace client id with commented version
//const CLIENT_ID = "739429176548-tsa0p9g06lqtakr3p0ifjfcde6jnpqhj.apps.googleusercontent.com";
const CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

// accepts and verify frontend login token 
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// get user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // sub is unique identifier 
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;
    console.log(user);
    const newUser = new User({
      firstname: user.given_name,
      lastname: user.family_name,
      googleid: user.sub,
    });

    return newUser.save();
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // populate "req.user" 
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};

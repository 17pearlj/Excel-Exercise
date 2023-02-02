const fs = require("fs");
const net = require("net");

/**
 * Validation checks during setup.
 *
 * Curent checks:
 * - node_modules exists
 * - makes sure 'npx webpack' was called if required
 * - warns if visiting port 3000 while running hot reloader
 */

class NodeSetupError extends Error {}
let routeChecked = false;

// poke port 5000 to see if 'npm run hotloader' was possibly called
function checkHotLoader() {
  return new Promise((resolve, reject) => {
    var server = net.createServer();

    server.once("error", (err) => {
      resolve(err.code === "EADDRINUSE");
    });

    server.once("listening", () => server.close());
    server.once("close", () => resolve(false));
    server.listen(5000);
  });
}

module.exports = {
  checkSetup: () => {
    if (!fs.existsSync("./node_modules/")) {
      throw new NodeSetupError(
        "node_modules not found! Run 'npm install'"
      );
    }
  },

  checkRoutes: (req, res, next) => {
    if (!routeChecked && req.url === "/") {
      // if the server receives a request on /, we must be on port 3000 not 5000
      if (!fs.existsSync("./client/dist/bundle.js")) {
        throw new NodeSetupError(
          "Couldn't find bundle.js! Run 'npm run hotloader'\n" +
            "and go to http://localhost:5000 (not 3000).\n" +
            "If using hot reloader, run 'npx webpack' before visiting the page"
        );
      }

      checkHotLoader().then((active) => {
        if (active) {
          console.log(
            "Warning: It looks like 'npm run hotloader' may be running. Are you sure you don't want\n" +
              "to use the hot reloader? To use it, visit http://localhost:5000 and not port 3000"
          );
        }
      });

      routeChecked = true; // only runs once to avoid spam/overhead
    }
    next();
  },
};

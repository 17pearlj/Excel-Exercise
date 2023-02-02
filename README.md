# How to code a webapp with this skeleton

## Initial setup

Requirements
  - NodeJS version 16. If it is installed correctly, use node version manager to switch. NPM version 8.3.0.

## How to run this project
First, 'npm install'
Then open two seperate terminals, and 'npm run hotloader' in the first, and 'npm start' in the second.
Then open http://localhost:5000

## Socket: Server->Client Interactions
- If no realtime updating or no necessary server->client communication, socket can be removed. (server-socket.js, client-socket.js)
- Else, 

## Avoid changes to files:

```
client/src/index.js
client/src/utilities.js
client/src/client-socket.js
server/validator.js
server/server-socket.js
.babelrc
.npmrc
.prettierrc
package-lock.json
webpack.config.js
```



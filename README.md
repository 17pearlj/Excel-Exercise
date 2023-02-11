# Excel exercise:

<img width="600" alt="screen2" src="https://user-images.githubusercontent.com/18289791/218274703-70f800de-3997-4616-9a0e-a352d97aef89.png">

Forked from 2022 Entry in MIT's Weblab Winter Competition.

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



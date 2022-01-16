# How to code a webapp with this skeleton

## Initial setup

Requirements
  - NodeJS version 16. If it is installed correctly, typing "node --version" should give v16.13.1 and "npm --version" should give 8.1.2

Helpful Links:
mongodb setup: https://docs.google.com/presentation/d/1augiH6P3wBXoTcM2HidDC7paPPkdmep1a28ZV7VnxaM/edit?usp=sharing
changing client id: https://docs.google.com/presentation/d/1AtpdVt3i0XagF9rNwtLoP-UV8DX38ZtEBO3ED2MNZdM/edit?usp=sharing
web-building help: https://docs.google.com/document/d/1R_SxRirzaWk42CzhP0Jch9h0yV68Odte16fbjm7uKgE/edit?usp=sharing

## To change in the skeleton

- Change the Frontend CLIENT_ID (Skeleton.js)
- Change the Server CLIENT_ID to the same CLIENT_ID (auth.js) 
- Change the Database SRV (mongoConnectionURL) for Atlas (server.js). Replace <password> and <dbname> (should be no < or > in your SRV)
- Change the Database Name for MongoDB to whatever you put in the SRV to replace <dbname> (server.js)
- (Optional) Add favicon to your website at the path client/dist/favicon.ico
- (Optional) Update website title in client/dist/index.html
- (Optional) Update README file
- (Optional) Update the package.json file with your site name (line 2)
  
## How to run this skeleton
First, 'npm install'
Then open two seperate terminals, and 'npm run hotloader' in the first, and 'npm start' in the second.
Then open http://localhost:5000

## Socket stuff
- If you're not using realtime updating or don't need server->client communication, you can remove socket entirely! (server-socket.js, client-socket.js, and anything that imports them)
- If you are using sockets, consider what you want to do with the FIXME in server-socket.js

## Edit at your own risk

the following files do not necessarily need to be edited. 

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



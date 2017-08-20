// Library Imports
var collabServer = require('./server.js');

var port = process.env.PORT || 8080;

// Start the collab server at defined port
collabServer.start(port);


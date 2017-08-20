
var utils = require('./lib/utils.js');
var db = require('./lib/db.js');

var cookieParser = require('cookie-parser');
var express = require('express'), app = express();
var stylus = require('stylus');
var session = require('express-session');
var bodyParser = require('body-parser');

var fs = require('fs');
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);
var jade = require('jade');

// Config
var userCount = 0;
var users = [];


module.exports = {



	start: function(port) {

		httpServer.listen(port, function () {
		  console.log('Server started and listening at port %d', port);
		  //fs.writeFile(__dirname + '/logs/start.log', 'started'); // TODO: verify if this is writing in the correct location
		});

		// Routing
		app.use(express.static(__dirname));

		app.use(bodyParser.json()); // support json encoded bodies
		app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

		// Views Options

		app.set('views', __dirname + '/views');

		app.set('view engine', 'jade');
		//app.use(express.logger('dev'));

		app.set("view options", { layout: false });
		app.use(stylus.middleware(
		  { src: __dirname + '/public'
			  , compile: utils.compile
		  }
		));

		app.use(cookieParser());
		app.use(express.static(__dirname + '/public'));

		// Render and send the main page
		app.get('/login', function(req, res) {
		  
			console.log("/ - login");
			res.render('login.jade', 
				{ 
					title: "Collab",
					page: "login"
				}
			);
		  
		});

		app.post('/login', function(req, res) {
			console.log("/ - login (POST)");

			
		});


		app.get('/chat', function(req, res){
		  
			console.log("/ - Chat");
			res.render('chatuser.jade', 
				{ 
					title: "Collab",
					page: "chatuser"
				}
			);
		  
		});




		// Create client event handlers
		io.on('connection', function (socket) {
			// when the client emits 'login', this listens and executes
			socket.on('login', function (username) {
				/*if (addedUser) return;

				// we store the username in the socket session for this client
				socket.username = username;
				++numUsers;
				addedUser = true;
				socket.emit('login', {
				  numUsers: numUsers
				});
				// echo globally (all clients) that a person has connected
				socket.broadcast.emit('user joined', {
				  username: socket.username,
				  numUsers: numUsers
				});*/

				if (db.isUserLoggedIn(username)) {
					// Not logged in, so log him in

					console.log(username + " logged in");

					users.push(username);
					userCount++;
					socket.username = username;

					socket.emit('login', {
						userCount : userCount
					});

					socket.broadcast.emit('user joined', {
						username: socket.username,
						userCount : userCount
					});

				} else {
					console.log(username + " is already logged in!");
				}
			});
		});

	}
}






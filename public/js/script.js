$(function() {
	var $window = $(window);
	var $usernameInput = $('.usernameInput');

	var socket = io();
	var username;

	var typing = false;
	var $currentInput = $usernameInput.focus();

	function loadApp() {
		console.log('App loaded');
	}

	function isLoggedIn() {
		return false;
	}

	function login() {
		alert('logging you in');
		username = cleanInput($usernameInput.val().trim());
		socket.emit('login', username);
	}

	function showLobby() {
		
	}



	function cleanInput(input) {
		return $('<div/>').text(input).text();
	}

	$window.load(function(event) {
		loadApp();

	});


	$window.keydown(function (event) {
		// Auto-focus the current input when a key is typed
		if (!(event.ctrlKey || event.metaKey || event.altKey)) {
			$currentInput.focus();
		}
		// When the client hits ENTER on their keyboard
		if (event.which === 13) {
			if (isLoggedIn()) {
				
				//sendMessage();
				//socket.emit('stop typing');
				typing = false;
			} else {
				login();

			}
		}
	});


	socket.on('login', function (data) {
		connected = true;
		// Display the welcome message
		// var message = "Welcome to the Collab";
		showLobby();
		
	});


});




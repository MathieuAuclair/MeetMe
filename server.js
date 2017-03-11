var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);


//node js server setup

server.listen(process.env.PORT || 8080);
console.log("Server is running on localhost:8080\n*\n*\n*");

app.use(express.static("public"));

//fake database here

var users = [];

//object to store users

function user(n, e, p){
this.name = n,
this.email = e,
this.password = p,
this.bio,
this.friend
}

io.sockets.on('connection', function(socket){
	//connection
	console.log("new connection");
	console.log(socket.id);

	//disconnect
	socket.on('disconnect', function(data){
	console.log("connection released");
	});

	socket.on('createAccount', function(newName, newEmail, newPassword){
	var newUser =  new user(newName, newEmail, newPassword);
	if(newUser.name.length > 2)
		users.push(newUser);
	else
		io.sockets.emit('error', true);
	console.log(newUser);
	});

	socket.on('logInAccount', function(email, password){
	var currentUser;
	for(i = 0; i < users.length; i++){
		if(users[i].email == email)
			currentUser = users[i];
		}
	if(currentUser.password == password){
		console.log("connected user on account!");
		io.emit('loadHome', true, currentUser);
		}
	});
});





















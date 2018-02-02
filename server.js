var express = require('express');
//create app from express
var app = express()
//listen on port 3000
var port = 3000;
var server = app.listen(port);
//hosts and serves files in the "public folder"
//Note that this is good for hiding keys when you host server code
//as user cannot see anything outside of the folder

//static hosts static files, files that don't changeb
app.use(express.static("public"));
console.log("Running on port:"+ port )

//import socket
var socket = require("socket.io");
//creates a socket on this server
var io = socket(server);

//an event upon a user connecting. we can execute a given function
io.sockets.on("connection", newConnection);

//function is executed on every connection.
function newConnection(socket){
  console.log("new connection: " + socket.id);
  //listens for "mouse" emission from client,
  //and executes something if it does.
  socket.on("mouse", mouseMsg);
  //
  function mouseMsg(data){
  	socket.broadcast.emit("mouse",data);
  	//Line below emits to everyone connected, including
  	//the client. Not useful in this case.
  	//io.sockets.emit("mouse",data);
  	console.log(data);
  }
}

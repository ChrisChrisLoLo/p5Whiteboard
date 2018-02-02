var socket;

function setup() {
  	createCanvas(800,600);
  	background(51);
  	//open a socket to connect to the server
  	socket = io.connect("http://localhost:3000")
  	socket.on('mouse',newDrawing);
}

function newDrawing(data){
	noStroke();
	fill(255);
	ellipse(data.x, data.y, 36, 36);
}

function mouseDragged(){
	//create a JSON file to emit through our socket
	//emits with a key name
	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit("mouse",data);

  	noStroke();
  	fill(255);
  	ellipse(mouseX,mouseY,60,60);
}

function draw(){

}

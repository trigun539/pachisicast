var GAME_TITLE = 'Pachisicast'; 
var FPS = 30;
var WIDTH = 700;
var HEIGHT = 700;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

setInterval(function() {
	update();
	draw();
}, 1000/FPS);

var textX = 50;
var textY = 50;

function update() {
	textX = WIDTH/2 - 100;
	textY = 30;
}

function draw() {
	
	// Game Background
	ctx.fillStyle = "#149ACC";
	ctx.rect(0,0,1280,1024);
	ctx.stroke();
	ctx.fill();

	// Game Title
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(GAME_TITLE, textX, textY);

	/**
	 * SCORES
	 */

	// Player 1
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("1", 10, 10);

	// Player 2
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("2", 500, 10);

	// Player 3
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("3", 10, 500);

	// Player 4
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("4", 500, 500);


}
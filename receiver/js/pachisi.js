 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();


function initializeGame()
{
	gameBoard = new GameBoard('Pachisi-board.jpg', 700, 700);

	players[0] = new Player('bluepiece.png', 1);
	players[1] = new Player('greenpiece.png', 2);
	


	setInterval(function(){
		 
		players[0].pieces[0].moveForward(1);
		players[0].pieces[1].moveForward(2);
		players[1].pieces[0].moveForward(1);
		
		},1000);

}





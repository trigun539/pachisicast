 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();


function initializeGame()
{
	gameBoard = new GameBoard('Pachisi-board.jpg', 700, 700);

	var dynamicBoardHeight = $('#board').height();
	vc_reshapeGraphicsDiv();

	players[0] = new Player('bluepiece.png', 1, dynamicBoardHeight); 
	players[1] = new Player('bluepiece.png', 2, dynamicBoardHeight); 
	players[2] = new Player('bluepiece.png', 3, dynamicBoardHeight); 
	players[3] = new Player('bluepiece.png', 4, dynamicBoardHeight); 

    players[0].pieces[0].enterPlayArea();
    players[1].pieces[0].enterPlayArea();
    players[2].pieces[0].enterPlayArea();
    players[3].pieces[0].enterPlayArea();
    
    //players[0].pieces[0].setLocation(1);

	setInterval(function(){
		 
		players[0].pieces[0].moveForward(3); 
		
		players[1].pieces[0].moveForward(3); 
		
		players[2].pieces[0].moveForward(3); 
		
		players[3].pieces[0].moveForward(3); 
		
		},1500);

}





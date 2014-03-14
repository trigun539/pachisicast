 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();
var playingGame = false;
var dynamicBoardHeight;


function startGame()
{
	vc_playingGame();
	playingGame = true;
}

function backToLobby()
{
	vc_waitingPlayers();
	playingGame = false;
}

function joinGame(senderID, name, pieceSrc, positionNumber)
{
	if((!playingGame)&&(!senderIDexists(senderID) )&&(!positionUsed(positionNumber)))
	{
		players.push(new Player(pieceSrc, positionNumber, dynamicBoardHeight, name, senderID));
	}
}

function leaveGame(senderID)
{
	var splicer;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			splicer = i;
	}
	
	
	players[splicer].killme();   //remove the pieces from board;
	players.splice(splicer, 1);
}


function positionUsed(position)   //returns true if a player is in a home base position
{
	var returner = false;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].positionNum == position)
			returner = true;
			 
	}
	
	return returner;
}


function senderIDexists(id)   //returns true if the sender id has already joined
{
	var returner = false;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == id)
			returner = true;
			 
	}
	
	return returner;
}


function initializeGame()
{
	gameBoard = new GameBoard('Pachisi-board.jpg', 700, 700);
	dynamicBoardHeight = $('#board').height();
	
	
	vc_reshapeGraphicsDiv();
	vc_waitingPlayers()

	//players.push(new Player('bluepiece.png', 1, dynamicBoardHeight)); 
	//players.push(new Player('bluepiece.png', 2, dynamicBoardHeight)); 
	//players.push(new Player('bluepiece.png', 3, dynamicBoardHeight)); 
	//players[3] = new Player('bluepiece.png', 4, dynamicBoardHeight); 

    //players[0].pieces[0].enterPlayArea();
    //players[1].pieces[0].enterPlayArea();
    //players[2].pieces[0].enterPlayArea();
    //players[3].pieces[0].enterPlayArea();
    
    //players[0].pieces[0].setLocation(1);

	setInterval(function(){ 
		
		//players[0].pieces[0].moveForward(3); 
		
		},1500);

}





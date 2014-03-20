 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();
var playingGame = false;
var dynamicBoardHeight;
var currentPlayersTurn;


function startGame()
{
	vc_playingGame();
	playingGame = true;
	randomFirstTurn();
	
	vc_highlightPlayersTurn(players[currentPlayersTurn].positionNum);
}
 
 
function nextPlayersTurn(currentPosition)
{
	var newPosition;
	
	if(currentPosition == 1)
		newPosition = 2;
		
	else if(currentPosition == 2)
		newPosition = 4;
		
	else if(currentPosition == 3)
		newPosition = 1;
		
	else if(currentPosition == 4)
		newPosition = 3;
		
	var j = -1;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].positionNum  == newPosition)	
			j = i;
	}
	
	if(j == -1)   //if no players are in the next spot over
	{
		nextPlayersTurn(newPosition);
	}
	else
	{
		currentPlayersTurn = j;
		vc_highlightPlayersTurn(players[currentPlayersTurn].positionNum);
	}
	
}


function enterPiece(senderID, pieceNum)
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}
	
	if((playingGame)&&(currentPlayersTurn == j)&&(players[j].pieces[pieceNum].locationNum < 1))
	{
		players[j].pieces[pieceNum].enterPlayArea();
		nextPlayersTurn(players[currentPlayersTurn].positionNum);
	}
}


function movePiece(senderID, pieceNum, spaces)
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}
	
	if((playingGame)&&(currentPlayersTurn == j)&&(isValidMove(j,pieceNum,spaces) ))
	{
		players[j].pieces[pieceNum].moveForward(spaces);
		nextPlayersTurn(players[currentPlayersTurn].positionNum);
	}
	
}


function isValidMove(playerID, pieceNum, spaces)
{
	var returner = true;
	
	if(players[playerID].pieces[pieceNum].locationNum < 1)   //if at home base
		returner = false;
		
	return returner;
}


function backToLobby()
{
	vc_waitingPlayers();
	playingGame = false;
}


function randomFirstTurn()
{
	currentPlayersTurn = Math.floor((Math.random()*players.length));
}


function joinGame(senderID, name, pieceSrc, positionNumber)
{
	// $('#debugMan').html(senderID + name + pieceSrc + positionNumber);

	if((!playingGame)&&(!senderIDexists(senderID) )&&(!positionUsed(positionNumber)))
	{
		players.push(new Player(pieceSrc, positionNumber, dynamicBoardHeight, name, senderID));
		vc_showPlayerName(name, positionNumber, dynamicBoardHeight);
	}
}

function leaveGame(senderID)
{
	
	if(!playingGame)   //can only leave the game in the lobby
	{
		var splicer;
		
		for(var i=0; i<players.length; i++)
		{
			if(players[i].senderID == senderID)	
				splicer = i;
		}
		
		
		vc_hidePlayerName(players[splicer].positionNum);
		
		players[splicer].killme();   //remove the pieces from board;
		players.splice(splicer, 1);
	}
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





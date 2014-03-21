 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();
var playingGame = false;
var dynamicBoardHeight;
var currentPlayersTurn;
var waitingForRoll = false;

var dice = new Array();
dice[0] = 0;  //0 means inactive, otherwise 1 to 6
dice[1] = 0; 


function startGame()
{ 
	if(players.length > 1)
	{
		vc_playingGame();
		playingGame = true;
		waitingForRoll = true;
		randomFirstTurn();
		
		vc_highlightPlayersTurn(players[currentPlayersTurn].positionNum);
		announce_gameStarted();
	}
}
 
 
function nextPlayersTurn(currentPosition)
{
	var newPosition;
	waitingForRoll = true;
	
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


function rollDice(senderID)
{
	if(players[currentPlayersTurn].senderID == senderID)
	{
		dice[0] = Math.floor((Math.random()*6 + 1));
		dice[1] = Math.floor((Math.random()*6 + 1));
		
		vc_rollDice(dice[0], dice[1], currentPlayersTurn);
		
		waitingForRoll = false;
	}
}


function selectPieceDice(senderID, pieceID, diceNum)
{

	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}		
	
	
	var diceNumInt = parseInt(diceNum);
	var validDice = true;
	
	if((dice[0] == 0)&&( (diceNum == '3')||(diceNum == '1') ))
		validDice = false;
		
	if((dice[1] == 0)&&( (diceNum == '3')||(diceNum == '2') ))
		validDice = false;
		
	var spaces;	
		 
	if(diceNum == '3')
		spaces = dice[0] + dice[1];
		
	else if(diceNum == '2')
		spaces = dice[1];
		
	else if(diceNum == '1')
		spaces = dice[0];
		

	if(validDice)
	{
	
		if((players[j].pieces[pieceID].locationNum <= 0) && (spaces >= 5))  //if at home base, and rolled atleast 5 
		{
			enterPiece(senderID, pieceID, diceNum);
		}
		
		else if(players[j].pieces[pieceID].locationNum >= 1)
		{
			movePiece(senderID, pieceID, spaces, diceNum);
		}
			 
	}
}


function endTurn(senderID)
{
	
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}			
	
	if(currentPlayersTurn == j)
	{
		removeDice('3');
		nextPlayersTurn(players[currentPlayersTurn].positionNum);
	}
}


function enterPiece(senderID, pieceNum, diceNum)
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}
	
	if((playingGame)&&(currentPlayersTurn == j)&&(!waitingForRoll)&&(players[j].pieces[pieceNum].locationNum < 1))
	{
		players[j].pieces[pieceNum].enterPlayArea();
		removeDice(diceNum);
		
		if((dice[0] == 0)&&(dice[1] == 0))
			nextPlayersTurn(players[currentPlayersTurn].positionNum);
		 
	}
}


function movePiece(senderID, pieceNum, spaces, diceNum)
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == senderID)	
			j = i;
	}
	
	if((playingGame)&&(currentPlayersTurn == j)&&(!waitingForRoll)&&(isValidMove(j,pieceNum,spaces) ))
	{
		players[j].pieces[pieceNum].moveForward(spaces);
		removeDice(diceNum);
		
		if((dice[0] == 0)&&(dice[1] == 0))
			nextPlayersTurn(players[currentPlayersTurn].positionNum);
		
	}
	
}


function removeDice(diceNum)
{
	if(diceNum == '3')
	{
		dice[0] = 0;
		dice[1] = 0;
		$('#dice1b').css('display','none');
		$('#dice2b').css('display','none');
	}
	else if(diceNum == '2')
	{
		dice[1] = 0;
		$('#dice2b').css('display','none');
	}
	else if(diceNum == '1')
	{
		dice[0] = 0;
		$('#dice1b').css('display','none');
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





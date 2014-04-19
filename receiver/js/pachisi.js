 
var gameBoard; 
var gamePieces = new Array();
var players = new Array();
var playingGame = false;
var dynamicBoardHeight;
var currentPlayersTurn;
var waitingForRoll = false;
var rolledDoubles = false;

var dice = new Array();
dice[0] = 0;  //0 means inactive, otherwise 1 to 6
dice[1] = 0; 

function getPlayerIDFromSenderID(SenderID)  //gets the position in the players array [player id] from senderID [device id]
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].senderID == SenderID)	
			j = i;
	}		
	
	return j;
} 

function getPlayerIDfromBaseID(baseID)
{
	var j;
	
	for(var i=0; i<players.length; i++)
	{
		if(players[i].positionNum == baseID)	
			j = i;
	}		
	
	return j;
}
 
 
function resetScoreboard()
{
	for(var i=0; i<players.length; i++)
		players[i].setScore(0);
	
} 

 
function noPiecesInJail()
{
	var returner = true;
	
	for(i=0; i<4; i++)
	{
		if(players[currentPlayersTurn].pieces[i].positionNum < 1)
			returner = false;
	}
	
	return returner;
} 
 
function nextPlayersTurn(currentPosition)
{
	var newPosition;
	
	if((rolledDoubles)&&(!noPiecesInJail()))	
		newPosition = currentPosition;	
		
	else if((rolledDoubles)&&(noPiecesInJail()))		
		newPosition = currentPosition;	 //console.log('this function needs to be done later');
		
	if(rolledDoubles)
		rolledDoubles = false;  //so it doesn't carry over to the next call of this function	
		
	else
	{ 
		if(currentPosition == 1)
			newPosition = 2;
			
		else if(currentPosition == 2)
			newPosition = 4;
			
		else if(currentPosition == 3)
			newPosition = 1;
			
		else if(currentPosition == 4)
			newPosition = 3;
	}	

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
		waitingForRoll = true;
		currentPlayersTurn = j;
		vc_highlightPlayersTurn(players[currentPlayersTurn].positionNum); 
		players[currentPlayersTurn].resetPieceStatuses();
		
		try { announce_RollNeeded(players[currentPlayersTurn].senderID); }catch (e) {  }
	}
}
 
function releaseBarrier(locationNum)  //releases any barriers at this location
{
	for(var i=0; i<players.length; i++)
	{  
		for(j=0; j<4; j++)
		{      
			if(players[i].pieces[j].locationNum == locationNum)
				players[i].pieces[j].isBarrier = false;
		}	 
	}
} 

function checkForCollisions(locationNum, baseID, pieceID)
{

	if((locationNum == 22)&&(baseID != 2))	
		console.log('safe zone');
		
	else if((locationNum == 39)&&(baseID != 1))	
		console.log('safe zone');
		
	else if((locationNum == 56)&&(baseID != 3))	
		console.log('safe zone');
		
	else if((locationNum == 5)&&(baseID != 4))	
		console.log('safe zone');
		
	else if(locationNum == 77)  //this piece is done
	{
		var i = getPlayerIDfromBaseID(baseID);
		
		players[i].pieces[pieceID].atFinish = true;
		players[i].setScore( players[i].score + 1 );
		
		if(players[i].score == 4)
			alert('YOU WIN!!!!!');
	}	
		
	else
	{	

		for(var i=0; i<players.length; i++)
		{
			if(players[i].positionNum != baseID)
			{     
				for(j=0; j<4; j++)
				{      
					if(players[i].pieces[j].locationNum == locationNum)
						players[i].pieces[j].goToJail();
				}	
			}
			else
			{
				for(j=0; j<4; j++)
				{   
					//alert(players[i].pieces[j].locationNum + '-' + locationNum + '=' + pieceID + '-' + j);
					   
					if((players[i].pieces[j].locationNum == locationNum)&&(pieceID != j))  //if there is a barrier of pieces now
						players[i].makeBarrier(pieceID, j);
					
				}	
			}
		}	
	
	}	
}

function enterPiece(senderID, pieceNum, diceNum)
{
	var j = getPlayerIDFromSenderID(senderID);
	
	
	if(!playingGame)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  Not playing game');
	
	else if(currentPlayersTurn != j)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  Not your turn');
		
	else if(waitingForRoll)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  You need to roll first');
		
	else if( players[j].pieces[pieceNum].locationNum >= 1 )
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  This piece can not be entered into play, it is already in play.');
	
	else
	{
		announce_SuccessFail(senderID, 1, 'Piece entered into play');
		
		players[j].pieces[pieceNum].enterPlayArea();
		removeDice(diceNum);
		
		if((dice[0] == 0)&&(dice[1] == 0))
		{
			nextPlayersTurn(players[currentPlayersTurn].positionNum);
		}
			
		 
	}
}

function movePiece(senderID, pieceNum, spaces, diceNum)
{
	var j = getPlayerIDFromSenderID(senderID);
	
	if(!playingGame)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  Not playing game');
	
	else if(currentPlayersTurn != j)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  Not your turn');
		
	else if(waitingForRoll)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  You need to roll first');
		
	else if(!isValidMove(j,pieceNum,spaces) )
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  This piece can not move there');
		
	else if(players[j].pieces[pieceNum].usedThisTurn)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  This piece has already been moved this turn');
		
	else if(players[j].pieces[pieceNum].atFinish)
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  This piece is at the finish and no longer in play');		
	
	else
	{
		announce_SuccessFail(senderID, 1, 'Piece Moved');
		
		releaseBarrier(players[j].pieces[pieceNum].locationNum);
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
		
		
		//check for barriers \/
	var spacesleft = spaces;	
	var currentpos = players[playerID].pieces[pieceNum].locationNum;
	
	while(spacesleft > 0)
	{
		spacesleft --;
		currentpos++;
		
		if((players[playerID].baseID == 1)&&(currentpos == 35))  //entering finishing area 
			spacesleft = 0;

		else if((players[playerID].baseID == 2)&&(currentpos == 18))  //entering finishing area
			spacesleft = 0;
			
		else if((players[playerID].baseID == 3)&&(currentpos == 52))  //entering finishing area
			spacesleft = 0;
		
		else if((players[playerID].baseID == 4)&&(currentpos == 69))  //entering finishing area
			spacesleft = 0;
		
		else
		{
			if(currentpos == 69)
				currentpos = 1;

			if(isBarrierHere(currentpos))
				returner = false;
		} 
	}
		
	return returner;
}

function isBarrierHere(locationNum)  //returns the ID of the player at this location [if any], otherwise false
{
	var returner = false; 
	
	for(var i=0; i<players.length; i++)
	{
		for(var j=0; j<4; j++)
		{
			if((players[i].pieces[j].isBarrier)&&(players[i].pieces[j].locationNum == locationNum))
				returner = true;
				 
		} 
	}		
	
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
	vc_waitingPlayers();

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
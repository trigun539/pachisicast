
//####  OUTGOING ############

function announce_SuccessFail(senderID, _isSuccess, _message)
{   
	var data = {action:'successFail', isSuccess:_isSuccess, message:_message}; 
	Pachisi.toSender(senderID, data);
} 


function announce_gameStarted()
{ 
      Pachisi.broadcast({action: 'started'});
}


function announce_RollNeeded(senderId)
{
      Pachisi.toSender(senderId, {action: 'roll'});
}


function announce_RollResult(senderId, dice1, dice2)
{
      Pachisi.toSender(senderId, {action: 'rollResult', dice1: dice1, dice2: dice2});
}
    




function debug(msg)
{
	$('#debugMan').append(msg);
}



//#### INCOMING ##############

function endTurn(senderID)
{
	var j = getPlayerIDFromSenderID(senderID);	
	
	
	if(currentPlayersTurn != j)
		announce_SuccessFail(senderID, 0, 'EndTurn failed.  It isnt your turn');
	
	else
	{
		announce_SuccessFail(senderID, 1, 'Ended Turn');
		removeDice('3');
		nextPlayersTurn(players[currentPlayersTurn].positionNum);
	}
}

function joinGame(senderID, name, pieceSrc, positionNumber)
{
 
	if(playingGame)
		announce_SuccessFail(senderID, 0, 'JoinGame failed.  Game has started already');
		
	else if( senderIDexists(senderID) )
		announce_SuccessFail(senderID, 0, 'JoinGame failed.  Your sender ID is already in the game');
		
	else if( positionUsed(positionNumber) )
		announce_SuccessFail(senderID, 0, 'JoinGame failed.  This position is taken already');

	else
	{ 
		announce_SuccessFail(senderID, 1, 'Joined Game'); 
		
		players.push(new Player(pieceSrc, positionNumber, dynamicBoardHeight, name, senderID));
		vc_showPlayerName(name, positionNumber, dynamicBoardHeight);
	}
}

function leaveGame(senderID)
{
	
	announce_SuccessFail(senderID, 1, 'Left Game');
	
	if(players[currentPlayersTurn].senderID == senderID) 
		endTurn(senderID);	 
		
	 
	var splicer = getPlayerIDFromSenderID(senderID);
	
	
	vc_hidePlayerName(players[splicer].positionNum);
	
	players[splicer].killme();   //remove the pieces from board;
	players.splice(splicer, 1); 
	
	if(currentPlayersTurn == players.length)
		currentPlayersTurn--;     //-----###bandaid fix, may improve later
}

function rollDice(senderID)
{
	if(players[currentPlayersTurn].senderID != senderID)
		announce_SuccessFail(senderID, 0, 'RollDice fail.  It isnt your turn');
		
	else if(!waitingForRoll)
		announce_SuccessFail(senderID, 0, 'RollDice fail.  You have already rolled the dice');
	
	else
	{
		announce_SuccessFail(senderID, 1, 'Dice Rolled');
		
		dice[0] = Math.floor((Math.random()*6 + 1));
		dice[1] = Math.floor((Math.random()*6 + 1));
		
		rolledDoubles = (dice[0] == dice[1])? true:false;
		
		vc_rollDice(dice[0], dice[1], currentPlayersTurn);
		
		try { announce_RollResult(players[currentPlayersTurn].senderID, dice[0], dice[1]); }catch (e) {  }
		waitingForRoll = false;
	}
}

function selectPieceDice(senderID, pieceID, diceNum)
{	  
	var j = getPlayerIDFromSenderID(senderID);
	
	
	var diceNumInt = parseInt(diceNum);
	var validDice = true;
	
	if((dice[0] == 0)&&( (diceNum == '3')||(diceNum == '1') ))
		validDice = false;
		
	if((dice[1] == 0)&&( (diceNum == '3')||(diceNum == '2') ))
		validDice = false;
		 
	var spaces;	
		 debug('m7m');
	if(diceNum == '3')
		spaces = dice[0] + dice[1];
		
	else if(diceNum == '2')
		spaces = dice[1];
		
	else if(diceNum == '1')
		spaces = dice[0];
		 
	if(!validDice)
	{    
		announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  One or more of the dice selected is not available to use');
	}

	else
	{  
		
		if((players[j].pieces[pieceID].locationNum <= 0) && (spaces >= 5))  //if at home base, and rolled atleast 5 
		{ debug('m1m');
			enterPiece(senderID, pieceID, diceNum);  //successfail inside that function
		}
		
		else if(players[j].pieces[pieceID].locationNum >= 1)
		{  debug('m2m');
			movePiece(senderID, pieceID, spaces, diceNum);  //successfail in that function
		}
		
		else if((players[j].pieces[pieceID].locationNum <= 0) && (spaces < 5))
		{  debug('m3m');
			announce_SuccessFail(senderID, 0, 'SelectPieceDice fail.  To enter a piece, you must use dice equal to atleast 5');
		}
			debug('m4m'); 
	}
}

function startGame(senderID)
{ 
	if(players.length < 2)
		announce_SuccessFail(senderID, 0, 'StartGame fail.  Requires atleast 2 players to start');
	
	else if(playingGame)
		announce_SuccessFail(senderID, 0, 'StartGame fail.  Game already started');
	
	else
	{
		announce_SuccessFail(senderID, 1, 'Game Started'); 
		vc_playingGame();
		playingGame = true;
		waitingForRoll = true;	
		randomFirstTurn();
		try { announce_RollNeeded(players[currentPlayersTurn].senderID); }catch (e) {  }
		
		vc_highlightPlayersTurn(players[currentPlayersTurn].positionNum);
		announce_gameStarted(); 
		resetScoreboard();
	}
}
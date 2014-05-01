// App object
var Pachisicast = {}; 
Pachisicast.actionPending = '';   //the action pending, if empty string, there is no pending action


$(document).ready(function(document){

	Pachisicast.switchView('#intro'); 
	

	$('#goToSettings').click(function(e){
		
		Pachisicast.switchView('#settings'); 
	});

	// Add Event Listeners
	$('#joinGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		
		Pachisicast.waitForAction('join'); 
		Pachisicast.joinGame(playerName, playerPosition, images[Number(playerPosition) - 1]);

	});
	
	$('#selectPieceDice').click(function(e){
		 
		var dice, piece; 
		 
		if(( $('#dice1:checked').length > 0) && ($('#dice2:checked').length > 0 ))
			dice = '3';
			
		else if( $('#dice1:checked').length > 0)
			dice = '1';
			
		else if($('#dice2:checked').length > 0) 
			dice = '2';
			
		
		if( $('#piece0:checked').length > 0)
			piece = 0;
			
		else if( $('#piece1:checked').length > 0)
			piece = 1;
			
		else if( $('#piece2:checked').length > 0)
			piece = 2;
			
		else if( $('#piece3:checked').length > 0)
			piece = 3;						
			
		Pachisicast.waitForAction('selectPieceDice'); 	
		Pachisicast.selectPieceDice(piece,dice);
	});
	

	$('#leaveGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		Pachisicast.leaveGame(playerName, playerPosition, images[Number(playerPosition) - 1]);

	});

	$('#startGame').click(function(e){
		
		Pachisicast.waitForAction('start'); 
		Pachisicast.startGame();
	});

	$('#roll').click(function(e){
		
		Pachisicast.waitForAction('roll'); 
		Pachisicast.rollDice();
	});

});


//##### INCOMING MESSAGES FROM MAIN.JS AND FROM RECEIVER

Pachisicast.parseSuccessFail = function(msg)
{
	if(msg.isSuccess == 0)  //fail
	{
		alert(msg.message);
		$('#loader').css('display','none');
	}
	else   //success
	{
		
		switch(Pachisicast.actionPending)
		{
			case 'join':
				Pachisicast.switchView('#settingsWaiting');
				break;
			case 'start':
				console.log('Game starting...');
				break;
			case 'roll':
				console.log('Rolling...');
				break;
			case 'selectPieceDice':
				Pachisicast.hideUsedItems();
				break;
			default:
				console.log('dont recognize' + Pachisicast.actionPending); 
		}
		
		
		Pachisicast.actionPending = '';
		$('#loader').css('display','none');
		
	}
	 
} 



Pachisicast.gameStarted = function(){
	
	Pachisicast.switchView('#inGame'); 
}


Pachisicast.yourTurnToRoll = function(){
	
	$('#rollBox').css('display','block');
}


Pachisicast.showRollResult = function(msg){
	
	$('#rollBox').css('display','none');
	$('#rollResultBox').css('display','block');
	$('#dice1text').html(msg.dice1);
	$('#dice2text').html(msg.dice2);
}






// ### OTHER FUNCTIONS

Pachisicast.hideUsedItems = function()
{
	if( $('#dice1:checked').length > 0)
		$('#dice1').css('display','none');
		
	if( $('#dice2:checked').length > 0)
		$('#dice2').css('display','none');
	
	if( $('#piece0:checked').length > 0)	
		$('#piece0').css('display','none');
		
	if( $('#piece1:checked').length > 0)	
		$('#piece1').css('display','none');
		
	if( $('#piece2:checked').length > 0)	
		$('#piece2').css('display','none');
		
	if( $('#piece3:checked').length > 0)	
		$('#piece3').css('display','none');				
}


Pachisicast.waitForAction = function(actionName)
{
	$('#loader').css('display','block');
	
	Pachisicast.actionPending = actionName;
}


Pachisicast.switchView = function(div)
{
	$('#settings').css('display','none'); 
	$('#inGame').css('display','none');
	$('#intro').css('display','none');
	$('#loader').css('display','none');
	$('#settingsWaiting').css('display','none');
	
	$(div).css('display','block');
}






// Connect to Pachisicast
Pachisicast.joinGame = function(playerName, playerPosition, playerImg){
	sendMessage({
		action: 'join',
		data: {
			name: playerName,
			position: playerPosition,
			img: playerImg
		}
	});
};

Pachisicast.leaveGame = function(playerName, playerPosition, playerImg){
	sendMessage({
		action: 'leave',
		data: {
			name: playerName,
			position: playerPosition,
			img: playerImg
		}
	});
}

Pachisicast.startGame = function(){
	sendMessage({
		action: 'start'
	});
};

Pachisicast.selectPieceDice = function(pieceID, diceNum){
	sendMessage({
		action: 'move',
		data: {
			pieceID: pieceID,
			diceNum: diceNum
		}
	});
};

Pachisicast.rollDice = function(){
	sendMessage({
		action: 'roll'
	});
};

Pachisicast.myTurn = function(){
	console.log("It's my turn!");
}



// announce_RollNeeded(senderID);


// announce_RollResult(senderID, roll1, roll2);
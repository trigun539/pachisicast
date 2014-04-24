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

	$('#leaveGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		Pachisicast.leaveGame(playerName, playerPosition, images[Number(playerPosition) - 1]);

	});

	$('#startGame').click(function(e){
		Pachisicast.startGame();
	});

	$('#roll').click(function(e){
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
				console.log('joined game'); 
				break;
			default:
				console.log('dont recognize' + Pachisicast.actionPending); 
		}
		
		
		Pachisicast.actionPending = '';
		$('#loader').css('display','none');
		
	}
	 
} 



Pachisicast.gameStarted = function(){
	
	Pachisicast.hideViews();
	$('#inGame').css('display','block');
}








// ### OTHER FUNCTIONS

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
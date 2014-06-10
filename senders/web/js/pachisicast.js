// App object
var Pachisicast = {};  

$(document).ready(function(document){

	Pachisicast.switchView('#intro'); 
	
	$('#pass').click(function(e){ 
		Pachisicast.pass();
	});

	$('#goToSettings').click(function(e){
		
		Pachisicast.switchView('#settings'); 
	});

	// Add Event Listeners
	$('#joinGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		 
		Pachisicast.joinGame(playerName, playerPosition, images[Number(playerPosition) - 1]);

	});
	
	$('#selectPieceDice').click(function(e){
		 
		var dice, piece, valid;
		var valid = true; 
		 
		if(( $('#dice1:checked').length > 0) && ($('#dice2:checked').length > 0 ))
			dice = '3';
			
		else if( $('#dice1:checked').length > 0)
			dice = '1';
			
		else if($('#dice2:checked').length > 0) 
			dice = '2';

		else
			valid = false;

		
		if( $('#piece0:checked').length > 0)
			piece = 0;
			
		else if( $('#piece1:checked').length > 0)
			piece = 1;
			
		else if( $('#piece2:checked').length > 0)
			piece = 2;
			
		else if( $('#piece3:checked').length > 0)
			piece = 3;		
	
		else
			valid = false;

						
		if(valid)	 	
			Pachisicast.selectPieceDice(piece,dice);

		else
			alert('invalid inputs');
	});
	

	$('#leaveGame').click(function(e){  
		Pachisicast.leaveGame(); 
	});
	
	$('#leaveGame2').click(function(e){  
		Pachisicast.leaveGame(); 
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
		
		switch(msg.actionType)
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
			case 'pass':
				Pachisicast.notYourTurn();
				break;
			case 'leave':	
				Pachisicast.switchView('#settings');
				break;
			default:
				console.log('dont recognize ' + msg.actionType); 
		}
		
		
		Pachisicast.actionPending = '';
		$('#loader').css('display','none');
		
	}
	 
} 



Pachisicast.gameStarted = function(){
	
	if($('#rollBox').css('display') != 'block')   //if ROLL trigger hit before this one, ignore this one
		Pachisicast.switchView('#notYourTurn'); 
	
}


Pachisicast.notYourTurn = function(){
	Pachisicast.switchView('#notYourTurn'); 
}

Pachisicast.yourTurnToRoll = function(){
	  
	Pachisicast.switchView('#rollBox'); 
}


Pachisicast.showRollResult = function(msg){
	
	
	Pachisicast.switchView('#rollResultBox'); 
	
	$('#dice1text').html(msg.dice1);
	$('#dice2text').html(msg.dice2);
	
	
	//resetting the UI for this page
	$('#dice1').css('display','block');
	$('#dice2').css('display','block');
	$('#piece0').css('display','block');
	$('#piece1').css('display','block');
	$('#piece2').css('display','block');
	$('#piece3').css('display','block');
	$('#dice1').prop('checked', false);
	$('#dice2').prop('checked', false);
	$('#piece0').prop('checked', false);
	$('#piece1').prop('checked', false);
	$('#piece2').prop('checked', false);
	$('#piece3').prop('checked', false);
}






// ### OTHER FUNCTIONS

Pachisicast.hideUsedItems = function()
{
	if( $('#dice1:checked').length > 0)
	{
		$('#dice1').css('display','none');
		$('#dice1').prop('checked', false);
	}
		
	if( $('#dice2:checked').length > 0)
	{
		$('#dice2').css('display','none');
		$('#dice2').prop('checked', false);
	}
	
	if( $('#piece0:checked').length > 0)	
	{
		$('#piece0').css('display','none');
		$('#piece0').prop('checked', false);
	}
		
	if( $('#piece1:checked').length > 0)	
	{
		$('#piece1').css('display','none');
		$('#piece1').prop('checked', false);
	}
			
	if( $('#piece2:checked').length > 0)
	{	
		$('#piece2').css('display','none');
		$('#piece2').prop('checked', false);
	}
		
	if( $('#piece3:checked').length > 0)	
	{
		$('#piece3').css('display','none');	
		$('#piece3').prop('checked', false);
	}	
		
	if(( $('#dice2').css('display') == 'none') && ($('#dice1').css('display') == 'none'))  //used both dice, end turn
		Pachisicast.switchView('#notYourTurn');			
}


Pachisicast.showLoader = function()
{
	$('#loader').css('display','block'); 
}


Pachisicast.switchView = function(div)
{
	$('#settings').css('display','none'); 
	$('#inGame').css('display','none');
	$('#intro').css('display','none');
	$('#loader').css('display','none');
	$('#settingsWaiting').css('display','none');
	
	$('#notYourTurn').css('display','none'); 
	$('#rollBox').css('display','none');
	$('#rollResultBox').css('display','none');
	
	$(div).css('display','block');
	
	if((div == '#notYourTurn')||(div == '#rollBox')||(div == '#rollResultBox'))
		$('#inGame').css('display','block');
		
	
}




//###### OUTGOING FUNCTIONS

// Connect to Pachisicast
Pachisicast.joinGame = function(playerName, playerPosition, playerImg){
	
	Pachisicast.showLoader();
	 
	sendMessage({
		action: 'join',
		data: {
			name: playerName,
			position: playerPosition,
			img: playerImg
		}
	});
};

Pachisicast.pass = function(){
	
	Pachisicast.showLoader();
	
	sendMessage({
		action: 'pass'
	});
}

Pachisicast.leaveGame = function(){
	
	Pachisicast.showLoader();
	
	sendMessage({
		action: 'leave', 
	});
}

Pachisicast.startGame = function(){
	
	Pachisicast.showLoader();
	
	sendMessage({
		action: 'start'
	});
};

Pachisicast.selectPieceDice = function(pieceID, diceNum){
	
	Pachisicast.showLoader();
	
	sendMessage({
		action: 'move',
		data: {
			pieceID: pieceID,
			diceNum: diceNum
		}
	});
};

Pachisicast.rollDice = function(){
	
	Pachisicast.showLoader();
	
	sendMessage({
		action: 'roll'
	});
};
 


// announce_RollNeeded(senderID);


// announce_RollResult(senderID, roll1, roll2);
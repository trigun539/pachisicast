// App object
var Pachisicast = {};

$(document).ready(function(document){

	// Add Event Listeners
	$('#joinGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
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
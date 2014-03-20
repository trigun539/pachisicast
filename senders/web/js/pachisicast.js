// App object
var Pachisicast = {};

$(document).ready(function(document){

	// Add Event Listeners
	$('#joinGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		Pachisicast.joinGame('join', playerName, playerPosition, images[Number(playerPosition) - 1]);

	});

	$('#leaveGame').click(function(e){
		var playerName = $('#name').val();
		var playerPosition = $('#position').val();
		var images = ['greenpiece.png', 'bluepiece.png', 'redpiece.png', 'yellowpiece.png'];
		
		Pachisicast.joinGame('leave', playerName, playerPosition, images[Number(playerPosition) - 1]);

	});

});

// Connect to Pachisicast
Pachisicast.joinGame = function(action, playerName, playerPosition, playerImg){
	sendMessage({
		action: action,
		data: {
			name: playerName,
			position: playerPosition,
			img: playerImg
		}
	});
}
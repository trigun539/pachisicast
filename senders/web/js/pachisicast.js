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
}
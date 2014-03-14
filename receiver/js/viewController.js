

function vc_reshapeGraphicsDiv()   //needs to be sized the same as the board
{
	var boardHeight = $('#board').height();
	
	$('#gameGraphics').css('height',boardHeight);
	$('#gameGraphics').css('width',boardHeight);  //because the board is square
	$('#gameGraphics').css('margin-top', (boardHeight*-1));  //negative board height
	
}



function vc_playingGame()   //hides the lobby screen
{
	$('#lobbyMessage').animate(
							  { 'left': '105%', 
							  }, 1500, 'easeInOutQuad');	
	 
}


function vc_waitingPlayers()   //shows the lobby screen
{
	$('#lobbyMessage').css('display','block');
	
		$('#lobbyMessage').animate(
							  { 'left': '30%', 
							  }, 1500, 'easeInOutQuad');
							  
							  
}

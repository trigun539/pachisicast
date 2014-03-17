

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



function vc_showPlayerName(name, positionNumber, dynBoardHeight)   //shows the name on the board
{ 
	$('#p' + positionNumber + 'name').html(name);
	
	var dynamicFontSize = dynBoardHeight/33;
	$('#p' + positionNumber + 'name').css('font-size',dynamicFontSize + 'px'); 

}

function vc_hidePlayerName(positionNumber)
{
	$('#p' + positionNumber + 'name').html('');
}


function vc_highlightPlayersTurn(positionNumber)    //highlights the player whose turn it is now
{
	$('#p' + positionNumber + 'name').css('color','yellow');
	
	if(positionNumber != 1)
		$('#p1name').css('color','#eeeeee');
		
	if(positionNumber != 2)
		$('#p2name').css('color','#eeeeee');
		
	if(positionNumber != 3)
		$('#p3name').css('color','#eeeeee');
		
	if(positionNumber != 4)
		$('#p4name').css('color','#eeeeee');			
			
}

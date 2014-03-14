

function vc_reshapeGraphicsDiv()   //needs to be sized the same as the board
{
	var boardHeight = $('#board').height();
	
	$('#gameGraphics').css('height',boardHeight);
	$('#gameGraphics').css('width',boardHeight);  //because the board is square
	$('#gameGraphics').css('margin-top', (boardHeight*-1));  //negative board height
	
}

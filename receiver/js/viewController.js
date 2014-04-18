

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

 
function vc_showScore(positionNum, Score, dynBoardHeight)  
{
	$('#p' + positionNum + 'score').html(Score);
	
	var dynamicFontSize = dynBoardHeight/20;
	$('#p' + positionNum + 'score').css('font-size',dynamicFontSize + 'px'); 	
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


function vc_rollDice(number1, number2, position)
{
	if(position == 0)
	{
		$('#dice1').css('top','0%');
		$('#dice1').css('right','100%');
		$('#dice2').css('top','10%');
		$('#dice2').css('right','100%');
	}
	else if(position == 1)
	{
		$('#dice1').css('top','0%');
		$('#dice1').css('right','0%');
		$('#dice2').css('top','10%');
		$('#dice2').css('right','0%');		
	}
	else if(position == 2)
	{
		$('#dice1').css('top','100%');
		$('#dice1').css('right','100%');
		$('#dice2').css('top','90%');
		$('#dice2').css('right','100%');			
	}
	else if(position == 3)
	{
		$('#dice1').css('top','100%');
		$('#dice1').css('right','0%');
		$('#dice2').css('top','90%');
		$('#dice2').css('right','0%');			
	}		 
	
	$('#dice1b').css('display','none'); 
	$('#dice1').css('display','block');
	$('#dice1b').attr('src','img/dice' + number1 + '.png');
	
	$('#dice2b').css('display','none'); 
	$('#dice2').css('display','block');
	$('#dice2').attr('src','img/dice_rotate.gif');   //we set the src value again so it desyncs frmo the other one
	$('#dice2b').attr('src','img/dice' + number2 + '.png');
	
	setTimeout( function(){ 
			$('#dice1b').css('display','block');
			$('#dice1').css('display','none');
		}  , 800);		
	
		$('#dice1').animate(
							  { 'top': '44%', 'right':'49%' 
							  }, 800, 'easeOutCubic');
							  
	setTimeout( function(){ 
		$('#dice2b').css('display','block');
		$('#dice2').css('display','none');
	}  , 900);							  
							  
							  
	setTimeout( function(){ 
			
		$('#dice2').animate(
							  { 'top': '50%', 'right':'45%' 
							  }, 800, 'easeOutCubic');
		}  , 100);						  
					   
}

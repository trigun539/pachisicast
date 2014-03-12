

function vc_displayGameBoard()
{
  var imageObj = new Image();

  imageObj.onload = function() {
    context.drawImage(imageObj, 0, 0, gameBoard.width, gameBoard.height);
  };
  imageObj.src = 'img/' + gameBoard.source;	
	
	
}



function vc_displayPieces()
{
	
	
	
	
	
	var images = new Array();
	
	for(i=0; i<gamePieces.length; i++)
	{ 
		  images[i] = new Image();
		  images[i].setX = gamePieces[i].x;
		  images[i].setY = gamePieces[i].y;
		  
		  images[i].onload = function() {
		    context.drawImage(this, this.setX, this.setY);
		  };
		  images[i].src = 'img/' + gamePieces[i].imgsrc;	
	}
	
}



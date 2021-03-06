function GameBoard(Source, Width, Height) {
    this.source = Source;
    this.width = Width;
    this.height = Height;

    this.drawme = function()
    {
    	$('#board').attr('src','img/' + this.source);
    }
    
    this.drawme();
}

function Player(PieceSrc, PositionNumber, BoardHeight, PlayerName, SenderID) {
	this.positionNum = PositionNumber; 
	this.boardHeight = BoardHeight;
	this.senderID = SenderID;
	this.pieceSrc = PieceSrc;
	this.playerName = PlayerName;
	this.pieces = new Array();
	this.score = 0;
	
	
	this.setScore = function(Score)
	{
		this.score = Score;
		vc_showScore(this.positionNum, Score, this.boardHeight);
		
	}
	
	this.resetPieceStatuses = function()
	{
		for(i=0; i<4; i++)
		{
			this.pieces[i].usedThisTurn = false;
		}
	}
	
	this.makeBarrier = function(pieceID1, pieceID2)
	{   
		this.pieces[pieceID1].makeBarrier(true);
		this.pieces[pieceID2].makeBarrier(false);
	}
	
	this.killme = function()
	{
		this.pieces[0].removeme();
		this.pieces[1].removeme();
		this.pieces[2].removeme();
		this.pieces[3].removeme();
	}
	
	this.initialize = function()
	{
		if(this.positionNum == 1)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc.replace(".png", "1.png"), -3, 0, this.positionNum, BoardHeight);
			this.pieces[1] = new GamePiece(this.pieceSrc.replace(".png", "2.png"), -2, 1, this.positionNum, BoardHeight);
			this.pieces[2] = new GamePiece(this.pieceSrc.replace(".png", "3.png"), -1, 2, this.positionNum, BoardHeight);
			this.pieces[3] = new GamePiece(this.pieceSrc.replace(".png", "4.png"), 0, 3, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 2)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc.replace(".png", "1.png"), -3, 0, this.positionNum, BoardHeight);
			this.pieces[1] = new GamePiece(this.pieceSrc.replace(".png", "2.png"), -2, 1, this.positionNum, BoardHeight);
			this.pieces[2] = new GamePiece(this.pieceSrc.replace(".png", "3.png"), -1, 2, this.positionNum, BoardHeight);
			this.pieces[3] = new GamePiece(this.pieceSrc.replace(".png", "4.png"), 0, 3, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 3)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc.replace(".png", "1.png"), -3, 0, this.positionNum, BoardHeight);
			this.pieces[1] = new GamePiece(this.pieceSrc.replace(".png", "2.png"), -2, 1, this.positionNum, BoardHeight);
			this.pieces[2] = new GamePiece(this.pieceSrc.replace(".png", "3.png"), -1, 2, this.positionNum, BoardHeight);
			this.pieces[3] = new GamePiece(this.pieceSrc.replace(".png", "4.png"), 0, 3, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 4)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc.replace(".png", "1.png"), -3, 0, this.positionNum, BoardHeight);
			this.pieces[1] = new GamePiece(this.pieceSrc.replace(".png", "2.png"), -2, 1, this.positionNum, BoardHeight);
			this.pieces[2] = new GamePiece(this.pieceSrc.replace(".png", "3.png"), -1, 2, this.positionNum, BoardHeight);
			this.pieces[3] = new GamePiece(this.pieceSrc.replace(".png", "4.png"), 0, 3, this.positionNum, BoardHeight);
		}
		
	}
	
	this.initialize();
	
}



function GamePiece(ImgSrc, LocNum, Id, BaseID, BoardHeight)
{
	this.id = Id;
	this.baseID = BaseID;  //1 is top left, 2 is top right, 3 is bottom left, 4 is bottom right
	this.imgsrc = ImgSrc;
	this.locationNum;
	this.boardHeight = BoardHeight; // Could be a constant
	this.y=0;
	this.x=0;
	this.isBarrier = false; 
	this.usedThisTurn = false; 
	this.atFinish = false;   //if the piece is at the finish
	
	 
	this.makeBarrier = function(isLeftSide)
	{
		
		this.isBarrier = true; 
		
		var horizontal = true;
		
		if((this.locationNum >= 9)&&(this.locationNum <= 25))
			horizontal = false;
			
		if((this.locationNum >= 43)&&(this.locationNum <= 59))
			horizontal = false;
			
		if((horizontal)&&(isLeftSide))
			this.moveme(this.x - (this.boardHeight * .02), this.y);
			
		if((horizontal)&&(!isLeftSide))
			this.moveme(this.x + (this.boardHeight * .02), this.y);
			
		if((!horizontal)&&(isLeftSide))
			this.moveme(this.x, this.y - (this.boardHeight * .02));
			
		if((!horizontal)&&(!isLeftSide))
			this.moveme(this.x, this.y + (this.boardHeight * .02));			
			
	} 
	 
	 
	this.goToJail = function()
	{
		var newPos = this.id - 4;
		 
		this.setLocation(newPos); 
	} 
	 
	 
	this.removeme = function()
	{
		$("#player" + this.baseID + "piece" + this.id).remove();
		
	} 
	 
	this.drawme = function()
	{
		var elem = document.createElement("img");
		elem.setAttribute("src", "img/"+this.imgsrc);
		elem.setAttribute("style", "position:absolute; height:4%");
		elem.setAttribute("id", "player" + this.baseID + "piece" + this.id);
		document.getElementById("gameGraphics").appendChild(elem);
		
	} 
	
	this.moveme = function(newX, newY)
	{
		this.x = newX;
		this.y = newY;
		
		$('#player' + this.baseID + "piece" + this.id).animate(
						  { 'top': newY,
						    'left': newX, 
						  }, 400, 'swing');
		 
		//$('#player' + this.playerID + "piece" + this.id).css('top', this.y);
		//$('#player' + this.playerID + "piece" + this.id).css('left', this.x);
	}
	 
	this.moveForward = function(amount)
	{
 		this.usedThisTurn = true;
 		
 		
		var goingForward = true; 
		
		for(var i=0; i<amount; i++)
		{
		
			if(this.locationNum >= 1)  //must be in play area to move forward
			{
				
				if(this.locationNum == 77)  //if at the final finishing area spot, but still moving, go backwards
					goingForward = false;
					
				
				if(goingForward)
					var newLocation = this.locationNum += 1;
					
				else
					var newLocation = this.locationNum -= 1;
						 
				
				if((this.baseID == 1)&&(this.locationNum == 35))  //entering finishing area 
					newLocation = 70;

				else if((this.baseID == 2)&&(this.locationNum == 18))  //entering finishing area
					newLocation = 70;
					
				else if((this.baseID == 3)&&(this.locationNum == 52))  //entering finishing area
					newLocation = 70;
				
				else if((this.baseID == 4)&&(this.locationNum == 69))  //entering finishing area
					newLocation = 70;
				
				
				if(newLocation == 69)  //looping around the board
					newLocation = 1;
					 
					
				this.setLocation(newLocation);
			}
			
		}
		  
		
		  
		setTimeout(checkForCollisions, (amount*400), this.locationNum, this.baseID, this.id);  //checks for collisions after the piece stops moving, which is 400ms times the number of spaces time after this
				
	} 
	 
	this.enterPlayArea = function()
	{
		if(this.baseID == 1)
		{
			this.setLocation(39);
		}
		else if(this.baseID == 2)
		{
			this.setLocation(22);
		}
		else if(this.baseID == 3)
		{
			this.setLocation(56);
		}
		else if(this.baseID == 4)
		{
			this.setLocation(5);
		}		
		
		this.moveForward(0);		
	} 
	 
	 
	this.setLocation = function(LocNum)
	{
		this.locationNum = LocNum;
		var newX, newY;
 

		if(LocNum <= 0)      //-3 to 0 = pieces at home base/jail    top left home base
		{
			if(this.baseID == 1)
			{
				newY = 100;
				newX = 100 + (LocNum+3)*20;
			}
			else if(this.baseID == 2)
			{
				newY = 100;
				newX = 520 + (LocNum+3)*20;
			}
			else if(this.baseID == 3)
			{
				newY = 600;
				newX = 100 + (LocNum+3)*20;
			}
			else if(this.baseID == 4)
			{
				newY = 600;
				newX = 520 + (LocNum+3)*20;
			}
		}

		else if(LocNum <= 8)
		{
			newX = 405;
			newY = 650 - (LocNum)*28.5;
			
		}
		else if(LocNum <= 16)
		{
			newY = 400;
			newX = 430 + (LocNum - 9)*28.5;
		}
		else if(LocNum == 17)
		{
			newX = 630;
			newY = 335;
		}
		else if(LocNum <= 25)
		{
			newY = 269;
			newX = 430 + (25 - LocNum)*28.5;
		}
		else if(LocNum <= 33)
		{
			newX = 405;
			newY = 51 + (33 - LocNum)*28.5;
		}
		else if(LocNum == 34)
		{
			newX = 345;
			newY = 51;
		}
		else if(LocNum <= 42)
		{
			newX = 279;
			newY = 51 + (LocNum - 35)*28.5;
		}
		else if(LocNum <= 50)
		{
			newY = 269;
			newX = 60 + (50 - LocNum)*28.5;
		}
		else if(LocNum == 51)
		{
			newY = 335;
			newX = 60;
		}
		else if(LocNum <= 59)
		{
			newY = 400;
			newX = 60 + (LocNum - 52)*28.5;
		}
		else if(LocNum <= 67)
		{
			newX = 279;
			newY = 423 + (LocNum - 60)*28.5;
		}
		else if(LocNum == 68)
		{
			newX = 345;
			newY = 623;
		}
		else if(LocNum <= 77)   //70 to 77 are finish area spots
		{
			if(this.baseID == 1)
			{
				newX = 345;
				newY = 51 + (LocNum - 69)*28.5;
			}
			else if(this.baseID == 2)
			{
				newY = 335;
				newX = 430 + (76 - LocNum)*28.5;
			}
			else if(this.baseID == 3)
			{
				newY = 335;
				newX = 60 + (LocNum - 69)*28.5;
			}
			else if(this.baseID == 4)
			{
				newX = 345;
				newY = 650 - (LocNum-68)*28.5;
			}
		}
		
		
		if(LocNum == 77)  //finished piece
		{
			if((this.baseID == 1)||(this.baseID == 4))  //horizontal placement
			{
				newX += (this.id-1.5)*28.5;
			}
			else  //vertical placement
			{
				newY += (this.id-1.5)*28.5;
			}
		}
 
		
		//-----#### now we will adjust the static numbers based on the game board height, to keep things percentage based 
		var zoomRatio = this.boardHeight/700;  //since the numbers were originally based on a board height of 700
		newX = newX * zoomRatio;
		newY = newY * zoomRatio - 5;
		
		this.moveme(newX, newY);
	} 
	
	this.drawme();
	this.setLocation(LocNum); 
	
}

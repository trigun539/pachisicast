function GameBoard(Source, Width, Height) {
    this.source = Source;
    this.width = Width;
    this.height = Height;
}

function Player(PieceSrc, PositionNumber, BoardHeight) {
	this.positionNum = PositionNumber;
	this.pieceSrc = PieceSrc;
	this.pieces = new Array();
	
	this.initialize = function()
	{
		if(this.positionNum == 1)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, -3, 1, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 2)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, -3, 2, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 3)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, -3, 3, this.positionNum, BoardHeight);
		}
		else if(this.positionNum == 4)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, -3, 4, this.positionNum, BoardHeight);
		}
		
	}
	
	this.initialize();
	
}



function GamePiece(ImgSrc, LocNum, Id, PlayerID, BoardHeight)
{
	this.id = Id;
	this.playerID = PlayerID;  //1 is top left, 2 is top right, 3 is bottom left, 4 is bottom right
	this.imgsrc = ImgSrc;
	this.locationNum;
	this.boardHeight = BoardHeight;
	this.y=0;
	this.x=0;
	 
	this.drawme = function()
	{
		var elem = document.createElement("img");
		elem.setAttribute("src", "img/"+this.imgsrc);
		elem.setAttribute("style", "position:absolute; height:4%");
		elem.setAttribute("id", "player" + this.playerID + "piece" + this.id);
		document.getElementById("gameGraphics").appendChild(elem);
		
	} 
	
	this.moveme = function(newX, newY)
	{
		this.x = newX;
		this.y = newY;
		
		$('#player' + this.playerID + "piece" + this.id).animate(
						  { 'top': newY,
						    'left': newX, 
						  }, 400, 'swing');
		
		//$('#player' + this.playerID + "piece" + this.id).css('top', this.y);
		//$('#player' + this.playerID + "piece" + this.id).css('left', this.x);
	}
	 
	this.moveForward = function(amount)
	{
		
		for(var i=0; i<amount; i++)
		{
		
			if(this.locationNum >= 1)  //must be in play area to move forward
			{
				var newLocation = this.locationNum += 1;
				
				if((this.playerID == 1)&&(this.locationNum == 35))  //entering finishing area 
					newLocation = 70;

				else if((this.playerID == 2)&&(this.locationNum == 18))  //entering finishing area
					newLocation = 70;
					
				else if((this.playerID == 3)&&(this.locationNum == 52))  //entering finishing area
					newLocation = 70;
				
				else if((this.playerID == 4)&&(this.locationNum == 69))  //entering finishing area
					newLocation = 70;
				
				
				if(newLocation == 69)
					newLocation = 1;
					 
					
				this.setLocation(newLocation);
			}
			
		}
	} 
	 
	this.enterPlayArea = function()
	{
		if(this.playerID == 1)
		{
			this.setLocation(39);
		}
		else if(this.playerID == 2)
		{
			this.setLocation(22);
		}
		else if(this.playerID == 3)
		{
			this.setLocation(56);
		}
		else if(this.playerID == 4)
		{
			this.setLocation(5);
		}				
	} 
	 
	 
	this.setLocation = function(LocNum)
	{
		this.locationNum = LocNum;
		var newX, newY;
 

		if(LocNum <= 0)      //-3 to 0 = pieces at home base/jail    top left home base
		{
			if(this.playerID == 1)
			{
				newY = 100;
				newX = 100 + (LocNum+3)*20;
			}
			else if(this.playerID == 2)
			{
				newY = 100;
				newX = 520 + (LocNum+3)*20;
			}
			else if(this.playerID == 3)
			{
				newY = 600;
				newX = 100 + (LocNum+3)*20;
			}
			else if(this.playerID == 4)
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
			if(this.playerID == 1)
			{
				newX = 345;
				newY = 51 + (LocNum - 69)*28.5;
			}
			else if(this.playerID == 2)
			{
				newY = 335;
				newX = 430 + (76 - LocNum)*28.5;
			}
			else if(this.playerID == 3)
			{
				newY = 335;
				newX = 60 + (LocNum - 69)*28.5;
			}
			else if(this.playerID == 4)
			{
				newX = 345;
				newY = 650 - (LocNum-68)*28.5;
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



 

function GameBoard(Source, Width, Height) {
    this.source = Source;
    this.width = Width;
    this.height = Height;
}

function Player(PieceSrc, PositionNumber) {
	this.positionNum = PositionNumber;
	this.pieceSrc = PieceSrc;
	this.pieces = new Array();
	
	this.initialize = function()
	{
		if(this.positionNum == 1)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, 11, 1, this.positionNum);
			this.pieces[1] = new GamePiece(this.pieceSrc, 21, 2, this.positionNum);
			this.pieces[2] = new GamePiece(this.pieceSrc, 31, 3, this.positionNum);
			this.pieces[2] = new GamePiece(this.pieceSrc, 32, 4, this.positionNum);
		}
		else if(this.positionNum == 2)
		{
			this.pieces[0] = new GamePiece(this.pieceSrc, -9, 1, this.positionNum);
			this.pieces[1] = new GamePiece(this.pieceSrc, 51, 2, this.positionNum);
			this.pieces[2] = new GamePiece(this.pieceSrc, 61, 3, this.positionNum);
			this.pieces[2] = new GamePiece(this.pieceSrc, 1, 4, this.positionNum);
		}
		
	}
	
	this.initialize();
	
}



function GamePiece(ImgSrc, LocNum, Id, PlayerID)
{
	this.id = Id;
	this.playerID = PlayerID;
	this.imgsrc = ImgSrc;
	this.locationNum;
	this.y=0;
	this.x=0;
	 
	this.drawme = function()
	{
		var elem = document.createElement("img");
		elem.setAttribute("src", "img/"+this.imgsrc);
		elem.setAttribute("style", "position:absolute");
		elem.setAttribute("id", "player" + this.playerID + "piece" + this.id);
		document.getElementById("gameGraphics").appendChild(elem);
		
	} 
	
	this.moveme = function()
	{
		$('#player' + this.playerID + "piece" + this.id).css('top', this.y);
		$('#player' + this.playerID + "piece" + this.id).css('left', this.x);
	}
	 
	this.moveForward = function(amount)
	{
		var newLocation = this.locationNum += amount;
		
		if(newLocation > 68)
			newLocation -= 68;
			
		this.setLocation(newLocation);
	} 
	 
	 
	this.setLocation = function(LocNum)
	{
		this.locationNum = LocNum;


		if(LocNum <= -13)  //-16 to -13 = bottom right home base
		{
			
		}

		if(LocNum <= -9)   //-12 to -9 = bottom left home base
		{
			
		}
		
		if(LocNum <= -5)     //-8 to -5 = top right home base
		{
			this.y = 100;
			this.x = 520 + (LocNum+8)*20;
		}

		else if(LocNum <= -1)      //-4 to -1 = top left home base
		{
			this.y = 100;
			this.x = 100 + (LocNum+4)*20;
		}

		else if(LocNum <= 8)
		{
			this.x = 405;
			this.y = 650 - (LocNum)*28.5;
			
		}
		else if(LocNum <= 16)
		{
			this.y = 400;
			this.x = 430 + (LocNum - 9)*28.5;
		}
		else if(LocNum == 17)
		{
			this.x = 630;
			this.y = 335;
		}
		else if(LocNum <= 25)
		{
			this.y = 269;
			this.x = 430 + (25 - LocNum)*28.5;
		}
		else if(LocNum <= 33)
		{
			this.x = 405;
			this.y = 51 + (33 - LocNum)*28.5;
		}
		else if(LocNum == 34)
		{
			this.x = 345;
			this.y = 51;
		}
		else if(LocNum <= 42)
		{
			this.x = 279;
			this.y = 51 + (LocNum - 35)*28.5;
		}
		else if(LocNum <= 50)
		{
			this.y = 269;
			this.x = 60 + (50 - LocNum)*28.5;
		}
		else if(LocNum == 51)
		{
			this.y = 335;
			this.x = 60;
		}
		else if(LocNum <= 59)
		{
			this.y = 400;
			this.x = 60 + (LocNum - 52)*28.5;
		}
		else if(LocNum <= 67)
		{
			this.x = 279;
			this.y = 423 + (LocNum - 60)*28.5;
		}
		else if(LocNum == 68)
		{
			this.x = 345;
			this.y = 623;
		}

		this.y -= 5;   //bandaid solution
		
		this.moveme();
	} 
	
	this.drawme();
	this.setLocation(LocNum); 
	
}



 

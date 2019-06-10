if(NT === undefined) {
  var NT = {};
}

NT.Squares = {

	colorEasy: 6,
    colorAvailable: 6,
    colorPickTally: 0,
    colorPickThreshold: 5,
    colorPlay: {
        Red:		"0xFF0000",	
        Yellow:		"0xFFFF00",	
        Green:		"0x008000",	
        Blue:		"0x0000FF",	
        Purple:		"0x800080",
        Orange:		"0xFFA500",	
        Maroon:		"0x800000",	
        Olive:		"0x808000",	
        Lime:		"0x00FF00",	
        Aqua:		"0x00FFFF",	
        Teal:		"0x008080",	
        Navy:		"0x000080",	
        Fuchsia:	"0xFF00FF"	
    },
    colorReserved: {
        White:		"0xFFFFFF",
        Silver:		"0xC0C0C0",	
        Gray:		"0x808080",	
        Black:		"0x000000"	
    },

    staticAlphaStill: 0.3,
	staticAlphaActive: 0.6,
	bombAlphaActive: 0.8,
	


    fieldArray: [],
    homeSquares: [],

	    

	squareDown: function (ptr,obj)
	{
	    var isReClick = false;
	    console.log(this,NT.Squares);
		if(NT.Squares.getTint(obj) == NT.Squares.getTint(home)){
			isReClick = true;
		}

	    if( !isReClick ) {
	    	var color = NT.Squares.getTint(obj);
	       	sfxClick.play();
	       	NT.Squares.checkHomeSides(color);
	    	NT.Squares.setMoves(-1);
	    	sfxClick.play();
	    }
		
	},
	squareOut: function (ptr,obj)
	{
	    // console.log(obj);
	},    
	squareUp: function (ptr,obj)
	{
	    // console.log(obj);
	},

	randomColor: function (obj) {
	    var keys = Object.keys(obj);
	    var len = keys.length;
	    if(this.colorAvailable < keys.length){
	    	len = this.colorAvailable;
	    }
	    return obj[keys[ len * Math.random() << 0]];
	},

	checkSpecialSquare: function (obj){
		var isFound = false;
		if(obj.name == bomb.name){
			isFound = true;
			NT.Squares.changeToWaitScreen("lose","\nYou absorbed The Bomb!");
		}
		return isFound;
	},

	checkHomeSides: function  (color){
		var k=0;
		if(color == this.colorReserved.Black){
			NT.Squares.changeToWaitScreen("win");
		}
		for (k=0;k<this.homeSquares.length;k++){
			var hs = this.homeSquares[k];
			var condition = true;
			hs.setFillStyle(color);

			while(condition){
				condition = NT.Squares.checkSidesForColor(hs.i,hs.j,NT.Squares.getTint(hs));
			}
			
		}
	},
	checkSidesForColor: function  (i,j, color){
		var isUpdated = false;
		if (NT.Squares.checkAdjSquares(i-1,j,color)) isUpdated = true; //left
		if (NT.Squares.checkAdjSquares(i+1,j,color)) isUpdated = true; //right
		if (NT.Squares.checkAdjSquares(i,j-1,color)) isUpdated = true; //up
		if (NT.Squares.checkAdjSquares(i,j+1,color)) isUpdated = true; //down
		return isUpdated;
	},
	checkAdjSquares: function (i,j, color){
		var isUpdated = false;
		if(i >= 0 && i < NT.Globals.squareWidth && j >=0 && j < NT.Globals.squareHeight){
			console.log("fieldArray",this.fieldArray);
			var sq = this.fieldArray[i][j];

			if(NT.Squares.getTint(sq) == this.colorReserved.Black){
				console.log("WIN");
			}
			if(NT.Squares.getTint(sq) == color && !this.homeSquares.includes(sq) ){

	       		if(NT.Squares.checkSpecialSquare(sq)){
	       			// return false; // trying to abort processing to prevent read after destroy()
	       		}else{
					sq.overlay.setAlpha(this.staticAlphaActive);
					sq.overlay.anims.play('static', true);
					this.homeSquares.push(sq);
					NT.Squares.checkSidesForColor(sq.i, sq.j, color);
					isUpdated = true;
				}
			}
		}
		return isUpdated;
	},

	chooseHome: function (){
		var col = NT.Squares.getRandomInt(NT.Globals.squareHeight-3,NT.Globals.squareHeight-1);
		var row = NT.Squares.getRandomInt(0,NT.Globals.squareWidth-1);
		home = this.fieldArray[row][col];
		// var outline = this.add.sprite(home.body.x,home.body.y, 'home');
		homeOutline.setPosition(home.x, home.y);
		homeOutline.setVisible(true);
		homeOutline.setDepth(home.depth + 1);

		home.setFillStyle(this.colorReserved.White);
		home.overlay.anims.play('static', true);
		home.overlay.setAlpha(this.staticAlphaActive);
		this.homeSquares.push(home);
	},
	chooseEnd: function (){
		var col = NT.Squares.getRandomInt(0,2);
		var row = NT.Squares.getRandomInt(0,NT.Globals.squareWidth-1);
		end = this.fieldArray[row][col];

		end.setFillStyle(this.colorReserved.Black);

	},
	chooseBomb: function (){
		var pick = true;
		var col , row;
		while(pick){
			col = NT.Squares.getRandomInt(0,2);
			row = NT.Squares.getRandomInt(0,NT.Globals.squareWidth-1);
			console.log(col, row, end);
			if(col != end.i && row != end.j){
				pick = false;
			}
		}

		bomb = this.fieldArray[row][col];

	    bomb.overlay = thisGame.add.sprite(bomb.x, bomb.y, 'bombs');

		bomb.overlay.anims.play('wick', true);
		bomb.overlay.setAlpha(this.bombAlphaActive);    	
	},

	getRandomInt: function (min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	getTint: function (obj){
		return obj.fillColor;
	},

	setMoves: function (val){
		// console.log(moves, val);
		NT.Globals.moves = NT.Globals.moves + val;
	    // console.log(movesText);

	    NT.Messages.movesText.setText(NT.Messages.movesTextPrefix + NT.Globals.moves);
	    if(NT.Globals.moves == 0){
	    	NT.Squares.changeToWaitScreen("lose");
	    }
	},

	changeToWaitScreen: function (type,text=""){

		if(type=="win"){
			NT.Globals.movesDifficultyOffset = NT.Globals.movesDifficultyOffset - 1;
			NT.Globals.level += 1;
			if(this.colorPickTally == this.colorPickThreshold){
				this.colorPickTally = 0;
				this.colorAvailable = this.colorAvailable + 1;
			}else{
				this.colorPickTally = this.colorPickTally + 1;
			}
		}else{
			NT.Globals.movesDifficultyOffset = NT.Globals.movesDifficultyOffset + 1;
	    	sfxDead.play();

		}

		NT.Squares.destroyAllSquares();
		this.fieldArray.length = 0;
		this.homeSquares.length = 0;

		NT.Squares.game.input.keyboard.shutdown();

     	NT.Squares.game.scene.start(type, { id: 2, text: text  });


	},


	createGame: function (game){
		NT.Squares.game = game;
		this.fieldArray = [];
		for (var i = 0; i < NT.Globals.squareWidth; i++) {
			this.fieldArray.push([]);
	        for (var j = 0; j < NT.Globals.squareHeight; j++) {
	            var x = i * NT.Globals.squarePx + NT.Globals.horizontalOffset;
	            var y = j * NT.Globals.squarePx + NT.Globals.verticalOffsetTop;

	            var square = thisGame.add.rexRoundRectangle(x,y, 58,58, 16, this.colorReserved.Gray).setInteractive();

	            square.i = i;
	            square.j = j;
	            
	            square.setFillStyle(NT.Squares.randomColor(this.colorPlay));
	            square.name = i+"|"+j;

	            square.overlay = thisGame.add.sprite(x,y, 'overlays').setAlpha(this.staticAlphaStill);


	            this.fieldArray[i].push(square);
	        }
		}

		console.log("fieldArray.1.1",this.fieldArray[1][1]);


		NT.Squares.chooseHome();
		NT.Squares.chooseEnd();
		NT.Squares.chooseBomb();

		NT.Squares.setMoves(NT.Squares.determineMovesStart());
	},

	destroyAllSquares: function (){
		console.log("Destorying all squares!");
		var i,j;
		for (var i = 0; i < NT.Globals.squareWidth; i++) {
	        for (var j = 0; j < NT.Globals.squareHeight; j++) {
	            this.fieldArray[i][j].destroy();
	        }
		}
	},

	determineMovesStart: function (){
		var col = Math.abs(home.i - end.i);
		var row = Math.abs(home.j - end.j);
		// console.log(col,row);
		return row + col + NT.Globals.movesDifficultyOffset;
	},



};



function main(){
    


	var config = {
	    type: Phaser.WEBGL,
// 	    width: 600,
// 	    height: 850,
		scale: {
            mode: Phaser.Scale.FIT,
            parent: 'net_intruder',
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 600,
            height: 850
        },
	    physics: {
	        default: 'arcade',
	        arcade: {
	            debug: false
	        }
	    },
	    scene: {
	        preload: preload,
	        create: create,
	        update: update,
	        createGame: createGame
	    },
	    audio: {
	        disableWebAudio: true,
	        noAudio: false
	    }
	};

	var game = new Phaser.Game(config);

	

	var player;
	var cursors;
	var gameOver = false;
	var moves=0;
	var movesText="";
	var movesTextPrefix = "Moves: ";
	var movesUpdate=0;
	var movesDifficultyOffset = 5;

	var musicMax = 0.6;
	var musicVolume = musicMax;
	var sfxDead;
    var sfxClick;
    var music;
    var muteKey;
    var isMute;

    var level=1;
    var levelText="";
    var levelTextPrefix = "Level: ";

	var square;
	var squares;
	var squarePx = 60;
	var squarePxHalf = squarePx/2;
	var squareWidth = 9;
	var squareHeight = 12;
	var homeOutline;
	var hasClicked = false;
	var home;
	var end;
	var bomb;

	var staticAlphaStill = 0.3
	var staticAlphaActive = 0.6;
	var bombAlphaActive = 0.8;

	var black_center;
	var white_center;
	var rainbow_center;
	var teal_border;

	var winText;
	var loseText;
	var restartText;
	var winTextMsg = "You Won!";
	var loseTextMsg = "You Lost!";
	var restartTextMsg = "Click to restart!";


	var displayWidth;
	var displayHeight;
	var horizontalOffset;
	var verticalOffset;
	var verticalOffsetTop;
	
	var verticalOpenSpace = 80;
    
    var colorEasy = 6;
    var colorAvailable = colorEasy;
    var colorPickTally = 0;
    var colorPickThreshold = 5;
    var colorPlay = {
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
    };
    var colorReserved = {
        White:		"0xFFFFFF",
        Silver:		"0xC0C0C0",	
        Gray:		"0x808080",	
        Black:		"0x000000"	
    };

    var fieldArray;
    var homeSquares = [];

    var gameState = "start";
    var thisGame;

	

	function preload ()
	{
    	this.load.spritesheet('overlays', 'img/overlays.png', { frameWidth: 60, frameHeight: 60 });
    	this.load.spritesheet('bombs', 'img/bombs.png', { frameWidth: 60, frameHeight: 60 });
	    this.load.image('square', 'img/squares_faded_square.png');
	    this.load.image('home', 'img/squares_white_outline.png');
	    this.load.image('end', 'img/squares_black_outline.png');
	    this.load.image('black_center', 'img/backgrounds_black_center.png');
	    this.load.image('white_center', 'img/backgrounds_white_center.png');
	    this.load.image('rainbow_center', 'img/backgrounds_rainbow1.png');
	    this.load.image('teal_border', 'img/backgrounds_teal_border.png');
        this.load.audio('music', ['audio/net_intruder_music_001.ogg', 'audio/net_intruder_music_001.mp3']);
        this.load.audio('dead', 'audio/dead.wav');
        this.load.audio('click', 'audio/click.wav');

        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexroundrectangleplugin.min.js';
        this.load.plugin('rexroundrectangleplugin', url, true);    

	}

	function create ()
	{
        // If this is not a desktop (so it's a mobile device) 
// 		console.log("desktop:",this.sys.game.device.os.desktop, game.device.desktop);
//         if (this.sys.game.device.os.desktop == false) {
//             // Set the scaling mode to SHOW_ALL to show all the game
//             var scaler = Phaser.ScaleManager;
//             console.log(Phaser.Scale,game,game.scale, this, this.scale,scaler);
//             game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

//             // Set a minimum and maximum size for the game
//             // Here the minimum is half the game size
//             // And the maximum is the original game size
//             game.scale.setMinMax(game.width/2, game.height/2, 
//                 game.width, game.height);

//             // Center the game horizontally and vertically
//             game.scale.pageAlignHorizontally = true;
//             game.scale.pageAlignVertically = true;
//         }
		thisGame = this;
	    //  A simple background for our game
	    rainbow_center = this.add.image(0, 0, 'rainbow_center');
	    rainbow_center.setDisplayOrigin(0);
	    teal_border = this.add.image(0, 0, 'teal_border');
	    teal_border.setDisplayOrigin(0);

        black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    // black_center = this.add.image(0, 0, 'black_center');
	    black_center.setDisplayOrigin(0);
    	black_center.setVisible(false);
                // var square = thisGame.add.sprite(x,y, 'square').setInteractive();


    	homeOutline = this.add.sprite(0,0, 'home');
    	homeOutline.setVisible(false);
        
        sfxDead = this.sound.add('dead');
        sfxClick = this.sound.add('click');

        music = this.sound.add('music', {volume:musicVolume});
        music.setLoop(true);
    	music.play();




		displayWidth = this.cameras.main.displayWidth;
		displayHeight = this.cameras.main.displayHeight;
		
		// finds the number of px on each side of play area
		horizontalOffset = squarePxHalf + (displayWidth - (squarePx * squareWidth))/2;
		
		// finds the number of px on each side of play area, sans alloted openspace at top
		verticalOffset = squarePxHalf + ((displayHeight - verticalOpenSpace) - (squarePx * squareHeight))/2;
		verticalOffsetTop = verticalOpenSpace + verticalOffset;
        
        // console.log(displayWidth,displayHeight,horizontalOffset,verticalOffset,verticalOffsetTop);
		
		

        //  If you disable topOnly it will fire events for all objects the pointer is over
        //  regardless of their place on the display list
        this.input.setTopOnly(false);

        //  Events
        this.input.on('gameobjectdown', squareDown);
        this.input.on('gameobjectout', squareOut);
        this.input.on('gameobjectup', squareUp);
        
	    //  Input Events	    

	    cursors = this.input.keyboard.addKeys('M');

		// muteKey = this.input.keyboard.addKey('M');  // Get key object
		// muteKey.on('down', function(event) {
		// 	if(musicVolume > 0){
		// 		musicVolume = 0;
		// 	}else{
		// 		musicVolume = musicMax;
		// 	}
		// });


	    //  The score
	    movesText = this.add.text(40, 40, movesTextPrefix + moves, { fontFamily: 'Impact', fontSize: '48px', fill: '#fff' });
	    console.log("movesText: ",movesText);

	    levelText = this.add.text(400, 40, levelTextPrefix + level, { fontFamily: 'Impact', fontSize: '48px', fill: '#fff' });
	    // console.log("movesText: ",movesText);

	    winText = this.add.text(160, 80, winTextMsg , { fontSize: '48px', fill: '#fff' });
	    loseText = this.add.text(horizontalOffset, 80, loseTextMsg , { align: 'center', fontSize: '48px', fill: '#fff', wordWrap: {width: displayWidth - (horizontalOffset*2)} });
	    restartText = this.add.text(60, 780, restartTextMsg, { fontSize: '48px', fill: '#fff' });
	    winText.setVisible(false);
	    loseText.setVisible(false);
	    restartText.setVisible(false);


	    this.anims.create({
		    key: 'static',
		    frames: this.anims.generateFrameNumbers('overlays', { start: 0, end: 5 }),
		    frameRate: 10,
		    yoyo: true,
		    repeat: -1
		});

	    this.anims.create({
		    key: 'wick',
		    frames: this.anims.generateFrameNumbers('bombs', { start: 0, end: 5 }),
		    frameRate: 10,
		    yoyo: true,
		    repeat: -1
		});



        createGame();
	}

	function update ()
	{

		if (cursors.M.isDown){
			console.log("M down", isMute);
	        if (!isMute) {
	            if(musicVolume > 0){
	            	musicVolume = 0;
	            	music.stop();
	            }else{
	            	musicVolume = musicMax;
	            	music.play();
	            }
	            isMute = true;
	        }
	    }

	    if (cursors.M.isUp) {
	        isMute = false;
	    }

	    // if(music.volume != musicVolume){
	    // 	console.log(music.volume, musicVolume);
	    // 	// music.setVolume(musicVolume);
	    // 	// music["volume"] = musicVolume;
	    // 	music.stop();
	    // }

	    if(hasClicked){
	       	hasClicked = false;
	       	checkHomeSides(getTint(home));
	    }

	    if(movesUpdate != 0){
	    	setMoves(movesUpdate);
	    	movesUpdate = 0;
	    }

	    if(gameState == "win"){
	    	changeToWaitScreen("win");
	    }else if(gameState == "lose"){
	    	changeToWaitScreen("lose");
	    }
	}
    
    function squareDown(ptr,obj)
    {
        // obj.setTint(0x00ff00);
        console.log("squareDown: ",gameState);
        if(gameState=="start" && !checkForReClick(obj)){
        	var color = getTint(obj);
	       	sfxClick.play();
	       	checkHomeSides(color);
	       	movesUpdate = -1;
	    	hasClicked = true;
	    	sfxClick.play();
        }else if(gameState=="wait"){
        	changeToFreshGame();
        	sfxClick.play();
        }
    	
    }    
    function squareOut(ptr,obj)
    {
        // console.log(obj);
    }    
    function squareUp(ptr,obj)
    {
        // console.log(obj);
    }

    var randomColor = function (obj) {
        var keys = Object.keys(obj);
        var len = keys.length;
        if(colorAvailable < keys.length){
        	len = colorAvailable;
        }
        return obj[keys[ len * Math.random() << 0]];
    };

    function checkSpecialSquare(obj){
    	if(obj.name == bomb.name){
    		loseText.text = loseTextMsg + "\nYou absorbed The Bomb!";
    		// loseText.setText("\nYou absorbed The Bomb!");
    		gameState = "lose";
    	}
    }

    function checkHomeSides (color){
    	var k=0;
    	if(color == colorReserved.Black){
    		gameState = "win";
    	}
    	for (k=0;k<homeSquares.length;k++){
    		var hs = homeSquares[k];
    		var condition = true;
    		hs.setFillStyle(color);
    		// console.log("hs", getTint(hs), color);
    		while(condition){
    			condition = checkSidesForColor(hs.i,hs.j,getTint(hs));
    		}
    		
    	}
    }
    function checkForReClick (obj){
    	var isReClick = false;
		if(getTint(obj) == getTint(home)){
			isReClick = true;
		}
    	return isReClick;
    }
    function checkSidesForColor (i,j, color){
    	var isUpdated = false;
    	if (checkAdjSquares(i-1,j,color)) isUpdated = true; //left
    	if (checkAdjSquares(i+1,j,color)) isUpdated = true; //right
    	if (checkAdjSquares(i,j-1,color)) isUpdated = true; //up
    	if (checkAdjSquares(i,j+1,color)) isUpdated = true; //down
    	return isUpdated;
    }
    function checkAdjSquares (i,j, color){
    	var isUpdated = false;
		if(i >= 0 && i < squareWidth && j >=0 && j < squareHeight){
			var sq = fieldArray[i][j];
			// console.log("sq",sq, color, homeSquares.includes(sq) );
			if(getTint(sq) == colorReserved.Black){
				console.log("WIN");
			}
			if(getTint(sq) == color && !homeSquares.includes(sq) ){
				// console.log("sq",getTint(sq), color, homeSquares.includes(sq) );
	       		checkSpecialSquare(sq);

    			sq.overlay.setAlpha(staticAlphaActive);
				sq.overlay.anims.play('static', true);
				homeSquares.push(sq);
				checkSidesForColor(sq.i, sq.j, color);
				isUpdated = true
			}
    	}
    	return isUpdated;
    }

    function chooseHome(){
    	var col = getRandomInt(squareHeight-3,squareHeight-1);
    	var row = getRandomInt(0,squareWidth-1);
    	home = fieldArray[row][col];
    	// var outline = this.add.sprite(home.body.x,home.body.y, 'home');
    	homeOutline.setPosition(home.x, home.y);
    	homeOutline.setVisible(true);
    	homeOutline.setDepth(home.depth + 1);

    	home.setFillStyle(colorReserved.White);
    	home.overlay.anims.play('static', true);
    	home.overlay.setAlpha(staticAlphaActive);
    	homeSquares.push(home);
    }
    function chooseEnd(){
    	var col = getRandomInt(0,2);
    	var row = getRandomInt(0,squareWidth-1);
    	end = fieldArray[row][col];
    	// var outline = this.add.sprite(home.body.x,home.body.y, 'home');
    	end.setFillStyle(colorReserved.Black);
    	// homeSquares.push(home);
    }
    function chooseBomb(){
    	var pick = true;
    	var col , row;
    	while(pick){
    		col = getRandomInt(0,2);
    		row = getRandomInt(0,squareWidth-1);
    		console.log(col, row, end);
    		if(col != end.i && row != end.j){
    			pick = false;
    		}
    	}

    	bomb = fieldArray[row][col];
    	// var outline = this.add.sprite(home.body.x,home.body.y, 'home');
        bomb.overlay = thisGame.add.sprite(bomb.x, bomb.y, 'bombs');

		bomb.overlay.anims.play('wick', true);
    	bomb.overlay.setAlpha(bombAlphaActive);    	// homeSquares.push(home);
    }

	function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getTint(obj){
		return obj.fillColor;
	}

	function setMoves(val){
		// console.log(moves, val);
		moves = moves + val;
	    // console.log(movesText);

	    movesText.setText(movesTextPrefix + moves);
	    if(moves == 0){
	    	gameState = "lose";
	    }
	}

	function changeToWaitScreen(type){
		setMoves(-moves);
		destroyAllSquares();
		fieldArray.length = 0;
		homeSquares.length = 0;
		black_center.setVisible(true);
		movesText.setVisible(false);
		music.stop();
		if(type=="win"){
			winText.setVisible(true);
			movesDifficultyOffset = movesDifficultyOffset - 1;
			level += 1;
			if(colorPickTally == colorPickThreshold){
				colorPickTally = 0;
				colorAvailable = colorAvailable + 1;
			}else{
				colorPickTally = colorPickTally + 1;
			}
		}else{
			loseText.setVisible(true);
			movesDifficultyOffset = movesDifficultyOffset + 1;
        	sfxDead.play();

		}
		restartText.setVisible(true);
		homeOutline.setVisible(false);
		gameState = "wait";
		// console.log(type, gameState, colorPickTally);

	}
	function changeToFreshGame(){
		// setMoves(movesStart);
		movesText.setVisible(true);
		createGame();
		if(!isMute){
			music.play();
		}
		black_center.setVisible(false);
		winText.setVisible(false);
		loseText.setVisible(false);
		restartText.setVisible(false);
		gameState = "start";
	}

	function createGame(){
 		fieldArray = [];
		for (var i = 0; i < squareWidth; i++) {
			fieldArray.push([]);
            for (var j = 0; j < squareHeight; j++) {
                var x = i * squarePx + horizontalOffset;
                var y = j * squarePx + verticalOffsetTop;

                // console.log(i,x,y);

                // var square = thisGame.add.sprite(x,y, 'square').setInteractive();
                // var square = thisGame.add.rectangle(x,y, 60,60, colorReserved.Gray).setInteractive();
                var square = thisGame.add.rexRoundRectangle(x,y, 58,58, 16, colorReserved.Gray).setInteractive();
                // var square = new Phaser.GameObject.Rectangle(x,y, 60,60, colorReserved.Gray);
                // square.setInteractive();
                // var square = new Phaser.Geom.Rectangle(250, 200, 300, 200);
                square.i = i;
                square.j = j;
                
                square.setFillStyle(randomColor(colorPlay));
                square.name = i+"|"+j;

                square.overlay = thisGame.add.sprite(x,y, 'overlays').setAlpha(staticAlphaStill);


                fieldArray[i].push(square);
            }
		}

        // fieldArray[1][1].overlay = thisGame.add.sprite(x,y, 'square').setAlpha(0.3);
		console.log("fieldArray.1.1",fieldArray[1][1]);
		// console.log("Game board color test:: ");
		// console.log(getTint(fieldArray[getRandomInt(0,squareWidth-1)][getRandomInt(0,squareHeight-1)]));
		// console.log(getTint(fieldArray[getRandomInt(0,squareWidth-1)][getRandomInt(0,squareHeight-1)]));
		// console.log(getTint(fieldArray[getRandomInt(0,squareWidth-1)][getRandomInt(0,squareHeight-1)]));
		


		// console.log("testForLog::");
		// var testForLog = fieldArray[getRandomInt(0,squareWidth-1)][getRandomInt(0,squareHeight-1)];

		// console.log(getTint(testForLog));
  //   	// testForLog.setTintFill(colorReserved.Lime);
  //   	testForLog.setTint(colorReserved.Lime);

		// // console.log(colorReserved.Lime); //0x00FF00
		// console.log(getTint(testForLog));

		// console.log(0x00FF00); //0x00FF00
		// console.log(getTint(testForLog));
		// // console.log(fieldArray);

		chooseHome();
		chooseEnd();
		chooseBomb();

		setMoves(determineMovesStart());
	}

	function destroyAllSquares(){
		var i,j;
		for (var i = 0; i < squareWidth; i++) {
            for (var j = 0; j < squareHeight; j++) {
                fieldArray[i][j].destroy();
            }
		}
	}

	function determineMovesStart(){
		var col = Math.abs(home.i - end.i);
		var row = Math.abs(home.j - end.j);
		// console.log(col,row);
		return row + col + movesDifficultyOffset;
	}
}


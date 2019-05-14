<!-- hide script from old browsers




function main(){
    


	var config = {
	    type: Phaser.AUTO,
	    width: 600,
	    height: 850,
	    physics: {
	        default: 'arcade',
	        arcade: {
	            debug: false
	        }
	    },
	    scene: {
	        preload: preload,
	        create: create,
	        update: update
	    }
	};

	var player;
	var cursors;
	var score = 0;
	var gameOver = false;
	var scoreText;
	
	var square;
	var squares;
	var squarePx = 60;
	var squarePxHalf = squarePx/2;
	var squareWidth = 9;
	var squareHeight = 13;
	
	var verticalOpenSpace = 80;
    
    var colorPlay = {
        Red:		"0xFF0000",	
        Maroon:		"0x800000",	
        Yellow:		"0xFFFF00",	
        Olive:		"0x808000",	
        Lime:		"0x00FF00",	
        Green:		"0x008000",	
        Aqua:		"0x00FFFF",	
        Teal:		"0x008080",	
        Blue:		"0x0000FF",	
        Navy:		"0x000080",	
        Fuchsia:	"0xFF00FF",	
        Purple:		"0x800080"
    };
    var colorReserved = {
        White:		"0xFFFFFF",
        Silver:		"0xC0C0C0",	
        Gray:		"0x808080",	
        Black:		"0x000000"	
    };

	var game = new Phaser.Game(config);

	function preload ()
	{
	    this.load.image('background', 'img/quick_background.png');
	    this.load.image('player', 'img/quick_player.png');
	    this.load.image('square', 'img/square_60px.png');
        
	}

	function create ()
	{
	    //  A simple background for our game
	    this.add.image(400, 300, 'background');
        
        

		var displayWidth = this.cameras.main.displayWidth;
		var displayHeight = this.cameras.main.displayHeight;
		
		// finds the number of px on each side of play area
		var horizontalOffset = squarePxHalf + (displayWidth - (squarePx * squareWidth))/2;
		
		// finds the number of px on each side of play area, sans alloted openspace at top
		var verticalOffset = squarePxHalf + ((displayHeight - verticalOpenSpace) - (squarePx * squareHeight))/2;
		var verticalOffsetTop = verticalOpenSpace + verticalOffset;
        
        console.log(displayWidth,displayHeight,horizontalOffset,verticalOffset,verticalOffsetTop);
		
		
// 		this.squares = this.physics.add.group();
		for (var i = 0; i < squareWidth; i++) {
            for (var j = 0; j < squareHeight; j++) {
                var x = i * squarePx + horizontalOffset;
                var y = j * squarePx + verticalOffsetTop;

                console.log(i,x,y);

                var square = this.add.sprite(x,y, 'square').setInteractive();
                square.i = i;
                square.j = j;
                
                square.setTint(randomColor(colorPlay));
            }
		}


        //  If you disable topOnly it will fire events for all objects the pointer is over
        //  regardless of their place on the display list
        this.input.setTopOnly(false);

        //  Events

        this.input.on('gameobjectdown', squareDown);

        this.input.on('gameobjectout', squareOut);

        this.input.on('gameobjectup', squareUp);
        
	    //  Input Events
	    cursors = this.input.keyboard.createCursorKeys();


	    //  The score
	    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '48px', fill: '#fff' });

	}

	function update ()
	{

	}
    
    function squareDown(ptr,obj)
    {
        obj.setTint(0x00ff00);
        console.log(obj);
    }    
    function squareOut(ptr,obj)
    {
        console.log(obj);
    }    
    function squareUp(ptr,obj)
    {
        console.log(obj);
    }

    var randomColor = function (obj) {
        var keys = Object.keys(obj)
        return obj[keys[ keys.length * Math.random() << 0]];
    };
}



// end hiding script from old browsers -->

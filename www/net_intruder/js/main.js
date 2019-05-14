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
	var squareWidth = 9;
	var squareHeight = 13;
	
	var verticalOpenSpace = 80;

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
		var horizontalOffset = (displayWidth - (squarePx * squareWidth))/2;
		
		// finds the number of px on each side of play area, sans alloted openspace at top
		var verticalOffset = ((displayHeight - verticalOpenSpace) - (squarePx * squareHeight))/2;
		var verticalOffsetTop = verticalOpenSpace + verticalOffset;
        
        console.log(displayWidth,displayHeight,horizontalOffset,verticalOffset,verticalOffsetTop);
		
		
// 		this.squares = this.physics.add.group();
		for (var i = 0; i < 9; i++) {
			var x = i * squarePx + 22;
			var y = i * squarePx + verticalOffsetTop;

// 			var square = this.squares.create(x, y, 'square');
            console.log(i,x,y);
//             this.square.setInteractive();
            
            var square = this.add.sprite(x,y, 'square').setInteractive();
            square.i = i;


		}


        //  If you disable topOnly it will fire events for all objects the pointer is over
        //  regardless of their place on the display list
        this.input.setTopOnly(false);

        //  Events

        this.input.on('gameobjectdown', function (pointer, gameObject) {

            gameObject.setTint(0x00ff00);
            console.log(gameObject);

        });

        this.input.on('gameobjectout', function (pointer, gameObject) {

            gameObject.clearTint();

        });

        this.input.on('gameobjectup', function (pointer, gameObject) {

            gameObject.clearTint();

        });
	    //  Input Events
	    cursors = this.input.keyboard.createCursorKeys();


	    //  The score
	    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '48px', fill: '#fff' });

	}

	function update ()
	{

	}
    
    function squareClicked(ptr,obj)
    {
//         gameObject.angle+=10;
        console.log(obj.i, obj.body.x, obj.body.y, obj);
    }


}



// end hiding script from old browsers -->

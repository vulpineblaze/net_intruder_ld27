if(NT === undefined) {
  var NT = {};
}

NT.Scenes = {};




NT.Scenes.Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    },

    init: function (data)
    {
        // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;
    },

    preload: function ()
    {
	    this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/backgrounds_black_center.png');
    },

    create: function ()
    {
    	var teal_border = this.add.image(0, 0, 'teal_border');
	    teal_border.setDisplayOrigin(0);

    	var black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    black_center.setDisplayOrigin(0);


        this.add.text(160, 80, NT.Messages.introTextMsg, { font: '48px Impact', fill: '#fff' });


        this.input.once('pointerup', function () {

            this.scene.start('play');

        }, this);
    }

});




NT.Scenes.Win = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Win ()
    {
        Phaser.Scene.call(this, { key: 'win' });
    },

    init: function (data)
    {
        this.inText = data.text;
    },

    preload: function ()
    {
	    this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/backgrounds_black_center.png');
    },

    create: function ()
    {
    	var teal_border = this.add.image(0, 0, 'teal_border');
	    teal_border.setDisplayOrigin(0);

    	var black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    black_center.setDisplayOrigin(0);


	    this.add.text(NT.Globals.horizontalOffset, 80, 
	    	NT.Messages.winTextMsg  + this.inText, 
	    	{ align: 'center', 
	    		font: '48px Impact', 
	    		fill: '#fff', 
	    		wordWrap: {width: NT.Globals.gameWidth - (NT.Globals.horizontalOffset*2)} 
	    	});
        // this.add.text(40, 80, NT.Messages.winTextMsg + this.inText, { align: 'center', font: '48px Impact', fill: '#fff' });
	    this.add.text(60, 780, NT.Messages.restartTextMsg, { align: 'center', font: '48px Impact', fill: '#fff' });


        var fullClick = false;

	    this.input.once('pointerup', function () {

            fullClick = true;

        }, this);

        this.input.once('pointerdown', function () {

            if(fullClick){
            	this.scene.start('play');
            }

        }, this);
    }

});




NT.Scenes.Lose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Lose ()
    {
        Phaser.Scene.call(this, { key: 'lose' });
    },

    init: function (data)
    {
        this.inText = data.text;
    },

    preload: function ()
    {
	    this.load.image('teal_border', 'img/backgrounds_teal_border.png');
	    this.load.image('black_center', 'img/backgrounds_black_center.png');
    },

    create: function ()
    {
    	var teal_border = this.add.image(0, 0, 'teal_border');
	    teal_border.setDisplayOrigin(0);

    	var black_center = this.add.sprite(0,0, 'black_center').setInteractive();
	    black_center.setDisplayOrigin(0);


		this.add.text(NT.Globals.horizontalOffset, 80, 
	    	NT.Messages.loseTextMsg  + this.inText, 
	    	{ align: 'center', 
	    		font: '48px Impact', 
	    		fill: '#fff', 
	    		wordWrap: {width: NT.Globals.gameWidth - (NT.Globals.horizontalOffset*2)} 
	    	});	    this.add.text(60, 780, NT.Messages.restartTextMsg, { align: 'center', font: '48px Impact', fill: '#fff' });

	    var fullClick = false;

	    this.input.once('pointerup', function () {

            fullClick = true;

        }, this);

        this.input.once('pointerdown', function () {

            if(fullClick){
            	this.scene.start('play');
            }

        }, this);
    }

});






NT.Scenes.Play = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Play ()
    {
        Phaser.Scene.call(this, 'play');
    },


    preload: function ()
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

        // this.load.plugin('RandomNamePlugin', 'assets/loader-tests/RandomNamePlugin.js', true);
        // var url;
        // // url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexroundrectangleplugin.min.js';
        // url = 'js/rexroundrectangleplugin.min.js';
        // this.load.plugin('rexroundrectangleplugin', url, true); 
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
    },


    create: function ()
    {
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

        music = this.sound.add('music', {volume: NT.Globals.musicVolume});
        music.setLoop(true);
    	music.play();


    	console.log('globals',NT.Globals);
					
		

        //  If you disable topOnly it will fire events for all objects the pointer is over
        //  regardless of their place on the display list
        this.input.setTopOnly(false);

        //  Events
        this.input.on('gameobjectdown', NT.Squares.squareDown);
        this.input.on('gameobjectout', NT.Squares.squareOut);
        this.input.on('gameobjectup', NT.Squares.squareUp);
        
	    //  Input Events	    

	    cursors = this.input.keyboard.addKeys('M', '1');
	    keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);


	    //  The score
	    NT.Messages.movesText = this.add.text(40, 40, 
	    							NT.Messages.movesTextPrefix + NT.Globals.moves, 
	    							{ fontFamily: 'Impact', fontSize: '48px', fill: '#fff' });
	    NT.Messages.levelText = this.add.text(400, 40, 
	    							NT.Messages.levelTextPrefix + NT.Globals.level, 
	    							{ fontFamily: 'Impact', fontSize: '48px', fill: '#fff' });

	    


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



        NT.Squares.createGame(thisGame);

    },

    update: function ()
    {
        if (cursors.M.isDown){
			console.log("M down", isMute);
	        if (!isMute) {
	            if(NT.Globals.musicVolume > 0){
	            	NT.Globals.musicVolume = 0;
	            	music.stop();
	            }else{
	            	NT.Globals.musicVolume = NT.Globals.musicMax;
	            	music.play();
	            }
	            isMute = true;
	        }
	    }

	    if (cursors.M.isUp) {
	        isMute = false;
	    }

	    if (keyOne.isDown) {
	    	console.log("Pressed One!");
	        NT.Squares.setMoves(1-NT.Globals.moves);
	    }

    },

    shutdown: function ()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});



















// NT.Scenes.Menu = new Phaser.Class({

//     Extends: Phaser.Scene,

//     initialize:

//     function Menu ()
//     {
//         Phaser.Scene.call(this, 'menu');
//     },

//     create: function ()
//     {
//         this.add.text(10, 10, 'Press 1, 2 or 3', { font: '16px Courier', fill: '#00ff00' });

//         this.input.keyboard.once('keyup_ONE', function () {

//             this.scene.start('demo', { id: 0, image: 'acryl-bladerunner.png' });

//         }, this);

//         this.input.keyboard.once('keyup_TWO', function () {

//             this.scene.start('demo', { id: 1, image: 'babar-phaleon-coco.png' });

//         }, this);

//         this.input.keyboard.once('keyup_THREE', function () {

//             this.scene.start('demo', { id: 2, image: 'babar-pym-wait.png' });

//         }, this);

//         this.events.on('shutdown', this.shutdown, this);
//     },

//     shutdown: function ()
//     {
//         //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
//         this.input.keyboard.shutdown();
//     }

// });

// NT.Scenes.Demo = new Phaser.Class({

//     Extends: Phaser.Scene,

//     initialize:

//     function Demo ()
//     {
//         Phaser.Scene.call(this, { key: 'demo' });
//     },

//     init: function (data)
//     {
//         console.log('init', data);

//         this.imageID = data.id;
//         this.imageFile = data.image;
//     },

//     preload: function ()
//     {
//         this.load.image('pic' + this.imageID, 'assets/pics/' + this.imageFile);
//     },

//     create: function ()
//     {
//         this.add.text(10, 10, 'Click to Return', { font: '16px Courier', fill: '#00ff00' });

//         this.add.image(400, 300, 'pic' + this.imageID).setScale(2);

//         this.input.once('pointerup', function () {

//             this.scene.start('menu');

//         }, this);
//     }

// });

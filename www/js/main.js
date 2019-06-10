
function main(){
    


	var config = {
	    type: Phaser.WEBGL,
// 	    width: 600,
// 	    height: 850,
		scale: {
            mode: Phaser.Scale.FIT,
            parent: 'net_intruder',
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: NT.Globals.gameWidth,
            height: NT.Globals.gameHeight
        },
	    physics: {
	        default: 'arcade',
	        arcade: {
	            debug: false
	        }
	    },
	    audio: {
	        disableWebAudio: true,
	        noAudio: false
	    },
	    scene: [NT.Scenes.Intro, 
	    	NT.Scenes.Play, 
	    	NT.Scenes.Win, 
	    	NT.Scenes.Lose]
	};

	var game = new Phaser.Game(config);

}


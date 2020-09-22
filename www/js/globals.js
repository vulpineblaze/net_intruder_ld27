if(NT === undefined) {
  var NT = {};
}

NT.Globals = {
	gameWidth: 600,
	gameHeight: 850,

	moves: 0,

	movesUpdate: 0,
	movesDifficultyOffset: -1,

	musicMax: 0.6,
	musicVolume: 0.6,

	squarePx: 60,
	squareWidth: 9,
	squareHeight: 12,
	verticalOpenSpace: 80,

	bgShiftX: -6,
	bgShiftY: -8,

	level: 1
};


NT.Globals.squarePxHalf = NT.Globals.squarePx/2;

NT.Globals.horizontalOffset = NT.Globals.squarePxHalf 
				+ (NT.Globals.gameWidth - (NT.Globals.squarePx * NT.Globals.squareWidth))/2;

// finds the number of px on each side of play area, sans alloted openspace at top
NT.Globals.verticalOffset = NT.Globals.squarePxHalf 
				+ ((NT.Globals.gameHeight - NT.Globals.verticalOpenSpace) 
				- (NT.Globals.squarePx * NT.Globals.squareHeight))/2;

NT.Globals.verticalOffsetTop = NT.Globals.verticalOpenSpace + NT.Globals.verticalOffset;	

NT.Globals.horzThird = NT.Globals.gameWidth * 0.33;
NT.Globals.vertThird = NT.Globals.gameHeight * 0.33;



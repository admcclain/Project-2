// global variables

var algae = [];
var smallFish = [];
var bigFish = [];
//var lilyPad = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    
	for (var i = 0; i < 30; i++) {
		algae.push (new Algae(random(width), random(height)));
	}

	for (var i = 0; i < 3; i++) {
		smallFish.push (new SmallFish(random(width), random(height)));
	}
    
    bigFish.push(new BigFish(random(width), random(height)));
    
//    for (var i = 0; i < 15; i++) {
//		lilyPad.push (new LilyPad(random(width), random(height)));
//	}

}

function draw() {
    //background(59, 140, 206);
    //background(67, 188, 170);
    background(51, 198, 184);
    
    algae.forEach (function(algae, idx){
        algae.frame();
    });

    smallFish.forEach (function(smallFish, idx){
        smallFish.frame (algae, bigFish);
    });

	bigFish.forEach (function(bigFish, idx){
		bigFish.frame (smallFish);
	} );
    
//    lilyPad.forEach (function(lilyPad, idx){
//        lilyPad.frame(); 
//    });

}
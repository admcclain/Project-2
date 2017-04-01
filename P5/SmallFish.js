function SmallFish (pos_x, pos_y) {
    this.pos = createVector(pos_x, pos_y);
    this.velocity = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.maxSpeed = 4;
    this.size = 1;
    this.maxSize = 4;
    this.born = Date.now();
    this.age = 0;
    this.maxAge = 125;
    this.minWidth = 30;
    this.maxWidth = 60;
    this.canGrow = true;
    this.maxFoodDist = 100;
	this.eating = false;
	this.timeEating = 0;
	this.myFood = false;

	this.pred = false;
}

SmallFish.prototype.frame = function (foodArr, predArr) {
    this.draw();
    this.grow();
	this.predSearch(predArr);
    this.foodSearch(foodArr);
	this.eat();
    this.move();
    this.checkBounds();
};

//ability to move on its own
SmallFish.prototype.move = function () {

	var moveAmt;
	var mult = 2;

    //aware of predator
	if (this.myPred) {
		moveAmt = p5.Vector.sub(this.myPred.pos, this.pos);
		moveAmt.normalize();
		moveAmt.rotate(PI);

    //aware of algae
	} else if (this.myFood) {

		moveAmt = p5.Vector.sub(this.myFood.pos, this.pos);
		var dist = moveAmt.mag();

		moveAmt.normalize();

		mult = constrain(map(dist, 0, 30, 0, 1), 0, 1);

	} else {
		moveAmt = p5.Vector.random2D();
		moveAmt.mult(0.5);
	}

    this.accel = moveAmt;
    this.velocity.add(this.accel);
	this.velocity.mult(mult);
	this.velocity.limit(this.maxSpeed);

    this.checkBounds();

    this.pos.add(this.velocity);

};

//aware of sketch boundaries
SmallFish.prototype.checkBounds = function () {
    if (this.pos.x >= width ) {
        this.velocity.x = 0;
        this.accel.x *= -1;
        this.pos.x = width-2;
    } else if ( this.pos.x <= 0 ) {
        this.velocity.x = 0;
        this.accel.x *= -1;
        this.pos.x = 2;

    } else if ( this.pos.y >= height ) {
        this.velocity.y = 0;
        this.accel.y *= -1;
        this.pos.y = height-2;

    } else if ( this.pos.y <= 0) {
        this.velocity.y = 0;
        this.accel.y *= -1;
        this.pos.y = 2;
    }
};

//SmallFish foodSearch code
SmallFish.prototype.foodSearch = function (foodArr) {

    for (var i = 0; i < foodArr.length; i++) {
        var food = foodArr[i];


        var foodDist = p5.Vector.dist(food.pos, this.pos);


        if (foodDist <= this.maxFoodDist && food.size >= 2) {
            this.myFood = food;
        }
    }

};

//SmallFish predator search code
SmallFish.prototype.predSearch = function (predArr) {

    for (var i = 0; i < predArr.length; i++) {
        var pred = predArr[i];


        var predDist = p5.Vector.dist(pred.pos, this.pos);


        if (predDist <= this.maxFoodDist && pred.size >= 2) {
            this.myPred = pred;
        }
    }

};

//SmallFish eat function
SmallFish.prototype.eat = function () {
	if (this.myFood) {
		if ( p5.Vector.dist(this.pos, this.myFood.pos) <= 1 ) {
			this.eating = true;
		}
	}

	if (this.eating) {
		this.timeEating++;
		if (this.timeEating % 120 === 0) {
			this.myFood.size--;
			this.size++;
		}
		if (this.myFood.size <= 0) {
			this.eating = false;
			this.timeEating = 0;
			this.myFood = false;
		}
	}
}

//SmallFish appearance
SmallFish.prototype.draw = function () {

    push();

    translate(this.pos.x, this.pos.y);

	var heading = this.velocity.heading();
	rotate(heading + HALF_PI);

    fill(98, 71, 124);
    noStroke();
    ellipseMode(CENTER);
    var thingWidth = map(this.size, 0, this.maxSize, this.minWidth, this.maxWidth);
    var thingHeight = thingWidth * 0.2;
    ellipse(5, 5, thingWidth, thingHeight);

    pop();
};

//SmallFish can grow
SmallFish.prototype.grow = function () {
    var growRate = 6;

    this.age = floor((Date.now() - this.born)/2000);

    if (this.age % growRate === 0 && this.canGrow) {
        this.size++;
        this.canGrow = false;
    } else if (this.age % growRate !== 0) {
        this.canGrow = true;
    }
};
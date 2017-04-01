function Algae (pos_x, pos_y) {
    this.pos = createVector(pos_x, pos_y);

    this.size = 0.5;
    this.canGrow = true;
    this.locs = [[0,0]];
    this.born = Date.now();
    this.age = 0;
}

Algae.prototype.frame = function () {
    this.draw();
    this.grow();
};

//Algae appearance
Algae.prototype.draw = function () {
    push();

    translate(this.pos.x, this.pos.y);

    for (var i = 0; i < this.size; i++) {
        push();
        translate(this.locs[i][0], this.locs[i][1]);
        ellipseMode(CENTER);
        noStroke();
        fill(71, 124, 82);
        ellipse(15, 15, 5, 5);
        pop();
    }
    pop();
};

//Algae has the ability to grow
Algae.prototype.grow = function () {
    this.age = floor((Date.now() - this.born)/1000);

    if (this.age % 5 === 0 && this.canGrow) {
        this.size++;
        this.locs.push([random(-15, 15), random(-10, 10)]);
        this.canGrow = false;
    } else if (this.age % 5 !== 0) {
        this.canGrow = true;
    }
};
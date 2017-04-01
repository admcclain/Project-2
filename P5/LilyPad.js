//function LilyPad (pos_x, pos_y) {
//    this.pos = createVector(pos_x, pos_y);
//
//    this.size = 2;
//    this.locs = [[0,0]];
//}
//
//LilyPad.prototype.frame = function () {
//    this.draw();
//};
//
////LilyPad appearance
//LilyPad.prototype.draw = function () {
//    push();
//
//    translate(this.pos.x, this.pos.y);
//
//    for (var i = 0; i < this.size; i++) {
//        push();
//        translate(this.locs[i][0], this.locs[i][1]);
//        noStroke();
//        fill(120, 200, 120);
//        arc(50, 50, 90, 90, PI+QUARTER_PI, PIE);
//        pop();
//    }
//    pop();
//};

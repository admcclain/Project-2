//variables for this sketch
PVector location; //location of shape
PVector velocity; //velocity of shape
PVector gravity; //gravity acts as acceleration for shape
int x;
int y;
float outsideRadius = 600;
float insideRadius = 400;

//initial setup for sketch
void setup() {
  fullScreen(); //fullscreen based on curent windows W and H
  //frameRate(60); //number of frames displayed every second
  ellipseMode(RADIUS); //ellipse mode RADIUS uses the first two parameters as the 
  //shape's center point and the third and fourth as its width and height
  
  //vectors used in this sketch
  location = new PVector(100,100);
  velocity = new PVector(2.5,5);
  gravity = new PVector(2, 4);
  
  //x and y values
  x = width/2;
  y = height/2;
  
}

void draw() {
  background(137, 189, 191); //background color
  
  location.add(velocity); //add velocity to the location
  velocity.add(gravity); //add gravity to the velocity
  
  if ((location.x > width) || (location.x < 0)) {
    velocity.x = velocity.x * -1;
  }
  if (location.y > height) {
    velocity.y = velocity.y * -0.95; 
    location.y = height;
  }
  
  stroke(1);
  fill(64, 39, 86);
  ellipse(location.x,location.y,45,45); //bouncing ball
  fill(145, 23, 23);
  ellipse(x, y, location.x, location.y); //ball changing shape based on location.x and location.y
  
  checkEdge(); //call checkEdge
  
  //triangle_strip has a changing form based on location.x and location.y of the bouncing ball
  int numPoints = int(map(location.x, location.y, width, 6, 60));
  float angle = 0;
  float angleStep = 180.0/numPoints;
  
  //coding with beginShape and endShape creates more complex forms 
  fill(71, 124, 82);
  beginShape(TRIANGLE_STRIP); 
  for (int i = 0; i <= numPoints; i++) {
    float px = x + cos(radians(angle)) * outsideRadius;
    float  py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py); 
    angle += angleStep;
  }
  endShape();
  
}


//keep bouncing ball in the screen
void checkEdge() {
    if (x >= width ) {
        location.x = 0;
        velocity.x *= -1;
        x = width-2;
    } else if (x <= 0 ) {
        location.x = 0;
        velocity.x *= -1;
        x = 2;

    } else if (y >= height ) {
        location.y = 0;
        velocity.y *= -0.95;
        y = height-2;

    } else if (y <= 0) {
        location.y = 0;
        velocity.y *= -0.95;
        y = 2;
    }
};
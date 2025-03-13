let plane;
let bgX = 0, bgY = 0;

function setup() {
  createCanvas(800, 600);
  plane = new Plane();
}

function draw() {
  background(200);
  
  bgX -= plane.velocity.x;
  bgY -= plane.velocity.y;
  
  push();
  translate(bgX, bgY);
  drawBackground();
  pop();
  
  plane.update();
  plane.display();
  
  fill(0);
  text("Speed: " + nf(plane.velocity.mag(), 1, 2), 10, 20);
  text("Angle: " + nf(degrees(plane.angle), 1, 2), 10, 40);
}

function drawBackground() {
  for (let x = -width; x < width * 2; x += 50) {
    for (let y = -height; y < height * 2; y += 50) {
      fill(150);
      rect(x, y, 40, 40);
    }
  }
}

class Plane {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.angle = 0;
    this.maxTurnAngle = radians(5);
    this.speed = 2;
    this.maxSpeed = 5;
    this.minSpeed = 0.5;
    this.acceleration = 0.1;
    this.lift = 0; 
    this.gravity = 0.05; 
  }

  update() {
    let target = createVector(mouseX - width / 2, mouseY - height / 2);
    let direction = target.copy().normalize();
    let targetAngle = direction.heading();
    
    let angleDiff = targetAngle - this.angle;
    angleDiff = atan2(sin(angleDiff), cos(angleDiff));
    this.angle += constrain(angleDiff, -this.maxTurnAngle, this.maxTurnAngle);
    
   
    if (keyIsDown(UP_ARROW)) {
      this.speed = constrain(this.speed + this.acceleration, this.minSpeed, this.maxSpeed);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.speed = max(this.speed - this.acceleration, this.minSpeed);
    }
    
   
    this.lift = sin(this.angle) * 0.1; 
    this.velocity.y -= this.lift; 
    
    
    this.velocity.y += this.gravity;
    
    direction.setMag(this.speed);
    this.velocity.x = direction.x;
    
    this.position.add(this.velocity);
  }

  display() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    fill(255, 0, 0);
    noStroke();
    triangle(-10, 5, -10, -5, 10, 0);
    pop();
  }
}

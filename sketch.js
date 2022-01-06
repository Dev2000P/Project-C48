var rocket, rocketImg;
var missile, missileImg;
var blastImg;

var score = 0;
var life = 2;
var gameState= 1;

function preload(){
rocketImg = loadImage("rocket.png");
spaceImg = loadImage("space.jpg");
astreoidImg = loadImage("astreoid.png");
missileImg = loadImage("missile.png");
blastImg = loadImage("blast.png");
}

function setup() {
  createCanvas(1000,800);

  rocket = createSprite(500, 750, 50, 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.4;

  missileGroup = createGroup();
  astreoidGroup = createGroup();

 heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background(spaceImg);

  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score "+score);
  scoreboard.style('color:red');
  scoreboard.position(width -200,20)
  
  if(gameState === 1){
    rocket.x = mouseX;
  
    if(frameCount % 100 === 0) {
    spawnAstreoid();
    }

  if(astreoidGroup.collide(missileGroup)){
    handleAstreoidCollision(astreoidGroup)
    
  }

  if(astreoidGroup.collide(rocket)){
  handleLifeover(astreoidGroup)
  }
 
  drawSprites();
  }
}

function spawnAstreoid(){
  astreoid = createSprite(random(50,980), 100, 50, 50);
  astreoid.addImage(astreoidImg);
  astreoid.scale = 0.8;
  astreoid.velocityY = 15;
  astreoid.lifetime = 400;
  astreoidGroup.add(astreoid);
}

function handleAstreoidCollision(astreoidGroup){
if(life > 0){
score = score+1;
}

blast = createSprite(astreoid.x, astreoid.y, 50, 50);
blast.addImage(blastImg);

blast.scale = 0.8;
blast.life= 20;
missileGroup.destroyEach();
astreoidGroup.destroyEach();
}


function mouseClicked(){
missile = createSprite(width/2, 740, 30, 20);
missile.x = rocket.x+8;
missile.addImage(missileImg);
missile.scale = 0.2;
missile.velocityY = -10;
missileGroup.add(missile);
}

function handleLifeover(astreoidGroup){
life = life - 1;
astreoidGroup.destroyEach();

if(life === 0){
gameState = 2;

swal({
  title: `Game Over`,
  text: "You lost!",
  text: "Your Score is " + score,
  imageUrl:
  "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100",
  confirmButtonText: "Ok"
});
}
}
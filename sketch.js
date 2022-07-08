
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var garden, gardenImg;
var invisibleGround;

var girl, girlRunning, girlCollided;

var butterfly1, butterfly1Image, butterfly1Group;

var butterfly2, butterfly2Image, butterfly2Group;

var obstacle,obstaclesGroup,obstacleImg;

var score=0;

var gameOver, restart;

function preload(){
  //loading Image and Animation hear
    gardenImg = loadImage("assets/bg1.png")
    girlRunning = loadAnimation("assets/girl1.png","assets/girl2.png","assets/girl3.png","assets/girl4.png");
    girlCollided = loadAnimation("assets/girl8.png")
    butterfly1Image = loadAnimation("assets/fly1.png","assets/fly2.png","assets/fly3.png","assets/fly4.png");
    butterfly2Image = loadAnimation("assets/fly5.png","assets/fly6.png","assets/fly7.png");
    obstacleImg = loadImage("assets/stone.png");
    gameOverImg = loadImage("assets/gameOver.png");
    restartImg = loadImage("assets/restart.png");
}
 

function setup() {
  createCanvas(800,400);
  //Creating background
  garden = createSprite(400,100,400,20);
  garden.addImage("garden",gardenImg);
  garden.scale=0.3;
  garden.x = width /2;
  
  //Creating girl Running and Colliding Animation
  girl = createSprite(80,320,20,50);
  girl.addAnimation("running", girlRunning);
  girl.addAnimation("collided", girlCollided);
  girl.scale = 1.3;
  girl.setCollider("circle",0,0,40)
 
  
  //creating IndivisibleGround
  invisibleGround = createSprite(400,365,1600,10);
  invisibleGround.visible = false;

  //creating Gameover sprite 
  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  //add butterfly1,butterfly2 and obstacles group hear
  butterfly1Group = new Group();
  butterfly2Group = new Group();
  obstaclesGroup = new Group();
}

function draw() {

  background(gardenImg); 
  
   girl.x=camera.position.x-270;

  if (gameState===PLAY){
    garden.velocityX=-3
    if(garden.x<100)
    {
      garden.x=400
    }

    console.log(girl.y)

    if(keyDown("space")&& girl.y>270) {
      girl.velocityY = -16;
    }
    girl.velocityY = girl.velocityY + 0.8
    
    spawnButterfly1();
    spawnButterfly2();
    spawnObstacles();

    girl.collide(invisibleGround);

    if(obstaclesGroup.isTouching(girl)){
      gameState = END;
    }


    if(butterfly1Group.isTouching(girl)){
      score = score + 1;
      butterfly1Group.destroyEach();
    }


   if(butterfly2Group.isTouching(girl)){
      butterfly2Group.destroyEach();
    }
  }else if (gameState === END) {
    gameOver.x=camera.position.x;
    gameOver.visible = true;
    girl.velocityY = 0;
    garden.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    butterfly1Group.setVelocityYEach(0);
    butterfly2Group.setVelocityYEach(0);

    girl.changeAnimation("collided",girlCollided);
    
    obstaclesGroup.setLifetimeEach(-1);
    butterfly1Group.setLifetimeEach(-1);
    butterfly2Group.setLifetimeEach(-1);

  }
  drawSprites();
  
}


//hear is the code to spawn butterfly1 
function spawnButterfly1() {
  if(frameCount % 130 === 0) {

    var butterfly1 = createSprite(camera.position.x+400,120,40,40);
    butterfly1.addAnimation("butterflyFlying",butterfly1Image);
    butterfly1.velocityX = -(6 + 3*score/100)
    butterfly1.scale = 0.4;      
    butterfly1.setCollider("rectangle",0,0,butterfly1.width/2,butterfly1.height/2)
    butterfly1.lifetime = 400;
    butterfly1Group.add(butterfly1);
    
  }
}


//hear is the code to spawn butterfly2
function spawnButterfly2() {
  if(frameCount % 180 === 0) {

    var butterfly2 = createSprite(camera.position.x+400,160,40,40);
    butterfly2.addAnimation("butterflyFlying",butterfly2Image);
    butterfly2.velocityX = -(6 + 3*score/100)
    butterfly2.scale = 0.2;      
    butterfly2.setCollider("rectangle",0,0,butterfly2.width/2,butterfly2.height/2)
    butterfly2.lifetime = 400;
    butterfly2Group.add(butterfly2);
  }
}


//hear is the code to spawn obstacles
function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,40,40)
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.3; 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle); 
  }
}



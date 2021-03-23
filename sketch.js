var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,ci;
var obs,oi1,oi2,oi3,oi4,oi5,oi6;
var ran;
var play = 1;
var end = 0;
var gs = play;
var score = 0;
var goo,go;
var rt,rtt;
var jumpSound , checkPointSound, dieSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 ci = loadImage("cloud.png");
 oi1 = loadImage("obstacle1.png");
  oi2 = loadImage("obstacle2.png");
    oi3 = loadImage("obstacle3.png");
    oi4 = loadImage("obstacle4.png");
    oi5 = loadImage("obstacle5.png");
  oi6 = loadImage("obstacle6.png");
  
  go = loadImage("game_over.png");
  rtt = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //creating groups fsr
  
  obstacleGroup = new Group();
  cloudGroup = new Group();

  //creating game over thingie
  
  goo = createSprite(300,100);
  goo.addImage("game_over",go);
  goo.scale = 0.1;
  goo.visible = false;
  
  //creating restart thingie
  
  rt = createSprite(300,140);
  rt.addImage("restart",rtt);
  rt.scale = 0.3;
  rt.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //set background color
  background("white");
  text(score,500,50);
  if(gs == play){
    ground.velocityX = -4;
    score = score+Math.round(frameCount/450);
    if(score > 0 && score%100 == 0){
      checkPointSound.play();
    }
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    if(keyDown("space") && trex.y>=160 || keyDown("up") && trex.y>=160){
    trex.velocityY = -12;
      jumpSound.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds()
    spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      gs = end;
    }
    if(obstacleGroup.isTouching(trex)){
        gameState = end;
        dieSound.play();
    }
  }
  else if(gs == end){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    goo.visible = true;
    
    rt.visible = true;
  }
  // console.log(trex.y)
  
  
  
  // jump when the space key is pressed
  //jump when space key is pressed
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  console.log(gs);
  if(mousePressedOver(rt)){
    reset();
  }
  drawSprites();
}

function spawnClouds(){
  if (frameCount%100==0){
  cloud = createSprite(610,75,40,10);
    cloud.addImage(ci);
    cloud.y=Math.round(random(10,60))
  cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
  }
}
function spawnObstacles(){
  if(frameCount%60==0){
    obs = createSprite(600,165,5,30);
    obs.velocityX = -6;
    obs.scale = 0.5;
    ran = Math.round(random(1,6));
    switch(ran){
      case 1:
        obs.addImage(oi1);
        break;
      case 2:
        obs.addImage(oi2);
        break;
      case 3:
        obs.addImage(oi3);
        break;
      case 4:
        obs.addImage(oi4);
        break;
      case 5:
        obs.addImage(oi5);
        break;
      case 6:
        obs.addImage(oi6);
        break;
      default:
        break;
    }
  obstacleGroup.add(obs);
  }
}

function reset(){
  gs = play;
  goo.visible = false;
  rt.visible = false;
  score = 0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
}
var Trex, TRunning, TCollided;
var Ground, GInvisible, GImage;
var Clouds, CImage;
var Obstacles, OI1, OI2, OI3, OI4, OI5, OI6;
var Restart, Gameover, IRestart, IGameover;
var Score;
var Gamestate;


function spawnclouds(){
if(frameCount%60===0){
  var cloud=createSprite(650, random(50, 100));
  cloud.lifetime=150;
  cloud.addToGroup(Clouds);
  cloud.velocityX=-5;
  cloud.depth=Ground.depth;
  cloud.addImage("cloud", CImage);
}
}

function spawnobstacles(){
if(frameCount%80===0){
  var obstacle=createSprite(675, 161);
  obstacle.lifetime=150;
  obstacle.addToGroup(Obstacles);
  obstacle.velocityX=-7.5;
  obstacle.depth=Ground.depth;
  var ORandom=Math.round(random(1,6));
  switch(ORandom){
  
    case 1:{
      obstacle.addImage("obstacle1", OI1);
      break;
    }
  
    case 2:{
      obstacle.addImage("obstacle2", OI2);
      break;
    }  
    
      
    case 3:{
      obstacle.addImage("obstacle3", OI3);
      break;
    }
      
    case 4:{
      obstacle.addImage("obstacle4", OI4);
      break;
    }
      
    case 5:{
      obstacle.addImage("obstacle5", OI5);
      break;
    }
    
    case 6:{
      obstacle.addImage("obstacle6", OI6);
      break;
    }
      
  }
  obstacle.scale=0.5
}
}

function preload(){
  TRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  TCollided=loadImage("trex_collided.png");
  
  GImage = loadImage("ground2.png");
  
  CImage=loadImage("cloud.png");
  
  OI1=loadImage("obstacle1.png");
  OI2=loadImage("obstacle2.png");
  OI3=loadImage("obstacle3.png");
  OI4=loadImage("obstacle4.png");
  OI5=loadImage("obstacle5.png");
  OI6=loadImage("obstacle6.png");
  
  IRestart=loadImage("restart.png");
  IGameover=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  Clouds=createGroup();
  
  Obstacles=createGroup();
  
  Trex = createSprite(50,180,20,50);
  Trex.addAnimation("Collided", TCollided);
  Trex.addAnimation("Running", TRunning);
  Trex.scale = 0.5;
  
  Ground = createSprite(200,180,400,20);
  Ground.addImage("Ground",GImage);
  Ground.x = 400;
  Ground.velocityX = -7.5;
  
  GInvis = createSprite(200,190,400,10);
  GInvis.visible = false;
  
  Restart = createSprite(300, 100);
  Restart.addImage("Restart", IRestart);
  Gameover = createSprite(300, 50);
  Gameover.addImage("Gameover", IGameover);
  
  Score=0;
  
  var PLAY=1;
  var END=0;
  Gamestate=PLAY;
}

function draw() {
  background(256);
  
  if(Gamestate===1){
  spawnclouds();
  
  spawnobstacles();
  
    Trex.changeImage("Running", TRunning);
    
    Ground.velocityX=-7.5;
    
  if(keyDown("space")&&(Trex.isTouching(Ground))){
    Trex.velocityY =-11;  
     }
  
  Trex.velocityY = Trex.velocityY+0.8
  
  if (Ground.x < 0){
    Ground.x =400;
  }
  
    Restart.visible=false;
    Gameover.visible=false;
    
    Score=Score+Math.round(frameRate()/60);
    
    if(Trex.isTouching(Obstacles)){
    Gamestate=0;
    }
    
                   } else if(Gamestate===0){
    Restart.visible=true;
    Gameover.visible=true;                 
    
    Trex.velocityY=0;
    Ground.velocityX=0;
    Obstacles.setVelocityXEach(0);
    Obstacles.setLifetimeEach(-1);
    Clouds.setVelocityXEach(0);
    Clouds.setLifetimeEach(-1);
    Trex.changeImage("Collided", TCollided);
    
      if(mousePressedOver(Restart)){
      Gamestate=1;
        Obstacles.destroyEach();
        Clouds.destroyEach();
        Score=0;
      }
                     
                   }
  
  text("Score: "+Score, 15, 15);
  
  Trex.depth=Ground.depth+1;
  
  Trex.collide(GInvis);
  
  console.log(Trex.y);
  
  
  drawSprites();
}
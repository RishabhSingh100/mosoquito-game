var mosquito,mosquito_moving,mosquito_collided;
var ground_up,ground_down
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstacle1,obstacle2;
var life=3;
var score=0
function preload(){
  mosquito_moving=loadAnimation("mosquito1.png","mosquito2.png");
  //
  net1img=loadImage("net1.png");
  net2img=loadImage("net2.png");
  plant1img=loadImage("plant1.png");
  plant2img=loadImage("plant2.png");
  heartimg=loadImage("heart.png");
  gameoverimg=loadImage("gameOver.png");
  replayimg=loadImage("replay.png");
  potsimg=loadImage("pots.png");
  mosquitoimg=loadImage("mosquito_hitNet.png");
}

function setup() {
  createCanvas(400,400);
  
  heart1=createSprite(30,40,20,20)
  heart2=createSprite(60,40,20,20)
  heart3=createSprite(90,40,20,20)
  heart1.addImage("her",heartimg)
  heart1.scale=0.15
  heart2.addImage("her",heartimg)
  heart2.scale=0.15
  heart3.addImage("her",heartimg)
  heart3.scale=0.15
  mosquito=createSprite(40,200,20,20);
  mosquito.addAnimation("move",mosquito_moving);
  mosquito.scale=0.06
  ground_up=createSprite(200,390,400,20);
  ground_down=createSprite(200,10,400,20);
  netGroup = new Group();
  obstaclesGroup = new Group();
  potionsGroup = new Group();
  gameover=createSprite(200,160,20,20);
  gameover.addAnimation("move",gameoverimg);
  gameover.scale=0.3;
  restart=createSprite(200,240,20,20);
  restart.addAnimation("move",replayimg );
  restart.scale=0.15;
  gameover.visible=false
  restart.visible=false
  
  
}

function draw() {
  background("white");
  
 //   mosquito.debug=true; 
  heart1.depth=mosquito.depth+2
  heart2.depth=mosquito.depth+2
  heart3.depth=mosquito.depth+2
  mosquito.setCollider("circle",0,0,450)
  if(life===3){
    heart3.visible=true;
    heart2.visible=true;
    heart1.visible=true;
  }
  if(life===2){
    heart3.visible=false;
    heart2.visible=true;
    heart1.visible=true;
  }
  if(life===1){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=true;
  }
  if(life===0){
    heart3.visible=false;
    heart2.visible=false;
    heart1.visible=false;
  }
      ground_up.shapeColor=("white")
      ground_down.shapeColor=("white")
  
  stroke("blue")
  textSize=10
  //text("LIFE="+life,340,50);
  text(" "+score,20,70)
  
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
  if(keyWentDown("space")){
  mosquito.velocityY=-10 
  }
  if(mosquito.isTouching(ground_up)||mosquito.isTouching(ground_down)){
    gameState=END;
  }
    if(mosquito.isTouching(potionsGroup)&&life> 3){
    life=life+1
      potionsGroup[0].destroy();
  }
     if(mosquito.isTouching(potionsGroup)&&life=== 2){
    life=life+1
      potionsGroup[0].destroy();
  }
     if(mosquito.isTouching(potionsGroup)&&life===1){
    life=life+1
      potionsGroup[0].destroy();
  }
    
    if(mosquito.isTouching(potionsGroup)){  
      potionsGroup[0].destroy();
  }
  mosquito.velocityY=mosquito.velocityY+1
    spawn1();
  
  if(mosquito.isTouching(obstaclesGroup)){
    gameState=END;
  }
  if(life===0){
    gameState=END;
  }
  if(mosquito.isTouching(netGroup)){
    life=life-1
    netGroup[0].destroy();
  }
    spawnPotions(); 
  }
  
  else if(gameState===END){
    mosquito.velocityY=0
    netGroup.setVelocityXEach(0)
    potionsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    netGroup.setLifetimeEach(-1)
    gameover.visible=true
    restart.visible=true
     mosquito.addAnimation("move",mosquitoimg);
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  drawSprites();
}

function spawn1(){
  if(frameCount%60===0){
    var any1=Math.round(random(1,2))
    if(any1===1){
      spawnNet();
    }
    if(any1===2){
      spawnObstacles();
  }
  }
}
function spawnNet() {
  var net = createSprite(600,200,20,320);    
    var rand1 = Math.round(random(1,2));

    if(rand1===1){
      net.y=90;
      net.addImage("hallo",net2img)
    }
    if(rand1===2){
      net.y=310;
      net.addImage("hall",net1img)
    } 
    net.velocityX = -6;
    net.scale = 0.2  ;
    net.lifetime = 300;
    //net.debug=true
  net.setCollider("rectangle",0,0,500,1000)
  gameover.depth=net.depth+2
  restart.depth=net.depth+2
  mosquito.depth=net.depth+2
  score.depth=net.depth+2
  heart1.depth=net.depth+2
  heart2.depth=net.depth+2
  heart3.depth=net.depth+2
    netGroup.add(net);
  
}

function spawnObstacles() {
    var obstacle = createSprite(600,200,20,320);    
    var rand = Math.round(random(1,2));

    if(rand===1){
      obstacle.y=90;
      obstacle.addImage("no",plant2img)
    }
    if(rand===2){
      obstacle.y=310;
      obstacle.addImage("no",plant1img)
    } 
    obstacle.velocityX = -6 
    obstacle.scale = 0.5  ;
    obstacle.lifetime = 300;
    //obstacle.debug=true
    obstacle.setCollider("rectangle",-100,0,250,400)
    gameover.depth=obstacle.depth+2
    restart.depth=obstacle.depth+2
    mosquito.depth=obstacle.depth+2
    heart1.depth=obstacle.depth+2
    heart2.depth=obstacle.depth+2
    heart3.depth=obstacle.depth+2
    obstaclesGroup.add(obstacle);
      obstacle.shapeColor=('green')
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  netGroup.destroyEach();
  potionsGroup.destroyEach();
  life=3;
  mosquito.x=40
  mosquito.y=200;
  score=0; 
  heart3.visible=true;
  heart2.visible=true;
  heart1.visible=true;
   mosquito.addAnimation("move",mosquito_moving);
}
function spawnPotions(){
  if(frameCount%101 ===0){
  potions=createSprite(400,200,10,10)
    potions.addImage("poy",potsimg)
    potions.scale=0.2;
    potions.velocityX=-6
    var      rand3=Math.round(random(100,300));
    potions.y=rand3;
    potionsGroup.add(potions);
    potions.shapeColor=("red")
  }
}
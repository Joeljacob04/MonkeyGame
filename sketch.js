var ground, invisibleGround, groundImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var score;
var survivalTime;

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground7.jpg");
}



function setup() {
  createCanvas(600, 500);
  score=0;
  survivalTime=0;
  
  ground = createSprite(100,150,600,10);
  ground.addImage("background",groundImage);
  ground.scale =1;
  ground.x = ground.width /2;
  ground.velocityX = - 6;
  console.log(ground.x);
  
  monkey = createSprite(80,410,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(300,450,600,10);
  invisibleGround.visible = false;
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  
}


function draw() {
  ground.velocityX = -6;
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 350) {
        monkey.velocityY = -20;
    }
  
  if(bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach();
    score=score+1;
  }
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleGround);
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  fill("blue");
  textSize(20);
  text("Score:"+score,500,50);
  
  fill("red");
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,300,50)
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(650,400,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;   
   
   var rand = Math.round(random(1));
   switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
              default: break;
   }
   obstacle.scale = 0.25;
   obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
}
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(650,200,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -8;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
}


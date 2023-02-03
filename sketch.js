var trex,  trex_collided,trex_tanke;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var cloudsGroup, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg, gameOver, restart;
var jumpSound, checkPointSound, dieSound;
var ptero,ptero_img,pteroGroup
var bala,bala_img,bala_sound



function preload() {
trex_tanke =loadAnimation("tanke.png")
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

bala_img = loadImage("bala.png");
bala_sound=loadSound("bala-sound.mp3")




  obstacle1 = loadImage("EL EZPINOZO.png");
  obstacle2 = loadImage("EL PATAS CHUECAS.png");
  obstacle3 = loadImage("MESSI.png");
  obstacle4 = loadImage("obstacle3.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
ptero_img=  loadImage("ptero.png")

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {


  createCanvas(windowWidth, windowHeight);
  //crear sprite de trex
    trex = createSprite(50,height-70,20,50);
    trex.addAnimation("tanke", trex_tanke);
    trex.addAnimation("collided",trex_collided);


    trex.scale = 0.5;
    bala = createSprite(0.01,height-0.01);
    bala.addImage("bala_img",bala_img);
  
  bala.scale=0.1
  //crear sprite de suelo
    ground = createSprite(width/2,height-80,width,2);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    invisibleGround = createSprite(width/2,height-10,width,125);
    invisibleGround.visible = false;

    gameOver = createSprite(width/2, height/2-50);
    gameOver.addImage(gameOverImg);

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    var rand = Math.round(random(1,100));

    score = 0;

    obstaclesGroup = new Group();
    cloudsGroup = new Group();
    pteroGroup=new Group();

    trex.setCollider("circle",0,0,40);
    //trex.setCollider("rectangle",0,0,400,trex.height);
    trex.debug = false;

      
}

function draw() {
 


  background(255);





  //console.log("Hola" + trex.x);
  fill("black");
  text("Puntación "+score, width/2, 50);
  
  if(gameState == PLAY){
   

    gameOver.visible = false;
    restart.visible = false;

    //mueve el suelo
    ground.velocityX = -(4+3*score/100);

    //genera la puntución
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score % 100 == 0){
      checkPointSound.play();
    }

if((keyDown("right_arrow"))&&(frameCount % 25 == 0)){

shootbala();
}
if(obstaclesGroup.isTouching(bala)){
  obstaclesGroup.destroyEach()
  bala.destroy()
  bala_sound.play();
}


    //hacer que el trex salte al presionar la barra espaciadora
    if ((touches.length>0 || keyDown("space")) && trex.y>=height-120) {
      trex.velocityY = -12;
      jumpSound.play();
      touches = [];
      }
      trex.velocityY = trex.velocityY + 0.8
      
     /* if(keyDown("down_arrow")){
trex.changeAnimation("agachado")

      }
      if(keyWentUp("down_arrow")){
        trex.changeAnimation("running")
        
              }*/
              
      if (ground.x < 0) {
      ground.x = ground.width / 2;
      }
      //aparece las nubes
    spawnClouds();
    //aparece los obstaculos en el suelo
    spawnObstacles();
  spawnPtero();

      if((obstaclesGroup.isTouching(trex))||(pteroGroup.isTouching(trex))){
        gameState = END;
        dieSound.play();
        //trex.velocityY = -12;
        //jumpSound.play();
      }


  }else if(gameState == END){
    gameOver.visible = true;
    restart.visible = true;

    trex.velocityY = 0;

    //detiene el suelo
    ground.velocityX = 0;
    trex.changeAnimation("collided", trex_collided);

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    pteroGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
pteroGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      //console.log("Reinicia el juego");
      reset();
    }

   /* if(touches.length>0 || keyDown("space")){
      reset();
      touches = [];

    }*/
  }

 
  //console.log(trex.y);
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 == 0){
  cloud = createSprite(width+20,height,40,10);
  cloud.addImage(cloudImage);
  cloud.scale = 0.4;
  cloud.y = Math.round(random(10,60));
  cloud.velocityX = -3;

  cloud.lifetime = 350;
  cloudsGroup.add(cloud);

  //ajustar la profundidad
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  }
}

function spawnObstacles(){
  if(frameCount % 100 == 0){
    obstacle = createSprite(width+20,height-95,10,40);
    obstacle.velocityX = -(6+score/100);

    //generar los obtaculos al azar
    var rand = Math.round(random(1,6));
    switch (rand){
      case 1: 
        obstacle.addImage(obstacle1);
        obstacle.scale=0.1;
        break;
      case 2:
        obstacle.addImage(obstacle2);
        obstacle.scale=0.1;
        break;
      case 3:
        
        obstacle.addImage(obstacle3);
        obstacle.scale =  0.1
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default: break;
    }
    //asignar escala y ciclo de vida
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;

    obstaclesGroup.add(obstacle);

  }

}


function spawnPtero(){
  if(frameCount % 500 == 0){
  ptero = createSprite(width+20,height,40,10);
  ptero.addImage(ptero_img);
  ptero.scale = 0.4;
  ptero.y = Math.round(random(460,500));
  ptero.velocityX = -3;

  ptero.lifetime = 500;
  pteroGroup.add(ptero);

  //ajustar la profundidad
  ptero.depth = trex.depth;
  trex.depth = trex.depth + 1;
  }
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  pteroGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;


}
function shootbala(){
 // bala_sound.play();
  bala = createSprite(10,height-10);
  bala.addImage("bala_img",bala_img);

bala.scale=0.1
bala.y = trex.y
bala.x= trex.x
bala.velocityX=12
jumpSound.play();


}

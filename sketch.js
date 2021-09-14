
var trex ,trex_running;
var score=0 
var gamestate = "play"  
//intendaion : giving tab spaces in the beginning of the line

//load animations, images and sound
function preload () {
  trexani = loadAnimation ("trex1.png", "trex3.png", "trex4.png")
  groundani = loadImage ("ground2.png")
  cloudImg = loadImage ("cloud.png")
  ob1 = loadImage ("obstacle1.png")
  ob2 = loadImage ("obstacle2.png")
  ob3 = loadImage ("obstacle3.png")
  ob4 = loadImage ("obstacle4.png")
  ob5 = loadImage ("obstacle5.png")
  ob6 = loadImage ("obstacle6.png")
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite (50, 180, 20, 25)
  trex.addAnimation ("running", trexani)  
  trex.scale = 0.5

  ground = createSprite (300, 190, 600, 20)
  ground.addImage (groundani)

  ground2 = createSprite (300, 200, 600, 20)
  ground2.visible = false 

  cloudg =  createGroup()
  obstacleg = createGroup()
  
}

function draw(){
  background(180)
  //concatenation: joining 2 values using + sign
  text("Score = "+ score, 500,50)

  if (gamestate==="play") {
    
  score = score + Math.round(frameCount/70 )

  ground.velocityX = -4
  if (ground.x < 0 ) {
    ground.x = 600
  }

  if (keyDown ("space")&& trex.y>=166) {
  trex.velocityY = -6
  }
  trex.velocityY = trex.velocityY + 0.2 
  clouds();
  
  obstacles()
  if (trex.isTouching(obstacleg)){ 
    gamestate = "end"
  }

  } 

  if (gamestate==="end") {
    ground.velocityX = 0 
    obstacleg.setVelocityXEach(0)
    cloudg.setVelocityXEach(0)
  }
  trex.collide (ground2)
  drawSprites ()
 
}

function clouds () {
  if (frameCount%100===0) {
  var cloud = createSprite (600, random(30,100), 20, 25)
  cloud.velocityX = -3 
  cloud.addImage (cloudImg)
  cloud.scale = 0.5
trex.depth = cloud.depth+1
cloud.lifetime = 200
cloudg.add(cloud)
  }
}


function obstacles () {
  if (frameCount%120===0) {
  var obstacle = createSprite (600, 170, 20, 25)
  obstacle.velocityX = -3 
  obstacle.lifetime = 200
  var choice = Math.round(random(1,6))
  switch (choice){
    case 1 : obstacle.addImage(ob1)
    break 
    case 2 : obstacle.addImage(ob2)
    break 
    case 3 : obstacle.addImage(ob3)
    break 
    case 4 : obstacle.addImage(ob4)
    break 
    case 5 : obstacle.addImage(ob5)
    break 
    case 6 : obstacle.addImage(ob6)
    break  
  }
  obstacle.scale = 0.5 
  obstacleg.add(obstacle)
  }
}

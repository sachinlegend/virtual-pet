var dog, happyDog, dogimg;
var database;
var foods, foodStock;

function preload()
{
  dogimg = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy Dog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250,400);
  dog.scale = 0.2;
   dog.addImage(dogimg);

  foodStock = database.ref('food');
  foodStock.on('value',readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDog);
      }
    
 

  drawSprites();

  textSize(20)
  fill("yellow")
  stroke("black")
  strokeWeight("3")
  text("food_remaining : 20",250,250);

  textSize(10)
  fill("yellow")
  stroke("black")
  strokeWeight("3")
  text("Press UP_ARROW key to feed spark",100,150);
  

}

function readStock(data) {
  foods = data.val();
}

function writeStock(x) {
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    foods:x
  })
}




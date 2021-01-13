var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  dogImg = loadImage("dogImg1.png");
  happyDogImg = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;

  happyDog = createSprite(250,250,20,20);
  
 var foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);
  
}


function draw() {  

  background(rgb(46,139,87));

  if(keyWentDown(UP_ARROW)){
    writeStocks(foodS);

    happyDog.addImage(happyDogImg);
    happyDog.scale=0.2;
    dog.visible = false;
  }
  

  drawSprites();
  
  fill("white");
  stroke("red");
  strokeWeight(2);
  textSize(20);
  text("Press UP_ARROW Key To Feed Drago Milk",50,50);

  fill("white");
  stroke("red");
  strokeWeight(2);
  textSize(18);
  text("Food remaining : "+foodS,170,350);

}


function readStock(data){
  foodS = data.val();
}

function writeStocks(x){

  if(x <= 0){
    x=0;
  }else{
    x = x-1;
   
  }

  database.ref('/').set({
    Food:x
    
  })
}

function showError() {
  console.log("Error in writing the database")
}

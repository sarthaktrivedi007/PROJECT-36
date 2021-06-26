var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var currentTime;
var getFoodStock

//create feed and lastFed variable here
var feed , lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


 

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime = database.ref("FeedTime")
feedTime.on("value",function(data){
  lastFed= data.val()
})
fill(255,255,254)
textSize(15)

  if(lastFed>=12){
    // show time in PM format when lastFed is greater than 12
    text("last feed: " +lastFed%12+" PM",350,30)
    currentTime = hour();
  } else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30)
  }else{
    // show time in AM format when lastFed is less than 12
    text("last feed: " +lastFed+" AM",350,30)
  }

  
  
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var food_stock_var = foodObj.getFoodStock()
if (food_stock_var <= 0){
  foodObj.updateFoodStock(food_stock_var * 0)
}
else {
  foodObj.updateFoodStock(food_stock_var - 1)
}
  //write code here to update food stock and last fed time
  
    
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


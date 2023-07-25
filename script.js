
// Game variables
let inputdir={x:0,y:0};
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');
let renderinterval=0.2;
let lastPaintTime=0;
let score=0;
//Game functions


let snakearr=[{x:13,y:15}];

food={x:6,y:7};

function isCollide(snakearr){
// If the snake bumps into itself
if(snakearr[0].x>=18 || snakearr[0].x<0 || snakearr[0].y>=18 || snakearr[0].y<0){
    gameoversound.play();
    return 1;
}
for (let index = 1; index < snakearr.length; index++){
    if(snakearr[index].x===snakearr[0].x && snakearr[index].y===snakearr[0].y){
        gameoversound.play();
   return 1;
    }
   
}
return 0;
}
function gameEngine(){


    if(isCollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputdir={x:0,y:0};
        alert("Game Over . Press any key to play again.");
        snakearr=[{x:13,y:15}];
        score=0;

        let scorebox=document.querySelector(".score");
        scorebox.innerHTML="Score : "+score;

    }


    // If you ate the food , increment the score and regenerate the food

   if(snakearr[0].y===food.y && snakearr[0].x===food.x){
    foodsound.play();
    score+=1;

    

    snakearr.unshift({x:snakearr[0].x+inputdir.x,y: snakearr[0].y+inputdir.y});
    food={x:Math.round(2+(14)*Math.random()),y:Math.round(2+(14)*Math.random())};
    let scorebox=document.querySelector(".score");
    scorebox.innerHTML="Score : "+score;
    console.log(score);
   }

   // Moving the snake

   for (let i =snakearr.length-2; i>=0; i--){
    
    snakearr[i+1]={...snakearr[i]};
   }

   snakearr[0].x+=inputdir.x;
   snakearr[0].y+=inputdir.y;

    // Display the snake and food 

    // display the snake

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        snakeElement.classList.add('snakehead');

        board.appendChild(snakeElement);
    })

    //  display the food 


    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 <renderinterval){
        return;
    }

    lastPaintTime=ctime;
    gameEngine();
}

// Main logic
window.requestAnimationFrame(main);



window.addEventListener('keydown',e=>{

    inputdir={x:0,y:1}; // Start game 
    movesound.play();

    switch(e.key){
        case "ArrowUp":

            inputdir.x=0;
            inputdir.y=-1;
            break;

        case "ArrowLeft":
            
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowDown":
      
            inputdir.x=0;
            inputdir.y=1;
            break;

        case "ArrowRight":
           
            inputdir.x=1;
            inputdir.y=0;
            break;       
        
        default:
            break;
    }

});
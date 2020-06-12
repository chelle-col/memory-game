const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const key = 'score';
const hiScoreDisplay = document.getElementById("hi score");
const scoreDisplay = document.getElementById("score");
var score = 0;
var timer;
var firstCard = null;
var secondCard = null;
var matchedCards = [];

if(s = localStorage.getItem(key)){
  hiScoreDisplay.innerText = "Your Low Score is " + s;
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  gameHandlr(event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

function toggleFace(div){
  if(matchedCards.includes(div)){
    return;
  }
  if(div.style.backgroundColor === ''){
    turnFaceUp(div);
  }else{
    turnFaceDown(div);
  }
}


function turnFaceUp(div){
  //set color of div to color
  div.style.backgroundColor = div.classList.value;
  return true;
}

function turnFaceDown(div){
  //set color of div to white
  div.style.backgroundColor = '';
  return false;
}

function gameHandlr(div){
  //keeps track of whitch cards are face up/down
  //keep only a max of two face up at any one time
  //see if the colors match and add win state if they do
  if(matchedCards.includes(div)){
    return;
  }

  if(firstCard === null){
    firstCard = div;
    toggleFace(div);
  }else if(secondCard === null){
      secondCard = div;
      toggleFace(div);
      isMatched(firstCard, secondCard);
      timer = setTimeout(function(){doubleToggle(firstCard, div)}, 1000);
  }else{
      clearTimeout(timer);
      toggleFace(firstCard);          
      toggleFace(secondCard);
      toggleFace(div);
      firstCard = div;
      secondCard = null;
  }
  if(matchedCards.length === COLORS.length){
    winState();
    location.reload();
  };
}

function isMatched(div1, div2){
  if(div1===div2){
    return;
  }else if(div1.style.backgroundColor === div2.style.backgroundColor){
    matchedCards.push(div1);
    matchedCards.push(div2);
  }else{
    score++;
    scoreDisplay.innerText = "Your score this game is " + score;
  }
}

function winState(){
  if(lowScore = parseInt(localStorage.getItem(key))){
    if(lowScore > score){
      localStorage.setItem(key, score);
    }
  }else{
    localStorage.setItem(key, score);
  }
  alert("YOU WON!! \nYour score is " + score);
}

function doubleToggle(div1, div2){
  toggleFace(div1);
  toggleFace(div2);
  firstCard = null;
  secondCard = null;
}

function isFaceup(div){
  if(div.style.backgroundColor === ''){
    return false;
  }else{
    return true;
  }
}
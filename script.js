'use strict';

// Selecting elements 
const score0El= document.querySelector('#score--0');
const score1El= document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let btnroll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnhold = document.querySelector('.btn--hold');
let current0El=document.getElementById('current--0');
let current1El=document.getElementById('current--1');
let player0=document.querySelector('.player--0');
let player1=document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing; // Declare variables globally

const init = function(){
    // Reasigning a value
    scores =[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true; // |Variable que controla si se esta jugando o no y de esta forma detiene el juego.
   
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    // If active player is 0 assign 1 else assign 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore=0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
} 

//Rolling Dice Functionality
btnroll.addEventListener('click',function(){

    if(playing){
        // 1. Generate a random Dice Roll
        let dice = Math.trunc(Math.random()*6)+1;
        console.log(dice);
        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${dice}.png`;

        // 3. Check if dice is 1, if true, switch to next player.
        if(dice !== 1){
            //Add dice to current score
            currentScore += dice;
            // Select element dinamically
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        // Changing player
        }else{
            console.log(`Current active player is player ${activePlayer}`);
            //Switch to next player
            switchPlayer();

        }
    }
    

})

//Holding Functionality
btnhold.addEventListener('click',function(){
    if(playing){
        //1. Add current score to active player
        scores[activePlayer]+=currentScore;
        //scores[1] = scores[1]+currentScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    
        // Check score is already 100
        if(scores[activePlayer] >= 20){
            // If 100 finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //Disable buttons to stop the Game
        }else{
            // If not, switch to next player
            switchPlayer();
        }
    }

})


//Resetting Functionality
btnNew.addEventListener('click',function(){
  init();
})

/* CODE CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next 
players turn. (HINT: always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can
change the predefined score of 100. (HINT: you can read that value with the .value property
in JavaScript.)

3. Add another dice to the game, so that there are two dices now. The player looses his current
score when one of them is a 1. (HINT: you will need CSS to position the second dice, so take
a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying;
init();

let lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Get random number from #1 to #6
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
    
        // 2. Display the result
        // let diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    
        // 3. Update the round score IF the rolled number is NOT a 1
        if (dice1 !== 1 && dice2 !== 1){
            // Add score
            roundScore += dice1 + dice2;
            // Display the score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }

        // Code for the second challenge
        // if(dice === 6 && lastDice === 6){
        //     // Player looses score
        //     scores[activePlayer] = 0;

        //     // Update the UI
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();

        // } else if (dice !== 1){
        //     // Add score
        //     roundScore += dice;
        //     // Display the score
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     // Next player
        //     nextPlayer();
        // }
        // lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Add CURRENT score to a GLOBAL score
        scores[activePlayer] += roundScore;
    
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        let input = document.querySelector('.final-score').value;
        let winningScore;

        // Undefined, 0, null, '' are COERCED to false
        // Anything else is COERCED to true
        if(input){
            winningScore = input;
        } else {
            winningScore = 50;
        }

        // 3. Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDices();
    
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player function
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    hideDices();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    hideDices();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');    
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDices(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

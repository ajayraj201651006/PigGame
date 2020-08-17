/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score, roundScore, activePlayer;

score = [0, 0];
roundScore = 0;
activePlayer = 0;

// document.querySelector('#current-'+activePlayer).textContent = dice;
// document.querySelector('#current-1').innerHTML = `<em>${dice}</em>`;

document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.dice').style.display = 'none';

//parts of events and event handling-->
document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. Random Number 
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display Results
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-'+dice+'.png';

    // 3. updates the value of roundScore if the rolled number was not 1
    if(dice !== 1) {
        // Add Score
        roundScore += dice;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //toggle method add the active class if class is not present and remove the class if class is present--->
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceDom.style.display = 'none';
    }
});
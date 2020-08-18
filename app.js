/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, pastRoll, winScore;

init();

// document.querySelector('#current-'+activePlayer).textContent = dice;
// document.querySelector('#current-1').innerHTML = `<em>${dice}</em>`;

//parts of events and event handling(roll dice)-->
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random Number 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display Results
        var diceDom1 = document.getElementById('dice-1'), diceDom2 = document.getElementById('dice-2');
        diceDom1.style.display = 'block';
        diceDom1.src = 'dice-'+dice1+'.png';

        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-'+dice2+'.png';

        //check if at least one dice was not a 1
        if(dice1 !== 1 && dice2 !== 2) {
            roundScore += dice1 += dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore; 
        } else {
            //next Player
            nextPlayer();
        }
        
        // //if 6 comes 2 concurrent times(CODING CHALLANGE)
        // if(dice === 6 && pastRoll === 6) {
        //     scores[activePlayer] = 0;
        //     document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        //     nextPlayer();
        // } else {
        //     // 3. updates the value of roundScore if the rolled number was not 1
        //     if(dice !== 1) {
        //         // Add Score
        //         roundScore += dice;
        //         document.querySelector('#current-'+activePlayer).textContent = roundScore;
        //     } else {
        //         //Next Player
        //         nextPlayer();
        //     }
        // }
        // pastRoll = dice;
    }
});

//hold functionality-->
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add Current score to the global
        scores[activePlayer] += roundScore;

        //update the UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //sets wining score value(CODING CHALLANGE - 2)
        winScore = document.getElementById('winScore').value;
        var wins;

        if(winScore) {
            wins = winScore;
        } else {
            wins = 100;
        }

        //check if player won the game
        if(scores[activePlayer] >= wins) {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle method add the active class if class is not present and remove the class if class is present--->
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

//Implement New Game functionality
document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
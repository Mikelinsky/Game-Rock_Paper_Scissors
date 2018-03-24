/* ----------------------------------------------------------------
                    GET ELEMENTS 
---------------------------------------------------------*/
//              new game button
var newGameBtn = document.getElementById('js-newGameButton');
//              player choice 
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');
//      new game, player choice, result table container
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
//              scoreboard
var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');

var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
//              winner
var winnerElem = document.getElementById('js-winnerElem');
var displayWinner = document.getElementById('js-winner');
/* ----------------------------------------------------------------
                    GAME STATUS
-------------------------------------------------------------*/
var gameState = 'notStarted'; //started // ended // notStarted
var player = {
    name: '',
    score: 0
 };

var computer = {
    score: 0
 };

 /* ---------------------------------------------------------
                    EVENT HANDLERS
-------------------------------------------------------------*/
//               new game button
newGameBtn.addEventListener('click', newGame);

//                player choice 
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

/* ------------------------------------------------------------------
                DISPLAYING GAME CONTAINERS
---------------------------------------------------------------*/
function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            winnerElem.style.display = 'none'
        break;
    
        case 'ended':
            newGameBtn.innerText = 'Play again';
            winnerElem.style.display = 'block';   //display winner
    
        case 'notStarted':
        
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';

    }
}

setGameElements();

/*----------------------------------------------------------------
                START GAME
-------------------------------------------------------------*/
//function from newGameBtn.addEventListener('click', newGame);
function newGame() {
    player.name = prompt('Please enter your name', 'Player name');
    
    playerResultElem.innerHTML = 'Player Score';
    computerResultElem.innerHTML = 'Computer Score';
    
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
    
        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}
/*----------------------------------------------------------------
                PLAYER SELECTION
--------------------------------------------------------*/
function playerPick(playerPick) {
    console.log(playerPick);
}
/*-------------------------------------------------------------
                COMPUTER SELECTION 
-------------------------------------------------------*/
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
   
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}
/* -------------------------------------------------------------
                    GAME LOGIC
------------------------------------------------------------*/
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = computerResultElem.innerHTML = 'Draw';
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {
            winnerIs = 'computer';
    }
    
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
    setWinner();

}
/* ------------------------------------------------------------------
                    WINNER
---------------------------------------------------------- */

function setWinner() {
    if (computer.score === 10) {
        gameState = 'ended';
        displayWinner.innerText = 'Computer';
        console.log('The Winner is Computer');
    } else if (player.score === 10) {
        gameState = 'ended';
        displayWinner.innerText = player.name;
        console.log('The Winner is ' + player.name);
    }
    setGameElements();
}
//          result update
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
};
// /*----- constants -----*/ things that will never change
const PLAYERS = { //all caps when it is a variable that will never change
    '1': 'X', // player 1
    '-1': 'O', // player 2
    'null': ''
}; 

const COMBOS = [ //all possible winning combinations stored in this mini database
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// /*----- app's state (variables) -----*/variables that will change when state changes
let winner, turn, gameboard;

// /*----- cached element references -----*/parts of the DOM that will be interacted with
const $squareEls = $('.square');
const $messageEl = $('h2');
const $buttonEl = $('button');
const $gameboardEl = $('#gameboard');

/*----- event listeners -----*/
$buttonEl.click(init); // click to reset the game
$gameboardEl.on('click', '.square', handleClick);
/*----- functions -----*/
init(); // initial load of game
function init(){
    winner = false;
    turn = 1;
    gameboard = new Array(9).fill(null);
    render();
}

function getWinner() {
    for(let i = 0; i < COMBOS.length; i++){
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] + 
                    gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]]
    }
    if(gameboard.includes(null)) return false;
    return 'T';
}

function handleClick(evt) {
    const position = evt.target.dataset.index;
    if(gameboard[position] || winner) return; //exit function immediatly if gameboard position is falsey
    gameboard[position] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function render(){
    gameboard.forEach(function(value, index){
        $squareEls.eq(index).text(PLAYERS[value])
    });
    if(!winner){
        $messageEl.text(`${PLAYERS[turn]}'s Turn`);
    } else if (winner === 'T'){
        $messageEl.text(`Tie Game!`);
    } else { 
        $messageEl.text(`${PLAYERS[winner]} Wins!`);
    }
    
}
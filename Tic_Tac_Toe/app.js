// Get HTML Elements 

const status = document.querySelector('.status');
const reset = document.querySelector('.reset');
const box = document.querySelectorAll('.box');  // return all matching elements in an array

// Game Variables 
let gameIsLive = true;
let xIsNext = true;
let winner = null;

// Game constants
const xIcon = '×';
const oIcon = '○';

// Reset the board 
const handleReset = () => {
    xIsNext = true; 
    status.innerHTML = `${xIcon} is next...`; 
    for(let cell of box) {
        cell.classList.remove('X');
        cell.classList.remove('O');
    }
 };


const handleBoxClick = (event) => {
    const classArray = event.target.classList;
    // get the second class from the box element for eg top-left -- location of the box
    const location = classArray[1];
    // Before drawing X or O chcek if the box is empty 
    if (!gameIsLive && classArray[2] === 'X' || classArray[2] === 'O') {
        return;
    } else {
        if (xIsNext) {
            // on click add x if xIsNext is true
            event.target.classList.add('X');
            // Toggle the value to simulate alternative moves
            xIsNext = !xIsNext;
            status.style.color = 'tomato';
            checkGameStatus();
        } else {
            // add O on click if xIsNext is not true that means last click was played with X
            event.target.classList.add('O');
            xIsNext = !xIsNext;
            status.style.color = 'yellowgreen';
        }
    }

}


const letterToSymbol = (letter) => { letter === 'X' ? xIcon : oIcon };

const checkGameStatus = () => {
    const top_left = box[0].classList[2];
    const top_middle = box[1].classList[2];
    const top_right = box[2].classList[2];
    const middle_left = box[3].classList[2];
    const middle_middle = box[4].classList[2];
    const middle_right = box[5].classList[2];
    const bottom_left = box[6].classList[2];
    const bottom_middle = box[7].classList[2];
    const bottom_right = box[8].classList[2];

    // Check winning combinations
    // Horizontal cases 
    if (top_left && top_middle && top_right && top_left === top_middle && top_middle === top_right) {
        box[0].classList.add('won');
        box[1].classList.add('won');
        box[2].classList.add('won');
        handleWin(letterToSymbol(top_left));
    } else if(middle_left && middle_middle && middle_right &&  middle_left === middle_middle && middle_middle === middle_right){
        box[3].classList.add('won');
        box[4].classList.add('won');
        box[5].classList.add('won');
        handleWin(middle_left);
    } else if(bottom_left && bottom_middle && bottom_right &&  bottom_left === bottom_middle && bottom_middle === bottom_right){
        box[6].classList.add('won');
        box[7].classList.add('won');
        box[8].classList.add('won');
        handleWin(bottom_left);
    } 
    // Vertical cases 
    else if(top_left && middle_left && bottom_left &&  top_left === middle_left && middle_left === bottom_left){
        box[0].classList.add('won');
        box[3].classList.add('won');
        box[6].classList.add('won');
        handleWin(top_left);
    } 
    else if(top_middle && middle_middle && bottom_middle &&  top_middle === middle_middle && middle_middle === bottom_middle){
        box[1].classList.add('won');
        box[4].classList.add('won');
        box[7].classList.add('won');
        handleWin(top_middle);
    } 
    else if(top_right && middle_right && bottom_right &&  top_right === middle_right && middle_right === bottom_right){
        box[2].classList.add('won');
        box[5].classList.add('won');
        box[8].classList.add('won');
        handleWin(top_right);
    } 
    // Diagonal wins
    else if(top_left && middle_middle && bottom_right &&  top_left === middle_middle && middle_middle === bottom_right){
        box[0].classList.add('won');
        box[4].classList.add('won');
        box[8].classList.add('won');
        handleWin(bottom_left);
    } else if(top_right && middle_middle && bottom_left &&  top_right === middle_middle && middle_middle === bottom_left){
        box[2].classList.add('won');
        box[4].classList.add('won');
        box[6].classList.add('won');
        handleWin(bottom_left);
    } else if(top_left && top_right && top_middle && middle_right && middle_left && middle_middle && bottom_right && bottom_left && bottom_middle){
        status.innerHTML = `Game draw!`;
        status.style.color = 'black';
    } else {
        if(xIsNext) {
            status.style.color = 'yellowgreen';
            status.innerHTML = `${xIcon} is next...`;
        } else {
            status.innerHTML = `${oIcon} is next...`;
            status.style.color = 'tomato';
        }
    }
};
// Handle all the winning combinations here instead of hardcoding and duplicating the code in checkGameStatus function 
const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    // TODO  - show symbol and not hardcoded 'X' or 'O'
    //  status.innerHTML = `${letterToSymbol(top_left)} has won the game!`;
    if (winner === 'X') {
        status.innerHTML = `${winner} has won the game!`;
        status.style.color = 'yellowgreen';
    } else {
        status.innerHTML = `<span> ${winner} has won the game! </span>`;
        status.style.color = 'tomato';
    }
}; 

// ############ Event Handlers ##############

// Event listeners for all of the 9 boxes and reset button 
reset.addEventListener('click', handleReset);

for (const cell of box) {
    cell.addEventListener('click', handleBoxClick);
}



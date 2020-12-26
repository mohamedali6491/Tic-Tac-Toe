const items = document.querySelectorAll('.item');
const grid = document.getElementById('grid');
const winner = document.querySelector('.winner');
const winner_Msg = document.querySelector('.winner_Msg');
const restart_btn = document.getElementById('restart_btn');
const X = 'x';
const O = 'o';
const WIN_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn;

items.forEach(item => {
    item.addEventListener('click', handle, { once: true })
});

start();

function start() {
    turn = false;
    items.forEach(item => {
        item.classList.remove(X);
        item.classList.remove(O);
        item.removeEventListener('click',handle);
        item.addEventListener('click', handle, { once: true });
    });
    setHover();
    winner.classList.remove('show');
    
}

function handle(e) {
    //put the mark
    const item = e.target;
    const currentClass = turn ? O : X;
    putMark(item, currentClass);

    //check for winning
    if (win(currentClass)) {
        end(false);
    } else if (isDraw()) {
        //check for draw
        end(true);
    } else {
        //switch player
        switchTurn();
        setHover();
    }
}

function isDraw() {
    return [...items].every(item => {
        return item.classList.contains(O) || item.classList.contains(X)
    });
}

function win(current) {
    return WIN_COMBO.some(combo => {
        return combo.every(index => {
            return items[index].classList.contains(current)
        })
    });
}

function end(draw) {
    if (draw) {
        winner_Msg.innerHTML = `It's a Draw!`;
    } else {
        winner_Msg.innerHTML = `${turn ? "O's" : "X's"} Wins!`;
    }
    winner.classList.add('show');
}

function putMark(item, current) {
    item.classList.add(current);
}

function switchTurn() {
    turn = !turn;
}

function setHover() {
    grid.classList.remove(X);
    grid.classList.remove(O);
    if (turn) {
        grid.classList.add(O)
    } else {
        grid.classList.add(X);
    }
}

//restart_btn
restart_btn.addEventListener('click',start);
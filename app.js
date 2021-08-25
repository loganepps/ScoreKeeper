const p1 = {
    num: 1,
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    title: document.querySelector('#p1Title'),
    trophy: '<h2 class="title is-5">YOU WIN!<i class="fas fa-trophy" aria-hidden="true"></i></h2>'
}

const p2 = {
    num: 2,
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    title: document.querySelector('#p2Title'),
    trophy: '<h2 class="title is-5">YOU WIN!<i class="fas fa-trophy" aria-hidden="true"></i></h2>'
}
// const p3 = {
//     score: 0,
//     button: document.querySelector('#p3Button'),
//     display: document.querySelector('#p3Display')
// }
// const p4 = {
//     score: 0,
//     button: document.querySelector('#p4Button'),
//     display: document.querySelector('#p4Display')
// }

const resetButton = document.querySelector('#reset');
const playToSelect = document.querySelector('#playTo');
let winningScore = 1;
let isGameOver = false;

// MODES
// pingPong
// function isPingPongWin(player, opponent) {
//     if (player.score === opponent.score + 2){
//         return true;
//     }
// }
//

async function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            player.title.classList.add('isWinner');
            player.title.innerHTML = player.trophy;
            opponent.display.classList.add('has-text-grey-lighter');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function () {
    updateScore(p1, p2);
})

p2.button.addEventListener('click', function () {
    updateScore(p2, p1);
})

playToSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-grey-lighter');
        p.title.classList.remove('isWinner');
        p.title.innerHTML = `Player ${p.num}`;
        p.button.disabled = false;
    }
}
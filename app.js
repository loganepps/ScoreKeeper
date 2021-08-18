const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    title: document.querySelector('#p1Title')
    // trophy: document.querySelector('#p1Trophy')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    title: document.querySelector('#p2Title')
    // trophy: document.querySelector('#p2Trophy')
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

const resetButton  = document.querySelector('#reset');
const playToSelect = document.querySelector('#playTo');
let winningScore = 1;
let isGameOver   = false;

// MODES
// pingPong
// function isPingPongWin(player, opponent) {
//     if (player.score === opponent.score + 2){
//         return true;
//     }
// }
//

const animate = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

async function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            player.title.classList.add('isWinner');
            opponent.display.classList.add('has-text-grey-lighter');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function() {
    updateScore(p1, p2);
})

p2.button.addEventListener('click', function() {
    updateScore(p2, p1);
})

playToSelect.addEventListener('change', function() {
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
        p.button.disabled = false;
    }
}
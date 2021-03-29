const documentBtns = document.querySelectorAll('body > button');
documentBtns.forEach(btn => {
    btn.addEventListener('mousedown', playerBtnClick)
});


let sequence = [];
let copyOfSequence = [];


const highScore = document.getElementById('high-score-display');
if (!localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', sequence.length)
}
else {
    highScore.innerText = localStorage.getItem('highScore');
}

const colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'yellow'
}

let round = 1;
let gameOver = false

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', playRound);

function playRound() {
    startBtn.disabled = true;
    if (gameOver == true) startBtn.disabled = false;

    // Add new random color to sequence
    let nextColor = colors[getRandomIntInclusive(1, 4)];
    sequence.push(nextColor)

    // Show current sequence to user
    flashSequence(sequence)

    //Copy sequence to array we want to change
    copyOfSequence = [...sequence]
}

const currentScore = document.getElementById('current-score-display');
let canClick = false
function playerBtnClick(e) {
    if (!canClick) return

    const btnClicked = e.target;
    const colorClicked = e.target.dataset.color;
    const colorExpected = copyOfSequence.shift();

    if (colorExpected == colorClicked) {
        flashFromClick(btnClicked)
        if (copyOfSequence.length == 0) {
            startBtn.innerText = "Good job!"
            startBtn.style.backgroundColor = "#33ffe6"

            setTimeout(() => {
                currentScore.innerText = round
                round++;
                playRound()
            }, 1000)
        }
    }
    else {
        canClick = false

        gameOver = true
        startBtn.innerHTML = "Wrong color!<br /> Play again?"
        startBtn.disabled = false

        if (round - 1 > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', round - 1);
            highScore.innerText = round - 1;
        }


        round = 1;
        sequence = []
        currentScore.innerText = sequence.length
    }
}


const flashInSequence = (panelElement) => {
    return new Promise(resolve => {

        panelElement.classList.add('lit');

        // Wait then unlight current btn
        setTimeout(() => {
            panelElement.classList.remove('lit')
        }, 500)

        // Wait then start time for next btn in sequence
        setTimeout(() => {
            resolve();
        }, 600)
    })
}

const flashFromClick = (panelElement) => {
    return new Promise(resolve => {

        setTimeout(() => {
            // Light up current btn
            panelElement.classList.add('clicked');
        }, 100)

        // Wait then unlight current btn
        setTimeout(() => {
            panelElement.classList.remove('clicked');
        }, 400)

        setTimeout(() => {
            resolve();
        }, 800)
    })
}


const flashSequence = async (copyOfSequence) => {
    canClick = false
    startBtn.innerText = "Pay attention"
    startBtn.style.backgroundColor = "#7f0000"
    startBtn.style.color = "#fff"
    for (const btn of copyOfSequence) {
        const currentBtn = [...documentBtns].find(element => element.dataset.color == btn)
        await flashInSequence(currentBtn)
    }
    setTimeout(() => {
        startBtn.innerText = "Your turn"
        startBtn.style.color = "#000"
        startBtn.style.backgroundColor = "#e5e500"
        canClick = true
    }, 200)

}

























function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


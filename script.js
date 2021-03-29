const startBtn = document.getElementById('startBtn');
const documentBtns = document.querySelectorAll('body > button');

// Activate eventListeners
documentBtns.forEach(btn => {
    btn.addEventListener('mousedown', playerBtnClick)
});

startBtn.addEventListener('click', playRound);

let sequence = [];
let copyOfSequence = [];

const colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'yellow'
}

let round = 1;
let gameOver = false
function playRound() {
    startBtn.disabled = true;
    if (gameOver == true) startBtn.disabled = false;
    console.log("Round ", round)

    // Add new random color to sequence
    let nextColor = colors[getRandomIntInclusive(1, 4)];
    sequence.push(nextColor)

    // Show current sequence to user
    console.log("Sequence: ", sequence);

    // Flash btns from sequence
    flashSequence(sequence)

    //Copy sequence to array we want to change
    copyOfSequence = [...sequence]
}

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
                round++;
                playRound()
            }, 1000)
        }
    }
    else {
        gameOver = true
        startBtn.innerHTML = "Wrong color!<br /> Play again?"
        startBtn.disabled = false
        round = 1;
        sequence = []
    }
}


const flashInSequence = (panelElement) => {
    return new Promise(resolve => {

        // Wait then light current btn
        setTimeout(() => {
            panelElement.classList.add('lit');
        }, 100)

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
            console.log("panelElement:",panelElement)
            panelElement.classList.add('clicked');
            console.log("panelElement.classList:",panelElement.classList)
        }, 100)

        // Wait then unlight current btn
        setTimeout(() => {
            panelElement.classList.remove('clicked');
        }, 200)

        setTimeout(() => {
            resolve();
        }, 800)
    })
}


const flashSequence = async (copyOfSequence) => {
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


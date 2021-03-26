const startBtn = document.getElementById('startBtn');
const btns = document.querySelectorAll('body > button');

btns.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
        e.target.classList.add('lit')
    })
    btn.addEventListener('mouseup', (e) => {
        e.target.classList.remove('lit')
    })
})

startBtn.addEventListener('click', startRound);

let sequence = [];

const colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'yellow'
}

function startRound() {
    let gameOver = false
    let round = 1;
    // Move startbutton off screen
    do {
        console.log("Round ", round)
        let nextColor = colors[getRandomIntInclusive(1, 4)];
        sequence.push(nextColor)


        lightUpSequence(0, sequence)

        // Turn off all lights
        

        round++;
        if (true) gameOver = true
    } while (!gameOver)
}

function lightUpSequence(counter, sequence) {
    if (counter < sequence.length) {
        setTimeout(() => {
            //Light up correct button
            console.log("Color lit: ", sequence[counter]);

            // Clear lit class from all btns
            btns.forEach(btn => btn.classList.remove('lit'));

            const litBtn = [...btns].find(btn => btn.dataset.color == sequence[counter])
            console.log("Lit btn: ", litBtn)
            console.log("litBtn.classlist: ", litBtn.classList)
            litBtn.classList.add('lit')

            counter++;
            lightUpSequence(counter, sequence);
        }, 500);
    }
}



























function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


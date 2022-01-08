const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            dinoJump();
        }
    }
}

function dinoJump() {
    isJumping = true;
    let UpInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(UpInterval);
            //descendo
            let DownInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(DownInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }      
            }, 30)
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }    
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1100;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //gameOver
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
        } else {
            cactusPosition -= 15;
            cactus.style.left = cactusPosition + 'px'; 
        }
    }, 40);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);


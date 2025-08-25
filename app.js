let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener('keydown' , (event) => {
    if(started == false) {
       started = true;  
       levelUp();
    }
});

let start = document.querySelector('.restart')
start.addEventListener('click' , (event) => {
    if(started == false) {
        started = true;
        start.innerText = "Restart"
        levelUp();
    } else {
        resetGame();
    }  
});

let btns = document.querySelectorAll('.btn');
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    let btn = Math.floor(Math.random() * 4);
    gameSeq.push(btn);
    gameFlash(btns[btn]);
}

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() =>{
        btn.classList.remove('flash')
    }, 300);
}


function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(() =>{
        btn.classList.remove('userflash')
    }, 300);
}

function btnPress(btn) {
    userSeq.push(btn);
    userFlash(btns[btn]);
    if(gameSeq.length == userSeq.length) {
        if(checkAns()) {
            setTimeout(() =>{
                levelUp();
                userSeq = [];  
            }, 1000);
        } else {
            h2.innerText = `Wrong Sequence \n Your Highest Score is ${level-1}  \n Press any Key To Restart`;
            resetGame();
        }
    }
}

for (let i = 0 ; i < btns.length ; i++) {
    btns[i].addEventListener('click', (event) => {
        btnPress(i);
    })
}

function checkAns() {
    return gameSeq.every((val,idx) => val === userSeq[idx]);
}


function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}





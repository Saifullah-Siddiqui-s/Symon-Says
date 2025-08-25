let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector("h2");
let p = document.querySelector('#higestScore');

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
    userSeq = []; 
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
    checkAns(userSeq.length-1);
}

for (let i = 0 ; i < btns.length ; i++) {
    btns[i].addEventListener('click', (event) => {
        btnPress(i);
    })
}


function checkAns(idx) {
    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length) {
            h2.innerText = `Well Done`;
            setTimeout(() =>{
                levelUp(); 
            }, 1000);
        }

    } else {
        window.navigator.vibrate(400);
        let body = document.querySelector('body');
        body.style.backgroundColor = "#a5312f7b";
        body.classList.add('shake');
        setTimeout(()=> {
            body.style.backgroundColor = "";
            body.classList.remove('shake');
        },300)
        highscore = Math.max(highscore, level-1);
        p.innerText  = `Highest Score : ${highscore}`
        h2.innerText = `Wrong Sequence \n Your Score is ${level-1} \n  \n Press any Key To Restart`;
        resetGame();
    }
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    start.innerText = "Start Game"
}

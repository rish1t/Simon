let gameSeq = [];
let userSeq = [];

let Highscore = 0;
let btns = ["yellow","red","purple","green"];

let started = false;
let playing = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("click", function(){
    if(started == false){
        console.log("Game has started");
        started = true;

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);

    playSeq();
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
}

function btnPress() {
    if (!started || playing == true){
        return;
    }
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            if(level >= Highscore){ 
                Highscore = level;
                document.querySelector("h3").innerHTML = `Highscore : ${Highscore}`; 
            }
            setTimeout(function () {
                levelUp();
            },1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was : <b>${level-1}</b><br> Click anywhere to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function(){
            document.querySelector("body").style.backgroundColor =  `rgb(25, 25, 25)`;
        },150);
        setTimeout(function () {
            Reset();
        },3000);
    }
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function Reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function playSeq() {
    playing = true;

    for (let i = 0; i < gameSeq.length; i++) {
        setTimeout(function () {
            let randBtn = document.querySelector(`.${gameSeq[i]}`);
            btnFlash(randBtn);
        }, i * 400); 
    }
    playing = false;
}

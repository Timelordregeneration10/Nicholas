var currentLunbo = 0;
var lunboimgs = document.getElementsByClassName("lunbo-img");
var lunbobots = document.getElementsByClassName("lunbo-dot");
var lunbotitles = document.getElementsByClassName("lunbo-title");

function changeCurrentLunbo(oldLunbo, newLunbo) {

    if (newLunbo == oldLunbo) return;
    lunbobots[newLunbo].classList.replace("lunbo-waitingdot", "lunbo-currentdot");
    lunbobots[oldLunbo].classList.replace("lunbo-currentdot", "lunbo-waitingdot");
    lunbotitles[newLunbo].style.backgroundColor = "#91bef0";
    lunbotitles[oldLunbo].style.backgroundColor = "transparent";
    if (newLunbo < oldLunbo) {
        lunboimgs[newLunbo].classList.replace("lunbo-leftimg", "lunbo-currentimg");
        lunboimgs[oldLunbo].classList.replace("lunbo-currentimg", "lunbo-rightimg");
    }
    else {
        lunboimgs[newLunbo].classList.replace("lunbo-rightimg", "lunbo-currentimg");
        lunboimgs[oldLunbo].classList.replace("lunbo-currentimg", "lunbo-leftimg");
    }
    for (let i = 0; i < newLunbo; i++) {
        lunboimgs[i].classList.replace("lunbo-rightimg", "lunbo-leftimg");
    }
    for (let i = newLunbo + 1; i < lunboimgs.length; i++) {
        lunboimgs[i].classList.replace("lunbo-leftimg", "lunbo-rightimg");
    }
}

//click bot to change current lunboimg
for (let i = 0; i < lunboimgs.length; i++) {
    lunbobots[i].onclick = function () {
        changeCurrentLunbo(currentLunbo, i);
        currentLunbo = i;
        clearInterval(playlunbo);
        playlunbo = setInterval(playlunbofunc, 4000);
    };
    lunboimgs[i].style.zIndex = 10 - i;
}

document.getElementById("lunbo-left").onclick = function () {
    let nextLunbo = (currentLunbo - 1 + lunboimgs.length) % lunboimgs.length;
    changeCurrentLunbo(currentLunbo, nextLunbo);
    currentLunbo = nextLunbo;
    clearInterval(playlunbo);
    playlunbo = setInterval(playlunbofunc, 4000);
}

document.getElementById("lunbo-right").onclick = function () {
    let nextLunbo = (currentLunbo + 1) % lunboimgs.length;
    changeCurrentLunbo(currentLunbo, nextLunbo);
    currentLunbo = nextLunbo;
    clearInterval(playlunbo);
    playlunbo = setInterval(playlunbofunc, 4000);
}

function playlunbofunc() {
    let nextLunbo = (currentLunbo + 1) % lunboimgs.length;
    changeCurrentLunbo(currentLunbo, nextLunbo);
    currentLunbo = nextLunbo;
}

//auto play lunbo
var playlunbo = setInterval(playlunbofunc, 4000);


//add defu
var all = document.getElementsByClassName("box-all")[0];
var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
var lunbosceneCurrentscale = 0;
function handleLunbosceneScroll() {
    if (all.scrollTop >= lunbosceneHeight) {
        lunbosceneCurrentscale = lunbosceneHeight / 20
        return;
    }
    lunbosceneCurrentscale = all.scrollTop / 20;
    lunbosceneTrans();
}

function lunbosceneTrans() {
    document.getElementsByClassName("box-lunboscene-frame")[0].style.transform = `translateY(-${(lunbosceneCurrentscale)*-2}vh)`;
    document.getElementById("lunbo-leftRem").style.transform = `translate(0vw, ${lunbosceneCurrentscale * (-1) + 13}vh)`;
    document.getElementById("lunbo-center1Rem").style.transform = `translate(-15vw, ${lunbosceneCurrentscale * (-3) + 65}vh)`;
    document.getElementById("lunbo-center2Rem").style.transform = `translate(17.5vw, ${lunbosceneCurrentscale * (-2) - 0}vh)`;
    document.getElementById("lunbo-rightRem").style.transform = `translate(0vw, ${lunbosceneCurrentscale * (-4) + 45}vh)`;
}

function lunboLoop(){
    handleLunbosceneScroll();
    requestAnimationFrame(lunboLoop);
}
lunboLoop();
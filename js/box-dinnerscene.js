
var all = document.getElementsByClassName("box-all")[0];
var dnst = document.getElementsByClassName("box-dinner")[0].style;
var dinnerWidth = document.getElementsByClassName("box-dinner")[0].offsetWidth;

var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
var televHeight = document.getElementsByClassName("telev")[0].offsetHeight;

document.getElementsByClassName("box-dinnerscene")[0].style.height = `${dinnerWidth - window.innerWidth + window.innerHeight}px`;

function handleDinnerScroll() {
    let currentpos = all.scrollTop - lunbosceneHeight - televHeight + window.innerHeight;
    if (currentpos <= 0) {
        dnst.transform = `translate(0px,0px)`;
    }
    else if (currentpos <= window.innerHeight) {
        dnst.transform = `translate(0,0)`;
    }
    else if (currentpos <= dinnerWidth - window.innerWidth + window.innerHeight) {
        dnst.transform = `translate(${-(currentpos - window.innerHeight)}px,0)`;
    }
    else if (currentpos <= dinnerWidth - window.innerWidth + 2 * window.innerHeight) {
        dnst.transform = `translate(${-(dinnerWidth - window.innerWidth)}px,0)`;
    }
    else {
        dnst.transform = `translate(${-(dinnerWidth - window.innerWidth)}px,0)`;
    }
}

function dinnerLoop() {
    handleDinnerScroll();
    requestAnimationFrame(dinnerLoop);
}
dinnerLoop();
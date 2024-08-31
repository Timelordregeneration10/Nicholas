
import TWEEN from "tween";

var lastscroll = 0;
var all = document.getElementsByClassName("box-all")[0];

document.getElementById("navi-contact-qq").onclick = function () {
    document.getElementById("navi-contact").innerHTML = "3497049745";
}

document.getElementById("navi-contact-weixin").onclick = function () {
    document.getElementById("navi-contact").innerHTML = "timelord10point5";
}

document.getElementById("navi-contact-phone").onclick = function () {
    document.getElementById("navi-contact").innerHTML = "18916041340";
}

document.getElementById("navi-contact-mail").onclick = function () {
    document.getElementById("navi-contact").innerHTML = "3497049745@qq.com";
}

var naviItems = document.getElementsByClassName("navi-item");

var currentposRange = [];
currentposRange[0] = 0;
var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
currentposRange[1] = currentposRange[0] + lunbosceneHeight;
var televHeight = document.getElementsByClassName("telev")[0].offsetHeight;
currentposRange[2] = currentposRange[1] + televHeight;
var dinnerHeight = document.getElementsByClassName("box-dinnerscene")[0].offsetHeight;
currentposRange[3] = currentposRange[2] + dinnerHeight;
var gameHeight = document.getElementsByClassName("box-game")[0].offsetHeight;
currentposRange[4] = currentposRange[3] + gameHeight;
var appHeight = document.getElementsByClassName("box-app")[0].offsetHeight;
currentposRange[5] = currentposRange[4] + appHeight;
var questionHeight = document.getElementsByClassName("box-questionnaire")[0].offsetHeight;
currentposRange[6] = currentposRange[5] + questionHeight;
var drawingHeight = document.getElementsByClassName("box-drawing")[0].offsetHeight;
currentposRange[7] = currentposRange[6] + drawingHeight;
var mazeHeight = document.getElementsByClassName("box-maze")[0].offsetHeight;
currentposRange[8] = currentposRange[7] + mazeHeight;
var RemCatchHeight = document.getElementsByClassName("box-RemCatch")[0].offsetHeight;
currentposRange[9] = currentposRange[8] + RemCatchHeight;

var currentOption = 1;
function handleCurrentOptionchange(op) {
    if (op == currentOption) { return; }
    naviItems[currentOption - 1].style.color = "white";
    naviItems[op - 1].style.color = "violet";
    currentOption = op;
}

for (let i = 0; i < naviItems.length; i++) {
    naviItems[i].onclick = function () {
        new TWEEN.Tween({ pos: all.scrollTop })
            .to({ pos: currentposRange[i] }, Math.abs(all.scrollTop - currentposRange[i]) / 10)
            .onUpdate(function (obj) {
                all.scrollTop = obj.pos + 1;
            })
            .start();
    }
}

function findCurrentOption() {
    if (all.scrollTop <= currentposRange[1]) { handleCurrentOptionchange(1); currentOption = 1; }
    else if (all.scrollTop <= currentposRange[2]) { handleCurrentOptionchange(2); currentOption = 2; }
    else if (all.scrollTop <= currentposRange[3]) { handleCurrentOptionchange(3); currentOption = 3; }
    else if (all.scrollTop <= currentposRange[4]) { handleCurrentOptionchange(4); currentOption = 4; }
    else if (all.scrollTop <= currentposRange[5]) { handleCurrentOptionchange(5); currentOption = 5; }
    else if (all.scrollTop <= currentposRange[6]) { handleCurrentOptionchange(6); currentOption = 6; }
    else if (all.scrollTop <= currentposRange[7]) { handleCurrentOptionchange(7); currentOption = 7; }
    else if (all.scrollTop <= currentposRange[8]) { handleCurrentOptionchange(8); currentOption = 8; }
    else if (all.scrollTop <= currentposRange[9]) { handleCurrentOptionchange(9); currentOption = 9; }
    else { currentOption = -1; }
}

function naviLoop() {
    // console.log(all.scrollTop, lastscroll);
    findCurrentOption();
    if (lastscroll > all.scrollTop) {
        document.getElementsByClassName("navi")[0].style.transform = "translateY(0vh)";
    }
    else if (lastscroll < all.scrollTop) {
        document.getElementsByClassName("navi")[0].style.transform = "translateY(-10.3vh)";
    }
    lastscroll = all.scrollTop;
    TWEEN.update();
    requestAnimationFrame(naviLoop);
}
naviLoop();
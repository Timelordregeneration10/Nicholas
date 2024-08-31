import { generate, autoscrollfunc } from "../components/question.js";
generate(0);
autoscrollfunc();


var all = document.getElementsByClassName("box-all")[0];

var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
var televHeight = document.getElementsByClassName("telev")[0].offsetHeight;
var dinnerHeight = document.getElementsByClassName("box-dinnerscene")[0].offsetHeight;
var gameHeight = document.getElementsByClassName("box-game")[0].offsetHeight;
var appHeight = document.getElementsByClassName("box-app")[0].offsetHeight;
var showIframeHeight = lunbosceneHeight + televHeight + dinnerHeight + gameHeight + appHeight - window.innerHeight;

function handleIframeScroll() {
    let currentpos = all.scrollTop - showIframeHeight;
    let iframesceneCurrentscale = currentpos / 20;
    if (currentpos <= 0) {
        return;
    }
    else if (currentpos <= appHeight) {
        document.getElementById("iframes-start0Rem").style.transform = `translate(${iframesceneCurrentscale * (-0.4) - 0}vw, ${iframesceneCurrentscale * (-2.6) + 0}vh)`;
        document.getElementById("iframes-start1Rem").style.transform = `translate(${iframesceneCurrentscale * (0.7) - 0}vw, ${iframesceneCurrentscale * (-2) + 60}vh)`;
        document.getElementById("iframes-start2Rem").style.transform = `translate(${iframesceneCurrentscale * (-1) + 30}vw, ${iframesceneCurrentscale * (-1.6) + 120}vh)`;
        document.getElementById("iframes-start3Rem").style.transform = `translate(${iframesceneCurrentscale * (0.5) - 30}vw, ${iframesceneCurrentscale * (-3.2) + 180}vh)`;
        document.getElementById("iframes-start4Rem").style.transform = `translate(${iframesceneCurrentscale * (-0.9) + 50}vw, ${iframesceneCurrentscale * (-3.2) + 300}vh)`;
    }
}

function appLoop() {
    handleIframeScroll();
    requestAnimationFrame(appLoop);
}
appLoop();
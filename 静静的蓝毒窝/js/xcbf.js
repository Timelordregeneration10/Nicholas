
//适配不同设备
var topscale = window.innerHeight / 790;
var widthHeightScale = window.innerWidth / window.innerHeight;
setInterval(() => {
    if (window.innerHeight / 790 != topscale) {
        topscale = window.innerHeight / 790;
    }
    if (window.innerWidth / window.innerHeight != widthHeightScale) {
        widthHeightScale = window.innerWidth / window.innerHeight;
    }

}, 50);

//设置初始loading位置
document.getElementsByClassName("loading")[0].style.top = `${((100 - (20 * widthHeightScale)) / 2 + 100) / widthHeightScale}vw`;
document.getElementsByClassName("loading-three")[0].style.top = `${-(((100 - (20 * widthHeightScale)) / 2 + 100) / widthHeightScale)}vw`;

//add defu
var all = document.getElementById("letter");
var xcbfCurrentScale = 1;
var pastHeight = 3*window.innerHeight;        //炫彩缤纷前的所有高度
var upxcbf = true;
var intoGalary = false;


var xcbfst = document.getElementsByClassName("box-xuancaibinfen")[0].style;
function xcbfTransition(scale, transTop, display) {
    xcbfst.transform = `scale(${scale})`;
    xcbfst.top = `${transTop}vh`;
    xcbfst.display = `${display}`;
}

var loadingst = document.getElementsByClassName("loading")[0].style;
var threest = document.getElementsByClassName("loading-three")[0].style;
function loadingTransition(borderRadius, topOffset) {
    loadingst.left = `${(100 - 2 * borderRadius) / 2}vw`;
    loadingst.top = `${((100 - (2 * borderRadius * widthHeightScale)) / 2 + topOffset) / widthHeightScale}vw`;
    loadingst.width = `${borderRadius * 2}vw`;
    loadingst.height = `${borderRadius * 2}vw`;
    loadingst.borderRadius = `${borderRadius}vw`;

    threest.left = `${-(100 - 2 * borderRadius) / 2}vw`;
    threest.top = `${-((100 - (2 * borderRadius * widthHeightScale)) / 2 + topOffset) / widthHeightScale}vw`;
}

function playxcbf() {
    // console.log(all.scrollTop);
    if (all.scrollTop < (pastHeight - window.innerHeight)) {
        xcbfTransition(1, 100, "block");
        loadingTransition(10, 100);
        if (!upxcbf) {
            upxcbf = true;
            all.scrollTop = pastHeight - window.innerHeight;
            xcbfCurrentScale = 0.98;
        }
    }
    else {
        xcbfCurrentScale=(all.scrollTop - (pastHeight - window.innerHeight)) / 118.5*0.25 + 1;
        if (xcbfCurrentScale >= 1) {
            if (xcbfCurrentScale <= 4) {
                xcbfTransition(1, (4 - xcbfCurrentScale) * 100 / 3, "block");
                loadingTransition(10, (4 - xcbfCurrentScale) * 100 / 3);
            }
            else if (xcbfCurrentScale <= 11) {
                xcbfTransition((xcbfCurrentScale - 4) * 5 + 1, 0, "block");
                loadingTransition((xcbfCurrentScale - 4) * 20 + 10, 0);
            }
            else {
                if (!intoGalary) {
                    intoGalary = true;
                    loadingst.transition="all 2s";
                    threest.transition="all 2s";
                    xcbfTransition(36, 0, "none");
                    document.getElementById("wrapper").style.display="none";
                    document.getElementById("perspective").style.display="none";
                    loadingTransition(0, 0);
                    document.getElementsByClassName("box-all")[0].style.display="block";
                }
                else {
                    xcbfCurrentScale = 11;
                }
            }
        }
    }
    // console.log(xcbfCurrentScale);
}

function loop(){
    if(intoGalary){
        return;
    }
    playxcbf();
    requestAnimationFrame(loop);
}
loop();
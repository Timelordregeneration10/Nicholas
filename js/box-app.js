

var appItemImgs = document.getElementsByClassName("appitem-img");
for (let i = 0; i < appItemImgs.length; i++) {
    appItemImgs[i].onclick = function () {
        // window.open(appItemImgs[i].src);
        let mask = document.createElement("div");
        mask.style.position = "fixed";
        mask.style.top = "0";
        mask.style.left = "0";
        mask.style.width = "100vw";
        mask.style.height = "100vh";
        mask.style.backgroundColor = "rgba(0,0,0,0.8)";
        mask.style.zIndex = "10";
        mask.style.textAlign = "center";
        document.body.appendChild(mask);
        mask.onclick = function () {
            document.body.removeChild(mask);
        }
        let img = document.createElement("img");
        img.src = appItemImgs[i].src;
        img.style.maxWidth = "80vw";
        img.style.maxHeight = "80vh";
        img.style.marginTop = "10vh";
        img.style.marginBottom = "10vh";
        mask.appendChild(img);

    }
}


var all = document.getElementsByClassName("box-all")[0];

var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
var televHeight = document.getElementsByClassName("telev")[0].offsetHeight;
var dinnerHeight = document.getElementsByClassName("box-dinnerscene")[0].offsetHeight;
var gameHeight = document.getElementsByClassName("box-game")[0].offsetHeight;
var showappHeight = lunbosceneHeight + televHeight + dinnerHeight + gameHeight - window.innerHeight;
var appHeight = document.getElementsByClassName("box-app")[0].offsetHeight;

function handleAppImageTrans(start, end, transY) {       //1,3表示1~3
    for (let i = start - 1; i < end; i++) {
        appItemImgs[i].style.transform = `translateY(${-transY / 10}px)`;
    }
}

function handleAppScroll() {
    let currentpos = all.scrollTop - showappHeight;
    if (currentpos <= appHeight / 4) {
        handleAppImageTrans(1, 6, 0);
    }
    else if (currentpos <= appHeight) {
        handleAppImageTrans(1, 6, currentpos - appHeight / 4);
    }
}

function appLoop() {
    handleAppScroll();
    requestAnimationFrame(appLoop);
}
appLoop();


var gameItemImgs = document.getElementsByClassName("gameimage");
for (let i = 0; i < gameItemImgs.length; i++) {
    gameItemImgs[i].onclick = function () {
        // window.open(gameItemImgs[i].src);
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
        img.src = gameItemImgs[i].src;
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
var showgameHeight = lunbosceneHeight + televHeight + dinnerHeight - window.innerHeight;

var gamegridHeights = [];
for (let i = 0; i < 5; i++) {
    if (i == 0) {
        gamegridHeights[i] = document.getElementsByClassName(`game-grid${i + 1}`)[0].offsetHeight;
    }
    else {
        gamegridHeights[i] = document.getElementsByClassName(`game-grid${i + 1}`)[0].offsetHeight + gamegridHeights[i - 1];
    }
}

var gameimages = document.getElementsByClassName("gameimage");
function handleGameImageTrans(start, end, transY) {       //1,3表示1~3
    for (let i = start - 1; i < end; i++) {
        gameimages[i].style.transform = `translateY(${-transY / 10}px)`;
    }
}

function handleGameScroll() {
    let currentpos = all.scrollTop - showgameHeight;
    if (currentpos <= 0) {
        handleGameImageTrans(1, 3, 0);
    }
    else if (currentpos <= gamegridHeights[0]) {
        handleGameImageTrans(1, 3, currentpos);
        handleGameImageTrans(4, 8, 0);
    }
    else if (currentpos <= gamegridHeights[1]) {
        handleGameImageTrans(1, 3, currentpos);
        handleGameImageTrans(4, 8, currentpos - gamegridHeights[0]);
        handleGameImageTrans(9, 11, 0);
    }
    else if (currentpos <= gamegridHeights[2]) {
        handleGameImageTrans(1, 3, gamegridHeights[1]);
        handleGameImageTrans(4, 8, currentpos - gamegridHeights[0]);
        handleGameImageTrans(9, 11, currentpos - gamegridHeights[1]);
        handleGameImageTrans(12, 14, 0);
    }
    else if (currentpos <= gamegridHeights[3]) {
        handleGameImageTrans(4, 8, gamegridHeights[2] - gamegridHeights[0]);
        handleGameImageTrans(9, 11, currentpos - gamegridHeights[1]);
        handleGameImageTrans(12, 14, currentpos - gamegridHeights[2]);
        handleGameImageTrans(15, 18, 0);
    }
    else if (currentpos <= gamegridHeights[4]) {
        handleGameImageTrans(9, 11, gamegridHeights[3] - gamegridHeights[1]);
        handleGameImageTrans(12, 14, currentpos - gamegridHeights[2]);
        handleGameImageTrans(15, 18, currentpos - gamegridHeights[3]);
    }
    else {
        handleGameImageTrans(12, 14, gamegridHeights[4] - gamegridHeights[2]);
        handleGameImageTrans(15, 18, currentpos - gamegridHeights[3]);
        // handleGameImageTrans(15, 18, gamegridHeights[5] - gamegridHeights[3]);
    }
}

function gameLoop() {
    handleGameScroll();
    requestAnimationFrame(gameLoop);
}
gameLoop();
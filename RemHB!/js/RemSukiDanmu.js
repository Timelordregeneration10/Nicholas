
var words = [
    "如果真爱有颜色，那一定是蓝色！",
    "蕾姆是最可爱的！",
    "我喜欢蕾姆啊！",
    "蕾姆是最棒的！",
    "蕾姆是我一切温柔的来源和归属！",
    "RMTYYDS!!",
    "Rem suki!",
    "蕾姆生日快乐！！！！！！！！！"
]
function adddanmu() {
    let ran1 = Math.random();
    let ran2 = Math.random();
    let ran3 = Math.random();
    let ranword = Math.floor(Math.random() * words.length);
    let colorran = `rgb(${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)})`;
    if (ranword == 0) {
        colorran = "#91bef0";
    }
    let newdanmu = document.createElement("div");
    newdanmu.innerHTML = `${words[ranword]}`;
    newdanmu.style = `
        width:300vw;
        font-size: ${5 + ran1 * 6}vw;
        color:${colorran};
        position: absolute;
        top:${ran2 * 80}vh;
        animation: notbiggest ${3 + ran3 * 4}s linear 1 forwards;
        z-index: 4;
        pointer-events: none;
    `;
    document.body.prepend(newdanmu);
    setTimeout(() => {
        newdanmu.remove();
    }, 7000);
}

setInterval(adddanmu, 300);

function addToLeftBottomDanmu() {
    let ranword = Math.floor(Math.random() * words.length);
    let colorran = `rgb(${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)})`;
    if (ranword == 0) {
        colorran = "#91bef0";
    }
    let newdanmu = document.createElement("div");
    newdanmu.innerHTML = `${words[ranword]}`;
    newdanmu.style = `
        width:300vw;
        font-size: 10vw;
        color:${colorran};
        position: absolute;
        top:0;
        left:50vw;
        animation: toLeftBottom 1s linear 1 forwards;
        z-index: 6;
        pointer-events: none;
    `;
    document.body.prepend(newdanmu);
    setTimeout(() => {
        newdanmu.remove();
    }, 2000);
}
setInterval(addToLeftBottomDanmu, 3000);

function addRotateDanmu() {
    let total = 12;
    let currentNum = 0;
    var rotateInterval = setInterval(() => {
        if (currentNum >= 12) {
            clearInterval(rotateInterval);
        }
        let newdanmu = document.createElement("div");
        newdanmu.innerHTML = `蕾姆生日快乐！！`;
        newdanmu.style = `
            width:100vh;
            font-size: 3vw;
            font-weight:600;
            color:#91bef0;
            position: absolute;
            top:50%;
            left:0vw;
            transform:translateY(-50%) rotate(${currentNum * (360 / total)}deg);
            z-index: 6;
            pointer-events: none;
        `;
        document.body.prepend(newdanmu);
        setTimeout(() => {
            newdanmu.remove();
        }, 3000);
        currentNum++;
    }, 50);
}
setInterval(addRotateDanmu, 7000);

function handleSendDanmu() {
    let danmuInput = document.getElementById("danmuInput");
    if (danmuInput.value == "") {
        let newdiv = document.createElement("div");
        newdiv.innerHTML = "请输入弹幕内容~";
        newdiv.style = `
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background-color:rgba(255,255,255,0.8);
            padding:10px;
            border-radius:10px;
            z-index:9;
            pointer-events: none;
        `;
        document.body.prepend(newdiv);
        setTimeout(() => {
            newdiv.remove();
        }, 1000);
    }
    else {
        let newdanmu = document.createElement("div");
        newdanmu.innerHTML = `${danmuInput.value}`;
        newdanmu.style = `
            font-size: 10vw;
            color: #91bef0;
            position: absolute;
            top:${Math.random() * 40}vh;
            animation: notbiggest ${3 + Math.random() * 4}s linear 1 forwards;
            border:5px solid white;
            z-index: 7;
            pointer-events: none;
        `;
        document.body.prepend(newdanmu);
        words.push(danmuInput.value);
        danmuInput.value = "";
        setTimeout(() => {
            newdanmu.remove();
        }, 7000);
    }
}

document.getElementById("danmuSubmit").addEventListener("click", handleSendDanmu);
document.getElementById("danmuInput").addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handleSendDanmu();
    }
});
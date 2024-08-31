var televitems = document.getElementsByClassName("televitem");
var televcenter = document.getElementsByClassName("televcenter")[0].style;

for (let i = 0; i < televitems.length; i++) {
    televitems[i].onmouseover = function () {
        televcenter.backgroundImage = `url(./img/telev/work${i + 1}.jpg)`;
    };
    televitems[i].onmouseout = function () {
        televcenter.backgroundImage = `url(./img/telev/muse_noframe2.png)`;
    };
}

// var all = document.getElementsByClassName("box-all")[0];

// var lunbosceneHeight = document.getElementsByClassName("box-lunboscene-frame")[0].offsetHeight;
// var televHeight = document.getElementsByClassName("telev")[0].offsetHeight;

// function handleTelevcenterShow() {
//     if (all.scrollTop >= lunbosceneHeight - window.innerHeight + 0.7 * window.innerHeight && all.scrollTop <= lunbosceneHeight + televHeight - 0.7 * window.innerHeight) {
//         televcenter.display = "block";
//     }
//     else {
//         televcenter.display = "none";
//     }
// }

// function televLoop() {
//     handleTelevcenterShow();
//     requestAnimationFrame(televLoop);
// }
// televLoop();
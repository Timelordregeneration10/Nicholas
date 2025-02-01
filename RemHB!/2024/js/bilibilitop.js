
let cake = document.getElementById('cake');
let flower = document.getElementById('flower');
let chip = document.getElementById('chip');
let heroin = document.getElementById('heroin');
let kami= document.getElementById('kami');
let oyishi= document.getElementById('oyishi');
let zixin= document.getElementById('zixin');
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let firstEnter = true;
document.getElementsByClassName("box-bilibilitop")[0].addEventListener('mousemove', function (e) {
    if (firstEnter) {
        firstEnter = false;
        startX = e.pageX;
        startY = e.pageY;
    }
    endX = e.pageX;
    endY = e.pageY;
})

document.getElementsByClassName("box-bilibilitop")[0].addEventListener('mouseleave', function (e) {
    firstEnter = true;
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
})

function transformLoop() {
    cake.style.transform = `translate(${(endX - startX) / 5}px,${(endY - startY) / 5}px)`;
    chip.style.transform = `translate(${(endX - startX) / 3}px,0px)`;
    flower.style.transform = `translate(${(endX - startX) / 4}px,${(-endY + startY) / 2}px)`;
    heroin.style.transform = `translate(${(endX - startX) / 6}px,0px)`;
    oyishi.style.transform = `translate(${(endX - startX) / 5}px,${(endY - startY) / 4}px)`;
    kami.style.transform = `translate(${(endX - startX) / 6}px,${(-endY + startY) / 3}px)`;
    zixin.style.transform = `translate(${(endX - startX) / 4}px,${(endY - startY) / 6}px)`;
    requestAnimationFrame(transformLoop);
}
transformLoop();
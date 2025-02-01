const aiyiRem = document.getElementsByClassName("aiyiRem")[0];
const aiyiRemWrapper = document.getElementsByClassName("aiyiRemWrapper")[0];
const bless = document.getElementsByClassName("bless")[0];

let currentRemNumber = 1;

const targetFrameRate = 2;
let lastFrameTime = 0;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let scaleX = 0;
let scaleY = 0;

window.addEventListener("resize", function () {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
});

document
  .getElementsByTagName("body")[0]
  .addEventListener("mousemove", function (e) {
    scaleX = (e.clientX - centerX) / centerX;
    scaleY = (e.clientY - centerY) / centerY;
  });

function changeRem() {
  aiyiRem.style.transform = `translate(${scaleX * 10}%, ${scaleY * 20 + 20}%)`;
  aiyiRemWrapper.style.transform = `translate(-50%, -50%) rotate3d(${scaleX}, ${scaleY}, 0, 45deg)`;
  const currentTime = performance.now();
  if (currentTime - lastFrameTime < 1000 / targetFrameRate) {
    requestAnimationFrame(changeRem);
    return;
  }
  lastFrameTime = currentTime;
  aiyiRem.src = `../aiyiRemPublic/${currentRemNumber}.webp`;
  bless.style.backgroundImage = `url(../aiyiRemPublic/${currentRemNumber}.webp)`;
  currentRemNumber = ((currentRemNumber + 1) % 9) + 1;
  requestAnimationFrame(changeRem);
}

changeRem();

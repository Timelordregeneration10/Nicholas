const crosshair = document.getElementById("crosshair");

// const throttle = (func, delay) => {
//   let lastCall = 0;
//   return function (...args) {
//     const now = Date.now();
//     if (now - lastCall >= delay) {
//       lastCall = now;
//       return func(...args);
//     }
//   };
// }

// const handleMouseMove = throttle((e) => {
//   crosshair.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
// }, 100);

let locked = false;
// 准心跟随鼠标
document.addEventListener("mousemove", (e)=>{
    if (locked) return;
    locked = true;
    requestAnimationFrame(() => {
        crosshair.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
        locked = false;
    });
});

// 点击射击
document.addEventListener("click", (e) => {
  shoot(e.pageX, e.pageY);
});

// 射击函数
function shoot(x, y) {
  // 枪口闪光
  createMuzzleFlash(x, y);

  // 弹孔
  createBulletHole(x, y);

  // 粒子特效
  createParticles(x, y);

  // 屏幕震动
  shakeScreen();
}

// 创建枪口闪光
function createMuzzleFlash(x, y) {
  const flash = document.createElement("div");
  flash.className = "muzzle-flash";
  flash.style.left = x + "px";
  flash.style.top = y + "px";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.remove();
  }, 100);
}

// 创建弹孔
function createBulletHole(x, y) {
  const hole = document.createElement("div");
  hole.className = "bullet-hole";
  hole.style.left = x + "px";
  hole.style.top = y + "px";
  document.body.appendChild(hole);

  // 弹孔3秒后消失
  setTimeout(() => {
    hole.style.opacity = "0";
    hole.style.transition = "opacity 1s";
    setTimeout(() => hole.remove(), 1000);
  }, 3000);
}

// 创建粒子特效
function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;

    particle.style.left = x + offsetX + "px";
    particle.style.top = y + offsetY + "px";

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 500);
  }
}

const container = document.querySelector(".container");
// 屏幕震动
function shakeScreen() {
  container.style.transform = "translate(2px, 2px)";
  setTimeout(() => {
    container.style.transform = "translate(-2px, -2px)";
  }, 25);
  setTimeout(() => {
    container.style.transform = "translate(0, 0)";
  }, 50);
}

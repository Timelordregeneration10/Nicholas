
const bg = document.getElementsByClassName("bg")[0];
const aiyiRemUrls = Array.from({ length: 9 }, (_, index) => `../aiyiRemPublic/${index + 1}.webp`);

const createColumn3D = () => {
    const edge = 20;
    const row = 3;
    const standardHeight = 150 / row;
    const radio = 9 / 16;
    for (let e = 0; e < edge; e++) {
        for (let r = 0; r < row; r++) {
            const aiyiRemAlbum = document.createElement("div");
            aiyiRemAlbum.className = "aiyiRemAlbum";
            const scale = Math.random() * 0.5 + 1.2;
            const rotateDeg = (Math.random() * 2 - 1) * 30;
            // 居中
            aiyiRemAlbum.style.top = `${50 - standardHeight / 2 * scale}vh`;
            aiyiRemAlbum.style.left = `${50 - radio * standardHeight / 2 * scale}vh`;
            aiyiRemAlbum.style.width = `${radio * standardHeight * scale}vh`;
            aiyiRemAlbum.style.height = `${standardHeight * scale}vh`;
            // row/2时translateY为0
            aiyiRemAlbum.style.transform = `rotateY(${e * 360 / edge}deg) translateZ(1000px) translateY(${(r - row / 2) * standardHeight}vh) rotate(${rotateDeg}deg)`;
            aiyiRemAlbum.style.backgroundImage = `url(${aiyiRemUrls[Math.floor(Math.random() * aiyiRemUrls.length)]})`;
            aiyiRemAlbum.style.backgroundSize = "cover";
            aiyiRemAlbum.style.backgroundPosition = "center";
            aiyiRemAlbum.style.backgroundRepeat = "no-repeat";
            aiyiRemAlbum.style.zIndex = `${e*row+r}`;
            bg.appendChild(aiyiRemAlbum);
        }
    }
}

createColumn3D();
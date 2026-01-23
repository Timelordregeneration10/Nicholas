
const rollerSpace = document.getElementsByClassName("roller-space")[0];
const content = document.getElementsByClassName("content")[0];
const aiyiRemUrls = Array.from({ length: 9 }, (_, index) => `../aiyiRemPublic/${index + 1}.webp`);

const row = 2;
const radio = 9 / 16;
const rotateYrange = 30;

const scrollSpeed = 0.9;
const rollSpeed = 0.8;
const initScroll = () => {
    document.body.style.height = content.scrollHeight / scrollSpeed + "px";

    /** genAI_main_start */
    let ticking = false;
    let lastScrollTop = 0;

    const updateScrollAnimation = () => {
        const realScrollTop = lastScrollTop;
        // 处理content的滚动
        content.style.transform = `translateY(-${realScrollTop * scrollSpeed}px)`;
        // 处理aiyiRemAlbums的transform
        const logicScrollTop = realScrollTop * rollSpeed;
        const logicHeight = content.scrollHeight / scrollSpeed;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        // 每个album有多高
        const standardHeight = windowHeight / row;
        // 每个album有多宽
        const standardWidth = standardHeight * radio;
        // 总宽度/每个有多宽
        const column = Math.ceil((logicHeight / rollSpeed) / standardWidth);
        const rotateYzeroIndex = windowWidth / standardWidth / 2;
        const aiyiRemAlbums = document.getElementsByClassName("aiyiRemAlbum");
        // outer static and replace with empty divs, inner dynamically translate3d and rotateY with showing aiyiRemAlbums
        for (let c = 0; c < column; c++) {
            for (let r = 0; r < row; r++) {
                const aiyiRemAlbum = aiyiRemAlbums[c * row + r];
                const currentColumn = c - logicScrollTop / standardWidth;
                const translate3dX = (currentColumn - rotateYzeroIndex) * standardWidth;
                const translate3dY = (r - (row - 1) / 2) * standardHeight;
                const translate3dZ = 0;
                const rotateY = ((currentColumn + 0.5) / rotateYzeroIndex * (-1) + 1) * (rotateYrange / 2);
                const rotateZ = aiyiRemAlbum.dataset.rotatez;
                aiyiRemAlbum.style.transform = `translate3d(${translate3dX}px, ${translate3dY}px, ${translate3dZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
                const invisible = currentColumn < -3 * rotateYzeroIndex;
                const albumImg = aiyiRemAlbum.querySelector(".aiyiRemAlbumImg");
                if (!invisible && !albumImg) {
                    const img = document.createElement("img");
                    img.src = aiyiRemAlbum.dataset.src;
                    img.alt = "aiyiRemAlbumImg";
                    img.className = "aiyiRemAlbumImg";
                    aiyiRemAlbum.appendChild(img);
                } else if (invisible && albumImg) {
                    aiyiRemAlbum.removeChild(albumImg);
                }
            }
        }
        ticking = false;
    };

    const handleScroll = function () {
        lastScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimation);
            ticking = true;
        }
    };
    /** genAI_main_end */

    updateScrollAnimation();

    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
};

const initAiyiRemAlbums = () => {
    const logicHeight = content.scrollHeight / scrollSpeed;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    // 每个album有多高
    const standardHeight = windowHeight / row;
    // 每个album有多宽
    const standardWidth = standardHeight * radio;
    // 总宽度/每个有多宽
    const column = Math.ceil((logicHeight / rollSpeed) / standardWidth);
    const rotateYzeroIndex = windowWidth / standardWidth / 2;
    for (let c = 0; c < column; c++) {
        for (let r = 0; r < row; r++) {
            const aiyiRemAlbum = document.createElement("div");
            aiyiRemAlbum.className = "aiyiRemAlbum";
            const scale = Math.random() * 0.2 + 1;
            const rotateDeg = (Math.random() * 2 - 1) * 20;
            // const rotateDeg = 0;
            // 居中
            aiyiRemAlbum.style.top = `${(windowHeight / 2) - standardHeight / 2 * scale}px`;
            aiyiRemAlbum.style.left = `${(windowWidth / 2) - radio * standardHeight / 2 * scale}px`;
            aiyiRemAlbum.style.width = `${standardWidth * scale}px`;
            aiyiRemAlbum.style.height = `${standardHeight * scale}px`;
            const translate3dX = (c - rotateYzeroIndex) * standardWidth;
            const translate3dY = (r - (row - 1) / 2) * standardHeight;
            const translate3dZ = 0;
            const rotateY = ((c + 0.5) / rotateYzeroIndex * (-1) + 1) * (rotateYrange / 2);
            const rotateZ = rotateDeg;
            aiyiRemAlbum.dataset.rotatez = rotateZ;
            aiyiRemAlbum.style.transform = `translate3d(${translate3dX}px, ${translate3dY}px, ${translate3dZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
            aiyiRemAlbum.dataset.src = aiyiRemUrls[Math.floor(Math.random() * aiyiRemUrls.length)];
            const invisible = c > 3 * rotateYzeroIndex;
            if (!invisible) {
                const img = document.createElement("img");
                img.src = aiyiRemAlbum.dataset.src;
                img.alt = "aiyiRemAlbum";
                img.className = "aiyiRemAlbumImg";
                aiyiRemAlbum.appendChild(img);
            }
            rollerSpace.appendChild(aiyiRemAlbum);
        }
    }
    return () => {
        const aiyiRemAlbums = document.getElementsByClassName("aiyiRemAlbum");
        for (let i = 0; i < aiyiRemAlbums.length; i++) {
            const item = aiyiRemAlbums[i];
            item.remove();
        };
    }
}

window.onload = function () {
    let destoryAiyiRemAlbums = initAiyiRemAlbums();
    let destoryScroll = initScroll();
    /** genAI_main_start */
    let resizeTicking = false;

    const handleResize = () => {
        destoryAiyiRemAlbums();
        destoryAiyiRemAlbums = initAiyiRemAlbums();
        destoryScroll();
        destoryScroll = initScroll();
        resizeTicking = false;
    };

    window.onresize = function () {
        if (!resizeTicking) {
            requestAnimationFrame(handleResize);
            resizeTicking = true;
        }
    };
    /** genAI_main_end */
};
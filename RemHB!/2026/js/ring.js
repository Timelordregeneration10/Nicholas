const REMHB = "HAPPY BIRTHDAY TO REM! ";

function addKeyframes(KFconfig) {
    const { edge, isRotateX, rotateXorYDeg, translateZpx, addStyleId } = KFconfig;
    const styleDom = document.createElement("style");
    let innerHTMLs = ``;
    if (isRotateX) {
        for (let i = 0; i < edge; i++) {
            innerHTMLs += `
          @keyframes star-ring-fragment-rotate-${addStyleId}-${i} {
            0% {
              transform: rotateY(${rotateXorYDeg}deg) rotateX(${(360 / edge) * i}deg) translateZ(${translateZpx}px);
            }
            100% {
              transform: rotateY(${rotateXorYDeg}deg) rotateX(${(360 / edge) * i + 360}deg) translateZ(${translateZpx}px);
            }
          }
        `;
        }
    } else {
        for (let i = 0; i < edge; i++) {
            innerHTMLs += `
          @keyframes star-ring-fragment-rotate-${addStyleId}-${i} {
            0% {
              transform: rotateX(${rotateXorYDeg}deg) rotateY(${(360 / edge) * i}deg) translateZ(${translateZpx}px);
            }
            100% {
              transform: rotateX(${rotateXorYDeg}deg) rotateY(${(360 / edge) * i + 360}deg) translateZ(${translateZpx}px);
            }
          }
        `;
        }
    }

    styleDom.innerHTML = innerHTMLs;
    document.head.appendChild(styleDom);
}

function addStarRingFragment(SRFconfig) {
    const { edge, isRotateX, rotateXorYDeg, translateZpx, durationSec, addStyleId, size } = SRFconfig;
    const galaxy = document.getElementsByClassName("galaxy")[0];
    for (let i = 0; i < edge; i++) {
        const fragment = document.createElement("div");
        fragment.className = "star-ring-fragment";
        fragment.style.width = `${size}px`;
        fragment.style.height = `${size}px`;
        fragment.style.top = `calc(50vh - ${size / 2}px)`;
        fragment.style.left = `calc(50vw - ${size / 2}px)`;
        if (isRotateX) {
            fragment.style.transform = `rotateY(${rotateXorYDeg}deg) rotateX(${(360 / edge) * i}deg) translateZ(${translateZpx}px)`;
            fragment.style.animation = `star-ring-fragment-rotate-${addStyleId}-${i} ${durationSec}s linear infinite`;
        } else {
            fragment.style.transform = `rotateX(${rotateXorYDeg}deg) rotateY(${(360 / edge) * i}deg) translateZ(${translateZpx}px)`;
            fragment.style.animation = `star-ring-fragment-rotate-${addStyleId}-${i} ${durationSec}s linear infinite`;
        }
        const text = document.createElement("div");
        text.className = "star-ring-fragment-text";
        text.style.animationDelay = `${(i % 5) * 0.1}s`;
        text.innerText = REMHB[i % REMHB.length];
        fragment.appendChild(text);
        galaxy.appendChild(fragment);
    }
}

function createStarRing(config) {
    addKeyframes(config);
    addStarRingFragment(config);
}

function createGalaxy(pattern) {
    const { ringConfigs, galaxyConfig = { rotateX: 80, rotateY: 80, translateY: 100 } } = pattern;
    const galaxy = document.getElementsByClassName("galaxy")[0];
    // 注意这里先Y后X
    galaxy.style.transform = `translateY(${galaxyConfig.translateY}px) rotateY(${galaxyConfig.rotateY}deg) rotateX(${galaxyConfig.rotateX}deg)`;
    const originStable = document.getElementsByClassName("origin-stable")[0];
    // against的话需要反一下，先负的X再负的Y
    originStable.style.transform = `rotateX(${-galaxyConfig.rotateX}deg) rotateY(${-galaxyConfig.rotateY}deg) translateY(-${galaxyConfig.translateY}px)`;

    ringConfigs.forEach((config) => {
        createStarRing(config);
    });
}

function init() {
    const createPattern_SIMPLE = () => {
        const patternX = {
            ringConfigs: [],
            galaxyConfig: { rotateX: 90, rotateY: 60, translateY: 100 }
        };
        // for (let i = 0; i < 1; i++) {
        //     patternX.ringConfigs.push({
        //         edge: 54,
        //         isRotateX: false,
        //         rotateXorYDeg: i * 45 - 80,
        //         translateZpx: 400,
        //         durationSec: 120,
        //         addStyleId: `ring-simple-1-${i}`,
        //         size: 50
        //     });
        // }
        for (let i = 0; i < 1; i++) {
            patternX.ringConfigs.push({
                edge: 54,
                isRotateX: false,
                rotateXorYDeg: i * 45 - 110,
                translateZpx: 400,
                durationSec: 120,
                addStyleId: `ring-simple-2-${i}`,
                size: 50
            });
        }
        return patternX;
    };
    createGalaxy(createPattern_SIMPLE());
}
init();
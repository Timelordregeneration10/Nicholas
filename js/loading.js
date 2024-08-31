var loaded = false;

var topscale = window.innerHeight / 790;
setInterval(() => {
    if (window.innerHeight / 790 != topscale) {
        topscale = window.innerHeight / 790;
    }
}, 50);

var loadingitems = document.getElementsByClassName("loading-row-item");

for (let i = 0; i < 360; i++) {
    loadingitems[i].onmouseenter = function () {
        loadingitems[i].classList.add("loading-white");
        if (undefined != loadingitems[i - 37]) loadingitems[i - 37].classList.add("loading-white");
        if (undefined != loadingitems[i + 37]) loadingitems[i + 37].classList.add("loading-white");
        if (undefined != loadingitems[i - 74]) loadingitems[i - 74].classList.add("loading-white");
        if (undefined != loadingitems[i + 74]) loadingitems[i + 74].classList.add("loading-white");
        if (undefined != loadingitems[i - 2]) loadingitems[i - 2].classList.add("loading-white");
        if (undefined != loadingitems[i + 2]) loadingitems[i + 2].classList.add("loading-white");
        if (undefined != loadingitems[i + 38]) loadingitems[i + 38].classList.add("loading-white");
        if (undefined != loadingitems[i - 34]) loadingitems[i - 34].classList.add("loading-white");
        if (undefined != loadingitems[i + 34]) loadingitems[i + 34].classList.add("loading-white");
        if (undefined != loadingitems[i - 38]) loadingitems[i - 38].classList.add("loading-white");
        if (undefined != loadingitems[i + 70]) loadingitems[i + 70].classList.add("loading-white");
        if (undefined != loadingitems[i - 70]) loadingitems[i - 70].classList.add("loading-white");
        if (i >= 121 && i <= 130) return;
        if (i % 3 == 0) loadingitems[i].innerHTML = "R";
        if (i % 3 == 1) loadingitems[i].innerHTML = "M";
        if (i % 3 == 2) loadingitems[i].innerHTML = "T";
    }
    loadingitems[i].onmouseleave = function () {
        loadingitems[i].classList.remove("loading-white");
        if (undefined != loadingitems[i - 37]) loadingitems[i - 37].classList.remove("loading-white");
        if (undefined != loadingitems[i + 37]) loadingitems[i + 37].classList.remove("loading-white");
        if (undefined != loadingitems[i - 74]) loadingitems[i - 74].classList.remove("loading-white");
        if (undefined != loadingitems[i + 74]) loadingitems[i + 74].classList.remove("loading-white");
        if (undefined != loadingitems[i - 2]) loadingitems[i - 2].classList.remove("loading-white");
        if (undefined != loadingitems[i + 2]) loadingitems[i + 2].classList.remove("loading-white");
        if (undefined != loadingitems[i + 38]) loadingitems[i + 38].classList.remove("loading-white");
        if (undefined != loadingitems[i - 34]) loadingitems[i - 34].classList.remove("loading-white");
        if (undefined != loadingitems[i + 34]) loadingitems[i + 34].classList.remove("loading-white");
        if (undefined != loadingitems[i - 38]) loadingitems[i - 38].classList.remove("loading-white");
        if (undefined != loadingitems[i + 70]) loadingitems[i + 70].classList.remove("loading-white");
        if (undefined != loadingitems[i - 70]) loadingitems[i - 70].classList.remove("loading-white");
    }
}

window.onload = function () {
    document.getElementsByClassName("loading")[0].style.display = "none";
    loaded = true;
}


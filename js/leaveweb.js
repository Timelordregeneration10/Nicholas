
function showleavedpage() {
    document.getElementsByClassName("leaveweb")[0].style.display = "block";
}

var showleaved;

document.onmouseleave = function () {
    showleaved=setInterval(showleavedpage, 2000);
}

document.onmouseenter = function () {
    clearInterval(showleaved);
}

document.getElementById("leaveweb-button2").onclick = function () {
    document.getElementsByClassName("leaveweb")[0].style.display = "none";
}
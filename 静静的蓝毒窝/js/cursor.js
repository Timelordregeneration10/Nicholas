document.getElementsByTagName("html")[0].getElementsByTagName("body")[0].style.cursor = "url('./image/cur/1.cur'),auto";
document.getElementsByTagName("html")[0].addEventListener("mousedown", function () {
    document.getElementsByTagName("body")[0].style.cursor = "url('./image/cur/2.cur'),auto";
    // console.log("down");
})
document.getElementsByTagName("html")[0].addEventListener("mouseup", function () {
    document.getElementsByTagName("body")[0].style.cursor = "url('./image/cur/1.cur'),auto";
    // console.log("up");
})
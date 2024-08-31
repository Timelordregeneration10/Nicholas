document.addEventListener("click", function (event) {
    var heart = document.createElement("img");
    //需要换成实际路径
    heart.src = "./image/bubble.jpg";
    heart.className = "heart";
    heart.style.top = String(event.pageY) + "px";
    heart.style.left = String(event.pageX) + "px";
    document.getElementsByTagName("html")[0].appendChild(heart);
})

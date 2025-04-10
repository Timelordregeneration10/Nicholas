document.addEventListener("click", function (event) {
    var heart = document.createElement("img");
    //需要换成实际路径
    heart.src = "./img/heart.png";
    heart.className = "personwebheart";
    // heart.setAttribute("style",`top:${event.screenY}px;left:${event.screenX}px;`);
    // heart.style = `top:${event.screenY - 70}px;left:${event.screenX}px;`;
    heart.style.top = String(event.pageY - 20) + "px";
    heart.style.left = String(event.pageX - 20) + "px";
    document.getElementsByTagName("html")[0].appendChild(heart);
    // alert( event.screenY);
})



var drawingItemImgs = document.getElementsByClassName("drawingitem-img");
for (let i = 0; i < drawingItemImgs.length; i++) {
    drawingItemImgs[i].onclick = function () {
        // window.open(drawingItemImgs[i].src);
        let mask = document.createElement("div");
        mask.style.position = "fixed";
        mask.style.top = "0";
        mask.style.left = "0";
        mask.style.width = "100vw";
        mask.style.height = "100vh";
        mask.style.backgroundColor = "rgba(0,0,0,0.8)";
        mask.style.zIndex = "10";
        mask.style.textAlign = "center";
        document.body.appendChild(mask);
        mask.onclick = function () {
            document.body.removeChild(mask);
        }
        let img = document.createElement("img");
        img.src = drawingItemImgs[i].src;
        img.style.maxWidth = "80vw";
        img.style.maxHeight = "80vh";
        img.style.marginTop = "10vh";
        img.style.marginBottom = "10vh";
        mask.appendChild(img);

    }
}

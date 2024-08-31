
var oldwidth = "7vw";
var newwidth = "17vw";
var oldsize = "1.6vw";
var newsize = "2.6vw";
function setOldNewWidthSize() {
    if (window.innerHeight > window.innerWidth) {
        oldsize = "1.6vh";
        newsize = "3.6vh";
        oldwidth = "7vh";
        newwidth = "17vh";
    }
    else {
        oldwidth = "7vw";
        newwidth = "17vw";
        oldsize = "1.6vw";
        newsize = "2.6vw";
    }
    for (let i = 1; i <= 4; i++) {
        if (i == currentOption) {
            document.getElementById(`box-option${currentOption}`).style.width = newwidth;
            document.getElementById(`box-option${currentOption}`).style.fontSize = newsize;
        }
        else {
            document.getElementById(`box-option${i}`).style.width = oldwidth;
            document.getElementById(`box-option${i}`).style.fontSize = oldsize;
        }
    }
}

var currentOption = 1;
setOldNewWidthSize();
window.onresize = function () {
    setOldNewWidthSize();
}


var galaryitems = document.getElementsByClassName("galary-item");
function handleCurrentOptionchange(op) {
    if (op == currentOption) { return; }
    document.getElementById(`box-option${currentOption}`).style.width = oldwidth;
    document.getElementById(`box-option${currentOption}`).style.fontSize = oldsize;
    document.getElementById(`box-option${op}`).style.width = newwidth;
    document.getElementById(`box-option${op}`).style.fontSize = newsize;
    galaryitems[currentOption - 1].style.display = "none";
    currentOption = op;
    galaryitems[currentOption - 1].style.display = "flex";
    document.getElementsByClassName("galary-item-frame")[0].scrollLeft = 0;
}


for (let i = 1; i <= 4; i++) {
    document.getElementById(`box-option${i}`).onclick = function () { handleCurrentOptionchange(i); }
}

var drawItemImgs=document.getElementsByClassName("draw-item-img");
for(let i=0;i<drawItemImgs.length;i++){
    drawItemImgs[i].onclick=function(){
        // window.open(drawItemImgs[i].src);
        let mask=document.createElement("div");
        mask.style.position="fixed";
        mask.style.top="0";
        mask.style.left="0";
        mask.style.width="100vw";
        mask.style.height="100vh";
        mask.style.backgroundColor="rgba(0,0,0,0.8)";
        mask.style.zIndex="100";
        mask.style.textAlign="center";
        document.body.appendChild(mask);
        mask.onclick=function(){
            document.body.removeChild(mask);
        }
        let img=document.createElement("img");
        img.src=drawItemImgs[i].src;
        img.style.maxWidth="80vw";
        img.style.maxHeight="80vh";
        img.style.marginTop="10vh";
        img.style.marginBottom="10vh";
        mask.appendChild(img);
        
    }
}
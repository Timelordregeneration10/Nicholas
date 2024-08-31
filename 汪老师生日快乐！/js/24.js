
//修改大小时，container的width和height同步translateXYZ改变。
var littleItems = document.getElementsByClassName("little-item");
var transforms = [];
var translateZBefore = 6;
var translateZAfter = 15;
var translateXY = 18;

//perspective改成200px=>新世界
// document.getElementsByClassName("container")[0].style.perspective = "200px";

for (let i = 0; i < littleItems.length; i++) {
    if (i < 16) {
        littleItems[i].style.transform = `rotateX(${i % 2 == 1 ? -90 : 90}deg) rotateY(${i >= 8 ? 0 : (i % 4 >= 2 ? 90 : -90)}deg) rotateZ(${i >= 8 ? (i % 4 >= 2 ? 90 : -90) : 0}deg) translateZ(${i % 8 >= 4 ? translateZBefore : -1 * (translateZBefore)}vw)`;
    }
    else {
        littleItems[i].style.transform = `translate3d(${(i - 16) % 2 >= 1 ? 0 : translateXY}vw,${(i - 16) % 4 >= 2 ? 0 : translateXY}vw,${i % 8 >= 4 ? translateZBefore : -1 * (translateZBefore)}vw)`;
    }
    transforms.push(littleItems[i].style.transform);
}
// console.log(transforms);
document.getElementsByClassName("container")[0].onmouseenter = function () {
    for (let i = 0; i < littleItems.length; i++) {
        littleItems[i].style.transform = transforms[i] + `translateZ(${i % 8 >= 4 ? translateZAfter : -1 * (translateZAfter)}vw)`;
        document.getElementsByClassName("image-item")[i].style.width = "40%";
        document.getElementsByClassName("image-item")[i].style.height = "40%";
        document.getElementsByClassName("image-item")[i].style.opacity = "1";
    }
    for(let i=0;i<document.getElementsByClassName("image-item2").length;i++){
        document.getElementsByClassName("image-item2")[i].style.opacity = "0.5";
    }
    // document.getElementsByClassName("container")[0].style.perspective = "200px";
};

document.getElementsByClassName("container")[0].onmouseleave = function () {
    for (let i = 0; i < littleItems.length; i++) {
        littleItems[i].style.transform = transforms[i];
        document.getElementsByClassName("image-item")[i].style.width = "20%";
        document.getElementsByClassName("image-item")[i].style.height = "20%";
        document.getElementsByClassName("image-item")[i].style.opacity = "0.5";
    }
    for(let i=0;i<document.getElementsByClassName("image-item2").length;i++){
        document.getElementsByClassName("image-item2")[i].style.opacity = "1";
    }
    document.getElementsByClassName("container")[0].style.perspective = "1000px";
};


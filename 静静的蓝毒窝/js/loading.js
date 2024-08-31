
import * as THREE from "three";

var loaded = false;


const sceneL = new THREE.Scene();
sceneL.background = null;

const texloader = new THREE.TextureLoader();
const texture = texloader.load('./image/bubble.png');

const groupL = new THREE.Group();
for (let i = 0; i < 5000; i++) {
    const spritematerial = new THREE.SpriteMaterial({
        color: `rgb(${Math.floor(Math.random() * 55 + 200)},${Math.floor(Math.random() * 55 + 200)},${Math.floor(Math.random() * 55 + 200)})`,
        map: texture,
        // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
    });
    const mesh = new THREE.Sprite(spritematerial);
    groupL.add(mesh);
    const size = Math.random() * 20 + 10;
    mesh.scale.set(size, size, 1);
    const x = 300 * (Math.random() - 0.5);
    const y = 300 * (Math.random() - 0.5);
    const z = 1000 * (Math.random() - 0.5);
    mesh.position.set(x, y, z);
}
sceneL.add(groupL);

var heightL = window.innerHeight;
var widthL = window.innerWidth;

// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const cameraL = new THREE.PerspectiveCamera(30, widthL / heightL, 10, 6000);
// cameraL.position.set(200, 200, 200);
// cameraL.lookAt(0, 0, 0);


const rendererL = new THREE.WebGLRenderer({
    //抗锯齿属性，WebGLRenderer常用的一个属性
    antialias: true,
    //透明度alpha，用来使背景透明
    alpha: true
});
rendererL.setClearAlpha(0);//设置alpha
rendererL.setSize(widthL, heightL);
rendererL.render(sceneL, cameraL);      //每次sceneL或者cameraL改变都需要重新render


document.getElementsByClassName("loading-three")[0].appendChild(rendererL.domElement);

const clock = new THREE.Clock();
//渲染函数
function render() {
    const t = clock.getDelta();
    groupL.children.forEach(mesh => {
        mesh.position.z += t * 60;
        if (mesh.position.z > 500) {
            mesh.position.z = -500;
        }
    })
    rendererL.render(sceneL, cameraL);
    requestAnimationFrame(render);
}
render();

let prog = 1;
var itv = setInterval(() => {
    if (prog <= 99) {
        document.getElementById("loading-progress").innerHTML = `${prog++}`;
    }
}, 50000 / 99);

window.onload = function () {
    // clearInterval(itv);
    document.getElementById("loading-progress").innerHTML = `100`;
    // setTimeout(() => { document.getElementsByClassName("loading")[0].style.display = "none"; }, 2000);
    loaded = true;
}

document.getElementsByClassName("loading-title")[0].style.display = "none";
window.addEventListener("resize", function () {
    heightL = window.innerHeight;
    widthL = window.innerWidth;
    rendererL.setSize(widthL, heightL);
})
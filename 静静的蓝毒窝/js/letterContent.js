
import * as THREE from "three";
import { OrbitControls } from "orbit";
import TWEEN from "tween";

const scene2 = new THREE.Scene();
scene2.background = null;
const groups = [];
const texloader = new THREE.TextureLoader();
const materialforlook = new THREE.MeshBasicMaterial();
const geoforlook = new THREE.SphereGeometry(20, 20, 20);
const meshforlook = new THREE.Mesh(geoforlook, materialforlook);
meshforlook.position.set(0, 0, 0);

var height = window.innerHeight;
var width = window.innerWidth * 0.88;

window.addEventListener("resize", function () {
    height = window.innerHeight;
    width = window.innerWidth * 0.88;
    renderer2.setSize(width, height);
})


/*
蓝毒周边
*/
const groupLDZB = new THREE.Group();
groups[2] = groupLDZB;

const textures2 = [];
for (let i = 0; i < 7; i++) {
    textures2[i] = texloader.load(`./image/letter/${i + 1}.png`);
}

for (let i = 0; i < 800; i++) {
    const texture = textures2[i % 7];
    const spritematerial = new THREE.SpriteMaterial({
        map: texture,
    });
    const mesh = new THREE.Sprite(spritematerial);
    groupLDZB.add(mesh);
    const size = Math.random() * 25 + 10;
    mesh.scale.set(size, size, size);
    const x = 1000 * (Math.random() - 0.5);
    const y = 80 * Math.random() - 40;
    const z = 1000 * (Math.random() - 0.5);
    mesh.position.set(x, y, z);
}
scene2.add(groupLDZB);
groupLDZB.visible = true;




const camera = new THREE.PerspectiveCamera(30, width / height, 150, 3000);
const R = 100; //相机圆周运动的半径
function circleMove() {
    new TWEEN.Tween({ angle: 0 })
        .to({ angle: Math.PI * 2 }, 24000)
        .onUpdate(function (obj) {
            camera.position.set(R * Math.cos(obj.angle), 0, R * Math.sin(obj.angle));
            camera.lookAt(meshforlook.position);
        })
        .start();
}
circleMove();
setInterval(circleMove, 24000);

const renderer2 = new THREE.WebGLRenderer({
    //抗锯齿属性，WebGLRenderer常用的一个属性
    antialias: true,
    //透明度alpha，用来使背景透明
    alpha: true
});
renderer2.setClearAlpha(0);//设置alpha
renderer2.setSize(width, height);
renderer2.render(scene2, camera);      //每次scene或者camera改变都需要重新render


document.getElementsByClassName("firstpart")[0].appendChild(renderer2.domElement);

//渲染函数
function render() {
    TWEEN.update();
    renderer2.render(scene2, camera);
    requestAnimationFrame(render);
}
render();

var all = document.getElementById("letter");

function handleIframeScroll() {
    let currentpos = all.scrollTop;
    let iframesceneCurrentscale = currentpos / 20;
    if (currentpos <= 0) {
        return;
    }
    else if (currentpos <= 3 * window.innerHeight) {
        document.getElementById("scrollld1").style.transform = `translate(${iframesceneCurrentscale * (-0.4) - 0}vw, ${iframesceneCurrentscale * (-2.6) + 10}vh)`;
        document.getElementById("scrollld2").style.transform = `translate(${iframesceneCurrentscale * (0.7) - 10}vw, ${iframesceneCurrentscale * (-2) + 60}vh)`;
        document.getElementById("scrollld3").style.transform = `translate(${iframesceneCurrentscale * (-1) + 20}vw, ${iframesceneCurrentscale * (-1.6) + 90}vh)`;
        document.getElementById("scrollld4").style.transform = `translate(${iframesceneCurrentscale * (0.8) - 30}vw, ${iframesceneCurrentscale * (-3.2) + 240}vh)`;
        document.getElementById("scrollld5").style.transform = `translate(${iframesceneCurrentscale * (-0.9) + 80}vw, ${iframesceneCurrentscale * (-3.2) + 340}vh)`;
        document.getElementById("scrollld6").style.transform = `translate(${iframesceneCurrentscale * (0.8) - 70}vw, ${iframesceneCurrentscale * (-3.2) + 440}vh)`;
    }
}

function appLoop() {
    handleIframeScroll();
    requestAnimationFrame(appLoop);
}
appLoop();
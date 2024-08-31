
import * as THREE from "three";
import { OrbitControls } from "orbit";
import TWEEN from "tween";

const scene = new THREE.Scene();
scene.background = null;
const groups = [];
const texloader = new THREE.TextureLoader();
const materialforlook = new THREE.MeshBasicMaterial();
const geoforlook = new THREE.SphereGeometry(20, 20, 20);
const meshforlook = new THREE.Mesh(geoforlook, materialforlook);
meshforlook.position.set(0, 0, 0);

var oldwidth = "7vw";
var newwidth = "17vw";
var oldsize = "1.6vw";
var newsize = "2.6vw";
function setOldNewWidthSize() {
    if (height > width) {
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

var height = window.innerHeight * 0.9;
var width = window.innerWidth * 0.9;

var currentOption = 1;
setOldNewWidthSize();
window.onresize = function () {
    height = window.innerHeight * 0.9;
    width = window.innerWidth * 0.9;
    renderer.setSize(width, height);
    setOldNewWidthSize();
}



/*
官方的
*/
const groupGFD = new THREE.Group();
groups[1] = groupGFD;

const material1 = [];
for (let i = 0; i < 6; i++) {
    material1[i] = new THREE.MeshBasicMaterial({ map: texloader.load(`./image/pic/${i + 1}.jpg`) });
}

for (let i = 0; i < 100; i++) {
    const size = Math.random() * 40 + 10;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geometry, [material1[0], material1[1], material1[2], material1[3], material1[4], material1[5]]);
    mesh.rotateX(2 * Math.PI * Math.random());
    mesh.rotateY(2 * Math.PI * Math.random());
    mesh.rotateZ(2 * Math.PI * Math.random());
    groupGFD.add(mesh);
    const x = 300 * (Math.random() - 0.5);
    const y = 200 * (Math.random() - 0.5);
    const z = 300 * (Math.random() - 0.5);
    let offset = 30;
    mesh.position.set(x > 0 ? x + offset : x - offset, y, z > 0 ? z + offset : z - offset);
}
scene.add(groupGFD);
groupGFD.visible = true;

document.getElementById("box-option1").onclick = function () {
    if (currentOption == 1) { return; }
    groups[currentOption].visible = false;
    groupGFD.visible = true;
    meshforlook.position.set(0, 0, 0);
    document.getElementById(`box-option${currentOption}`).style.width = oldwidth;
    document.getElementById(`box-option${currentOption}`).style.fontSize = oldsize;
    document.getElementById("box-option1").style.width = newwidth;
    document.getElementById("box-option1").style.fontSize = newsize;
    currentOption = 1;
}




/*
蓝毒周边
*/
const groupLDZB = new THREE.Group();
groups[2] = groupLDZB;

const textures2 = [];
for (let i = 0; i < 16; i++) {
    textures2[i] = texloader.load(`./image/pic/${i + 1}.jpg`);
}

for (let i = 0; i < 1000; i++) {
    const texture = textures2[i % 16];
    const spritematerial = new THREE.SpriteMaterial({
        map: texture,
    });
    const mesh = new THREE.Sprite(spritematerial);
    groupLDZB.add(mesh);
    const size = Math.random() * 40 + 10;
    mesh.scale.set(size, size, size);
    const x = 1000 * (Math.random() - 0.5);
    const y = 300 * Math.random() - 150;
    const z = 1000 * (Math.random() - 0.5);
    mesh.position.set(x, y, z);
}
scene.add(groupLDZB);
groupLDZB.visible = false;

document.getElementById("box-option2").onclick = function () {
    if (currentOption == 2) { return; }
    groups[currentOption].visible = false;
    groupLDZB.visible = true;
    meshforlook.position.set(0, 0, 0);
    document.getElementById(`box-option${currentOption}`).style.width = oldwidth;
    document.getElementById(`box-option${currentOption}`).style.fontSize = oldsize;
    document.getElementById("box-option2").style.width = newwidth;
    document.getElementById("box-option2").style.fontSize = newsize;
    currentOption = 2;
}



/*
其他的
*/
const groupQTD = new THREE.Group();
groups[3] = groupQTD;

const textures3 = [];
for (let i = 0; i < 16; i++) {
    textures3[i] = texloader.load(`./image/pic/${i + 1}.jpg`);
}

for (let i = 0; i < 1000; i++) {
    const texture = textures3[i % 16];
    const spritematerial = new THREE.SpriteMaterial({
        map: texture,
    });
    const mesh = new THREE.Sprite(spritematerial);
    groupQTD.add(mesh);
    const size = Math.random() * 40 + 10;
    mesh.scale.set(size, size, size);
    const x = 1000 * (Math.random() - 0.5);
    const y = 300 * Math.random() - 150;
    const z = 1000 * (Math.random() - 0.5);
    mesh.position.set(x, y, z);
}
scene.add(groupQTD);
groupQTD.visible = false;

document.getElementById("box-option3").onclick = function () {
    if (currentOption == 3) { return; }
    groups[currentOption].visible = false;
    groupQTD.visible = true;
    meshforlook.position.set(0, 0, 0);
    document.getElementById(`box-option${currentOption}`).style.width = oldwidth;
    document.getElementById(`box-option${currentOption}`).style.fontSize = oldsize;
    document.getElementById("box-option3").style.width = newwidth;
    document.getElementById("box-option3").style.fontSize = newsize;
    currentOption = 3;
}




/*
静静画的
*/
const groupJJHD = new THREE.Group();
groups[4] = groupJJHD;

const textureBall = texloader.load("./image/pic/15.jpg");
const materialBall = new THREE.MeshBasicMaterial({
    map: textureBall,
    color: 0xfadfd3,
});
const bqbBall = new THREE.SphereGeometry(20, 20, 20);
const meshBqbBall = new THREE.Mesh(bqbBall, materialBall);
meshBqbBall.position.set(0, -100, 0);
meshBqbBall.rotateX(-1);
groupJJHD.add(meshBqbBall);

for (let i = 0; i < 31; i++) {
    let size = Math.random() * 5 + 5;
    const geo = new THREE.SphereGeometry(size, size, size);
    const texture = texloader.load(`./image/pic/${i % 16 + 1}.jpg`);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        color: `rgb(${Math.floor(Math.random() * 55 + 200)},${Math.floor(Math.random() * 55 + 200)},${Math.floor(Math.random() * 55 + 200)})`
    })
    const mesh = new THREE.Mesh(geo, material);
    let xon = (Math.random() > 0.5 ? 1 : -1);   //x正反半轴
    let zon = (Math.random() > 0.5 ? 1 : -1);   //z正反半轴
    let meshx = (40 * Math.random() + 16);    //x大小
    let meshz = (40 * Math.random() + 16);    //z大小
    mesh.position.set(meshx * xon, -100, meshz * zon);
    let meshangle;       //当前角度计算
    let tempangle = Math.atan(meshx / meshz);          //当前角度计算
    if (zon > 0) {
        if (xon < 0) { meshangle = 2 * Math.PI - tempangle; }
    }
    else {
        if (xon > 0) { meshangle = Math.PI - tempangle; }
        else { meshangle = Math.PI + tempangle; }
    }
    let meshrotatex = (Math.random() > 0.5 ? 1 : -1);       //随机x旋转方向
    let meshrotatey = (Math.random() > 0.5 ? 1 : -1);       //随机z旋转方向
    let meshr = Math.sqrt(meshx * meshx + meshz * meshz);   //旋转半径
    function meshMove() {
        new TWEEN.Tween({ angle: 0 })
            .to({ angle: Math.PI * 2 }, 8000 * size / 7.5)
            .onUpdate(function (obj) {
                mesh.position.set(meshr * Math.cos(obj.angle + meshangle), -100, meshr * Math.sin(obj.angle + meshangle));
                mesh.rotateX(0.1 * (1 / size) * meshrotatex);
                mesh.rotateY(0.1 * (1 / size) * meshrotatey);
            })
            .start();
    }
    meshMove();
    setInterval(meshMove, 8000 * size / 7.5);
    groupJJHD.add(mesh);
}

scene.add(groupJJHD);
groupJJHD.visible = false;

document.getElementById("box-option4").onclick = function () {
    if (currentOption == 4) { return; }
    groups[currentOption].visible = false;
    groupJJHD.visible = true;
    meshforlook.position.set(0, -100, 0);
    document.getElementById(`box-option${currentOption}`).style.width = oldwidth;
    document.getElementById(`box-option${currentOption}`).style.fontSize = oldsize;
    document.getElementById("box-option4").style.width = newwidth;
    document.getElementById("box-option4").style.fontSize = newsize;
    currentOption = 4;
}





const camera = new THREE.PerspectiveCamera(30, width / height, 100, 3000);
const R = 100; //相机圆周运动的半径
function circleMove() {
    new TWEEN.Tween({ angle: 0 })
        .to({ angle: Math.PI * 2 }, 16000)
        .onUpdate(function (obj) {
            camera.position.set(R * Math.cos(obj.angle), 0, R * Math.sin(obj.angle));
            camera.lookAt(meshforlook.position);
        })
        .start();
}
circleMove();
setInterval(circleMove, 16000);




const renderer = new THREE.WebGLRenderer({
    //抗锯齿属性，WebGLRenderer常用的一个属性
    antialias: true,
    //透明度alpha，用来使背景透明
    alpha: true
});
renderer.setClearAlpha(0);//设置alpha
renderer.setSize(width, height);
renderer.render(scene, camera);      //每次scene或者camera改变都需要重新render


document.getElementById("mainScene").appendChild(renderer.domElement);

const clock = new THREE.Clock();
//渲染函数
function render() {
    //官方的
    groupGFD.children.forEach((mesh => {
        mesh.rotateX(mesh.scale.x * 0.01);
        mesh.rotateY(mesh.scale.y * 0.01);
        mesh.rotateZ(mesh.scale.z * 0.01);
    }))

    //蓝毒周边
    const t = clock.getDelta();
    groupLDZB.children.forEach(mesh => {
        mesh.position.y -= t * 30;
        if (mesh.position.y < -150) {
            mesh.position.y = 150;
        }
    })

    //其他的
    groupQTD.children.forEach(mesh => {
        mesh.position.y += t * 20;
        if (mesh.position.y > 150) {
            mesh.position.y = -150;
        }
    })

    //静静画的
    meshBqbBall.rotateY(0.01);

    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
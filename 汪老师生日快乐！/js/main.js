
import * as THREE from "three";
import TWEEN from "tween";

const scene = new THREE.Scene();
scene.background = null;
const groups = [];
const texloader = new THREE.TextureLoader();
const materialforlook = new THREE.MeshBasicMaterial();
const geoforlook = new THREE.SphereGeometry(20, 20, 20);
const meshforlook = new THREE.Mesh(geoforlook, materialforlook);
meshforlook.position.set(0, 0, 0);

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
}


/*
蓝毒周边
*/
const groupLDZB = new THREE.Group();
groups[2] = groupLDZB;

const textures2 = [];
for (let i = 0; i < 4; i++) {
    textures2[i] = texloader.load(`./image/${i + 1}.jpg`);
}

for (let i = 0; i < 1000; i++) {
    const texture = textures2[i % 4];
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
groupLDZB.visible = true;



const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 100, 3000);
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
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);      //每次scene或者camera改变都需要重新render


document.getElementById("mainScene").appendChild(renderer.domElement);

const clock = new THREE.Clock();
//渲染函数
function render() {
    const t = clock.getDelta();
    groupLDZB.children.forEach(mesh => {
        mesh.position.y -= t * 30;
        if (mesh.position.y < -150) {
            mesh.position.y = 150;
        }
    })

    TWEEN.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
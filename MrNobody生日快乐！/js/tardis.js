// 全局变量
let scene, camera, renderer, tardisModel, controls;
let animationId;
let isAnimating = true;
let rotationSpeed = 0.02;
let directionalLight, ambientLight;
let isWireframe = false;

// 初始化场景
function init() {
  // 创建场景
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a23, 10, 100);

  // 创建相机 - 调整初始位置更远
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(25, 20, 35); // 大幅增加距离

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0a0a23, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  document.getElementById("tardis-container").appendChild(renderer.domElement);

  // 添加轨道控制器 - 调整距离限制
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minDistance = 15; // 增加最小距离
  controls.maxDistance = 150; // 增加最大距离
  controls.maxPolarAngle = Math.PI;

  // 设置灯光
  setupLighting();

  // 添加星空背景
  createStarField();

  // 加载TARDIS模型
  loadTARDISModel();

  // 开始动画循环
  animate();
}

// 设置灯光
function setupLighting() {
  // 环境光
  ambientLight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(ambientLight);

  // 主要方向光 (模拟太阳光)
  directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(10, 15, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  directionalLight.shadow.bias = -0.0001;
  scene.add(directionalLight);

  // 蓝色补充光 (模拟TARDIS的蓝色氛围)
  const blueLight = new THREE.DirectionalLight(0x4a90e2, 0.3);
  blueLight.position.set(-5, 10, -5);
  scene.add(blueLight);

  // 顶部点光源 (模拟TARDIS灯光)
  const topLight = new THREE.PointLight(0xffffff, 0.8, 20);
  topLight.position.set(0, 8, 0);
  topLight.castShadow = true;
  scene.add(topLight);
}

// 创建星空背景
function createStarField() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,
    transparent: true,
    opacity: 0.8,
  });

  const starVertices = [];
  for (let i = 0; i < 1500; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

// 加载TARDIS模型
function loadTARDISModel() {
  const mtlLoader = new THREE.MTLLoader();

  // 首先加载材质文件
  mtlLoader.load(
    "../tardis/tardisObj/tardis.mtl",
    function (materials) {
      materials.preload();

      // 修改材质以符合TARDIS的经典外观
      if (materials.materials.Blue) {
        materials.materials.Blue.color.setHex(0x003b6f); // TARDIS蓝
        materials.materials.Blue.shininess = 50;
      }
      if (materials.materials.Black) {
        materials.materials.Black.color.setHex(0x000000);
      }
      if (materials.materials.White) {
        materials.materials.White.color.setHex(0xffffff);
        materials.materials.White.emissive.setHex(0x222222);
      }

      // 加载OBJ文件
      const objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);

      objLoader.load(
        "../tardis/tardisObj/tardis.obj",
        function (object) {
          tardisModel = object;

          // 调整模型大小和位置
          tardisModel.scale.set(4, 4, 4); // 放大模型
          tardisModel.position.set(0, 0, 0);
          tardisModel.rotation.y = Math.PI; // 旋转180度面向观察者

          // 启用阴影
          tardisModel.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // 确保材质正确应用
              if (child.material) {
                // 检查材质是否有颜色属性
                if (child.material.color) {
                  // 根据材质名称或颜色判断是否为蓝色材质
                  if (
                    child.material.name === "Blue" ||
                    child.material.color.r < 0.1
                  ) {
                    child.material.color.setHex(0x003b6f);
                    child.material.shininess = 50;
                  }
                } else if (child.material.name === "Blue") {
                  // 如果材质没有颜色属性但名称是Blue，创建新的颜色
                  child.material.color = new THREE.Color(0x003b6f);
                  child.material.shininess = 50;
                }

                // 处理材质数组的情况
                if (Array.isArray(child.material)) {
                  child.material.forEach((material) => {
                    if (material.color) {
                      if (material.name === "Blue" || material.color.r < 0.1) {
                        material.color.setHex(0x003b6f);
                        material.shininess = 50;
                      }
                    } else if (material.name === "Blue") {
                      material.color = new THREE.Color(0x003b6f);
                      material.shininess = 50;
                    }
                  });
                }
              }
            }
          });

          scene.add(tardisModel);

          // 隐藏加载提示，显示控制界面
          document.getElementById("loading").style.display = "none";

          console.log("TARDIS model loaded successfully!");
        },
        // 加载进度回调
        function (progress) {
          console.log(
            "Loading progress: ",
            (progress.loaded / progress.total) * 100 + "%"
          );
        },
        // 加载错误回调
        function (error) {
          console.error("Error loading OBJ:", error);
          showError();
        }
      );
    },
    // MTL加载进度回调
    function (progress) {
      console.log(
        "MTL Loading progress: ",
        (progress.loaded / progress.total) * 100 + "%"
      );
    },
    // MTL加载错误回调
    function (error) {
      console.error("Error loading MTL:", error);
      // 即使MTL加载失败，也尝试加载OBJ
      loadOBJOnly();
    }
  );
}

// 仅加载OBJ文件（当MTL加载失败时）
function loadOBJOnly() {
  const objLoader = new THREE.OBJLoader();

  objLoader.load(
    "../tardis/tardisObj/tardis.obj",
    function (object) {
      tardisModel = object;

      // 应用默认TARDIS材质
      tardisModel.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // 确保创建新的材质而不是修改现有的undefined材质
          child.material = new THREE.MeshPhongMaterial({
            color: 0x003b6f,
            shininess: 50,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      tardisModel.scale.set(4, 4, 4);
      tardisModel.position.set(0, 0, 0);
      tardisModel.rotation.y = Math.PI;

      scene.add(tardisModel);

      document.getElementById("loading").style.display = "none";

      console.log("TARDIS model loaded (without MTL)!");
    },
    function (progress) {
      console.log(
        "OBJ Loading progress: ",
        (progress.loaded / progress.total) * 100 + "%"
      );
    },
    function (error) {
      console.error("Error loading OBJ:", error);
      showError();
    }
  );
}

// 显示错误信息
function showError() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").style.display = "block";
}

// 动画循环
let direction = "down";
function animate() {
  animationId = requestAnimationFrame(animate);

  // 自动旋转TARDIS
  if (isAnimating && tardisModel) {
    if (tardisModel.rotation.x <= -0.5) {
      direction = "up";
    } else if (tardisModel.rotation.x >= 0.5) {
      direction = "down";
    }
    tardisModel.rotation.x -=
      ((direction === "down" ? 1 : -1) * rotationSpeed) / 5;
    tardisModel.rotation.y += rotationSpeed;
  }

  // 更新控制器
  controls.update();

  // 渲染场景
  renderer.render(scene, camera);
}

// 窗口大小调整
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 事件监听器
window.addEventListener("resize", onWindowResize, false);
// 启动应用
init();

import "./style.css";
import * as THREE from "three";

// orbit control provides the ability to move the camera around
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Wireframe } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
// there are three types of material
// 1. MeshBasicMaterial => this type of meterial cannot reflect any light changes
// 2. MeshStandardMaterial => Physically based Rendering (PBR) this is natural looking material , required light to view and reflects the light changes
// 3. MeshPhongMaterial => this is the best looking material and reflects the light changes

// there are many types of lights 
// 1. AmbientLight => this is the light which is emitted from the whole scene
// 2. DirectionalLight => this is the light which is emitted from a specific direction
// 3. PointLight => this is the light which is emitted from a specific point
// also there are helpers to visualize the lights

// there are many types of geometries
// 1. BoxGeometry => this is the geometry which is used to create a box
// 2. SphereGeometry => this is the geometry which is used to create a sphere
// 3. PlaneGeometry => this is the geometry which is used to create a plane

// there are many types of textures
// 1. TextureLoader => this is the loader which is used to load the texture
// e.g. let loader = new TextureLoader();
        // let texture = loader.load('texture.jpg');
        // const material = new THREE.MeshBasicMaterial({ map: texture });
// 2. CubeTextureLoader => this is the loader which is used to load the texture
// 3. DataTextureLoader => this is the loader which is used to load the texture

//.............We can create Panel to control thins liek directional light , size , texture ,.......using lil-gui library
// 1. import lil-gui from 'lil-gui';
// 2. const gui = new lil-gui();
// 3. const panel = gui.addFolder('Panel');
// 4. panel.add(object, 'property', min, max, step);


// download free 3d models from Sketchfab and 
// 1. download glb formet file 
// 2. import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 3. const loader = new GLTFLoader();
// 4. loader.load('model.glb', (gltf) => {
  // optional // gltf.scene.position.y = -1;
//     scene.add(gltf.scene);
//   });


// Rgbe  loader => this is used to load HDRI(envireoment lighting liek 360 degree lights) lights 
// 1. import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// 2. const rgbeLoader = new RGBELoader();
// 3. rgbeLoader.load('image.hdr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture; // this will give full enviroment look // did not need 
//     scene.environment = texture;
//   });



const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// to make the design responsive
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // one point to note down is that whenever we change camera values we need to update the projection matrix
  camera.updateProjectionMatrix();
});

// lets make control on the movement of cuve
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // to make the movement smooth
controls.autoRotate = true; // this will rotate the cube
controls.autoRotateSpeed = 4.0; // the speed of rotation
controls.dampingFactor = 0.02; // the speed of damping/rotation stop

function animate() {
  requestAnimationFrame(animate);
  // also updata controls on each frame
  controls.update();
  renderer.render(scene, camera);
}
animate();

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

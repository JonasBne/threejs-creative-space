import './app/app.element.ts';
import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as debugUI from 'lil-gui';

/*
 * debug interface
 *  */
const gui = new debugUI.GUI();

/*
 * canvas
 * */
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

/*
 * initiate a scene
 * */
const scene = new THREE.Scene();
scene.background = new THREE.Color('#111827');

/*
 * objects
 * */

/*
 * cube 1
 * */

const cubeGeometry1 = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const cubeMaterial1 = new THREE.MeshBasicMaterial({ color: '#FFF' });
const cubeMesh1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);

cubeMesh1.position.x = -1;

const folderCube1 = gui.addFolder('cube 1');

folderCube1
  .add(cubeMesh1.position, 'x')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('horizontal');
folderCube1
  .add(cubeMesh1.position, 'y')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('vertical');
folderCube1
  .add(cubeMesh1.position, 'z')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('depth');

folderCube1.add(cubeMesh1.rotation, 'x').min(-4).max(4).step(0.01);
folderCube1.add(cubeMesh1.rotation, 'y').min(-4).max(4).step(0.01);
folderCube1.add(cubeMesh1.rotation, 'z').min(-4).max(4).step(0.01);

scene.add(cubeMesh1);

/*
 * cube 2
 * */

const cubeGeometry2 = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: '#FFF' });
const cubeMesh2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

const folderCube2 = gui.addFolder('cube 2');

folderCube2
  .add(cubeMesh2.position, 'x')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('horizontal');
folderCube2
  .add(cubeMesh2.position, 'y')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('vertical');
folderCube2
  .add(cubeMesh2.position, 'z')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('depth');

folderCube2.add(cubeMesh2.rotation, 'x').min(-4).max(4).step(0.01);
folderCube2.add(cubeMesh2.rotation, 'y').min(-4).max(4).step(0.01);
folderCube2.add(cubeMesh2.rotation, 'z').min(-4).max(4).step(0.01);

scene.add(cubeMesh2);

/*
 * cube 3
 * */

const cubeGeometry3 = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const cubeMaterial3 = new THREE.MeshBasicMaterial({ color: '#FFF' });
const cubeMesh3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);

cubeMesh3.position.x = 1;

const folderCube3 = gui.addFolder('cube 3');

folderCube3
  .add(cubeMesh3.position, 'x')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('horizontal');
folderCube3
  .add(cubeMesh3.position, 'y')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('vertical');
folderCube3
  .add(cubeMesh3.position, 'z')
  .min(-4)
  .max(4)
  .step(0.0001)
  .name('depth');

folderCube3.add(cubeMesh3.rotation, 'x').min(-4).max(4).step(0.01);
folderCube3.add(cubeMesh3.rotation, 'y').min(-4).max(4).step(0.01);
folderCube3.add(cubeMesh3.rotation, 'z').min(-4).max(4).step(0.01);

scene.add(cubeMesh3);

/*
 * sphere
 * */

const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

/*
 * plane
 */

const planeGeometry = new THREE.PlaneGeometry(3, 3);
const planeMaterial = new THREE.MeshBasicMaterial({ color: '#FFF' });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

planeMesh.rotation.x = -Math.PI * 0.5;
planeMesh.position.y = -0.65;

scene.add(planeMesh);

/*
 * sizes
 * */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/*
 * handle screen resizes
 * */
window.addEventListener('resize', () => {
  /*
   * update sizes
   * */
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  /*
   * update camera aspect
   * */
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  /*
   * update renderer and pixel ratio
   * */
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/*
 * camera
 * */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 4;

gui
  .add(camera.position, 'x')
  .min(-6)
  .max(6)
  .step(0.001)
  .name('camera vertical');
gui
  .add(camera.position, 'y')
  .min(-6)
  .max(6)
  .step(0.001)
  .name('camera horizontal');
gui.add(camera.position, 'z').min(-6).max(6).step(0.001).name('camera depth');

scene.add(camera);

/*
 * orbit controls
 * */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*
 * renderer
 * */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

/*
 * add size to renderer to avoid pixelated views
 * */
renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  // enable damping
  controls.update();
  // render scene
  renderer.render(scene, camera);
  // pass reference to itself to create infinite loop of frames
  window.requestAnimationFrame(animate);
};

animate();

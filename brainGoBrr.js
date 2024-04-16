import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let canvas, renderer, camera, scene

init();



scene.background = new THREE.Color(0x00000000);

const loader = new THREE.TextureLoader();
const floorTexture = loader.load('assets/basement.png');
floorTexture.colorSpace = THREE.SRGBColorSpace;
const floorSize = 40;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
const floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.magFilter = THREE.NearestFilter;
floorTexture.colorSpace = THREE.SRGBColorSpace;
const repeats = floorSize / 2;
floorTexture.repeat.set(repeats, repeats);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI * -.5;
floorTexture.NearestFilter
scene.add(floor);

let table, borad;

const gltfLoader = new GLTFLoader();
const url = 'assets/Table.gltf';



gltfLoader.load(url, (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  console.log(dumpObject(root).join('\n'));
  table = root.getObjectByName('Table');
  console.log(table.position)
  console.log(dumpObject(scene).join('\n'));
});

table = scene.getObjectByName('Table')
console.log(scene)
console.log(scene.children[0])
console.log(dumpObject(scene).join('\n'));

// gltfLoader.load(`assets/checkerboard.gltf`, (gltf) => {
//   const root = gltf.scene;
//   scene.add(root);
//   console.log(dumpObject(root).join('\n'));
//   borad = root.getObjectByName('bone');
//   borad.position.y = 2.8;
//   borad.position.z = 1.5;
//   borad.scale.setScalar(1.2)
//   console.log(borad.position)
// })


const color = 0xFFFFFF;
const intensity = 220;
const light = new THREE.SpotLight(color, intensity);
light.position.set(0, 10, 5);
light.penumbra = .2
light.angle = .4
scene.add(light);


document.addEventListener(`DOMContentLoaded`, function () {

})

render();

//threejs function zone

function init() {

  canvas = document.querySelector(`#threejsLoader`);
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
  scene = new THREE.Scene();
  renderer.render(scene, camera);
  camera.position.set(0,6,5.5)
  camera.rotation.x = -0.7;
}

function render(time) {
  time *= 0.001;  // convert to seconds

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  if (table) {
    table.rotation.y = time;
    table.position.y = 2;
    table.position.z = 1.5;
    table.scale.setScalar(1.2)

  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);

}



//End of threejs function zone


//DOMContent function zone

function elementById(id) {
  return document.getElementById(id);
};

function addListener(id, event, code) {
  elementById(id).addEventListener(event, (eventData) => { code(); });
};

//End of DOMContent funtion zone

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}
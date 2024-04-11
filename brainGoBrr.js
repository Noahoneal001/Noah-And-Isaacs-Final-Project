import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector(`#threejsLoader`);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
const scene = new THREE.Scene();
renderer.render(scene, camera);
camera.position.y = 6;
camera.position.z = 5.5;
camera.rotation.x = -0.7;

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

let table;

const gltfLoader = new GLTFLoader();
const url = 'assets/Table.gltf';
gltfLoader.load(url, (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  console.log(dumpObject(root).join('\n'));
  table = root.getObjectByName('bone');
  table.position.y = 2;
  table.position.z = 1.5;
  table.scale.setScalar(1.2)
  console.log(table.position)
});

gltfLoader.load(`assets/checkerboard.gltf`, (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  console.log(dumpObject(root).join('\n'));
  table = root.getObjectByName('bone');
  table.position.y = 2.8;
  table.position.z = 1.5;
  table.scale.setScalar(1.2)
  console.log(table.position)
})


const color = 0xFFFFFF;
const intensity = 220;
const light = new THREE.SpotLight(color, intensity);
light.position.set(0, 10, 5);
light.penumbra = .2
light.angle = .4
scene.add(light);


document.addEventListener(`DOMContentLoaded`, function () {

  document.addEventListener(`keydown`, (eventData) => {
    if (eventData.key == `ArrowLeft`) { camera.position.x -= .5 }
    else if (eventData.key == `ArrowRight`) { camera.position.x += .5 }
    else if (eventData.key == `ArrowUp`) { camera.position.y -= .5 }
    else if (eventData.key == `ArrowDown`) { camera.position.y += .5 }
    else if (eventData.key == `v`) { console.log(camera.rotation); console.log(camera.position) }
  })


})

//threejs function zone

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
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
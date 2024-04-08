import * as THREE from 'three';

import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

let hello;
const canvas = document.querySelector(`#threejsLoader`);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
const scene = new THREE.Scene();
renderer.render(scene, camera);
camera.position.z = 2;

scene.background = new THREE.Color(0xAAAAAA);

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
mtlLoader.load('assets/materials.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load('assets/model.obj', (root) => {
    scene.add(root);
  });
});

document.addEventListener(`DOMContentLoaded`, function () {

        document.addEventListener(`keydown`, (eventData) => {
            if(eventData.key == `ArrowLeft`) {camera.position.x -= .5}
            else if(eventData.key == `ArrowRight`) {camera.position.x += .5}
            else if(eventData.key == `ArrowUp`) {camera.position.z -= .5}
            else if(eventData.key == `ArrowDown`) {camera.position.z += .5}
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
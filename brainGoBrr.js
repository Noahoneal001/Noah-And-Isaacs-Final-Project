import * as THREE from 'three';

createScene()

//threejs function zone

function createScene() {
    const canvas = document.querySelector('#threejsLoader');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    const scene = new THREE.Scene();
    renderer.render(scene, camera);
}

//End of threejs function
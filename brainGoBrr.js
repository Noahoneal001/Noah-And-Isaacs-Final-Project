import * as THREE from 'three';

document.addEventListener(`DOMContentLoaded`, function () {

    const canvas = document.querySelector(`#threejsLoader`);
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    const scene = new THREE.Scene();
    renderer.render(scene, camera);

});

//threejs function zone



//End of threejs function zone


//DOMContent function zone

function elementById(id) {
    return document.getElementById(id);
};

function addListener(id, event, code) {
    elementById(id).addEventListener(event, (eventData) => { code(); });
};

//End of DOMContent funtion zone
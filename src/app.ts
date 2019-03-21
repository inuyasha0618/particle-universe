import * as THREE from 'three';
import RenderLooper from 'render-looper';
const OrbitControls = require('three-orbitcontrols')

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const scene: THREE.Scene = new THREE.Scene();
// let ball = new THREE.SphereGeometry(40, 30, 30);
// let pointMaterial = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 2
// })

// const particleSystem = new THREE.Points(ball, pointMaterial);
// scene.add(particleSystem);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(200);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
 
 
// How far you can dolly in and out ( PerspectiveCamera only )
controls.minDistance = 0;
controls.maxDistance = Infinity;

this.enableZoom = true; // Set to false to disable zooming
this.zoomSpeed = 1.0;

console.log(THREE.OBJLoader);
const loader = new THREE.OBJLoader();
loader.load('./models/BaoLi_O.obj', function(object) {
    for (let child of object.children) {
        const geo = child.geometry;
        let pointMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1
        })
    
        const particleSystem = new THREE.Points(geo, pointMaterial);
        scene.add(particleSystem);
    }

})

new RenderLooper(() => {
    scene.rotation.y += 0.01;
    scene.traverse(function(obj) {
        console.log(obj);
        return;
    })
    renderer.render(scene, camera);
    
}).start()



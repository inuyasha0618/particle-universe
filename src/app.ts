import * as THREE from 'three';
import RenderLooper from 'render-looper';
import { BufferGeometryUtils } from './libs/BufferGeometeryUtils';
const OrbitControls = require('three-orbitcontrols')

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

const scene: THREE.Scene = new THREE.Scene();

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

let totalBufferGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
const loader = new THREE.OBJLoader();

loader.load('./models/o.obj', function(object) { 
    // 将所有的geometry合并为一个大的
    totalBufferGeometry = BufferGeometryUtils.mergeBufferGeometries(object.children.map(child => child.geometry), false);

    let pointMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1
    })

    const particleSystem = new THREE.Points(totalBufferGeometry, pointMaterial);
    scene.add(particleSystem);
    console.log(totalBufferGeometry);
})

new RenderLooper(() => {
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
    
}).start()



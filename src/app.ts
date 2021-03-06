import * as THREE from 'three';
import RenderLooper from 'render-looper';
import { BufferGeometryUtils } from './libs/BufferGeometeryUtils';
import { point_vs, point_fs } from './shaders/index';
import { BufferAttribute } from 'three';

const TWEEN = require('@tweenjs/tween.js');
const OrbitControls = require('three-orbitcontrols')

var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
const textureLoader = new THREE.TextureLoader();

const scene: THREE.Scene = new THREE.Scene();

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.setZ(200);
camera.position.set(0, 50, 500);
camera.lookAt(new THREE.Vector3(0, 50, 0));

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI;
 
 
// How far you can dolly in and out ( PerspectiveCamera only )
controls.minDistance = 0;
// controls.maxDistance = 900;

// this.enableZoom = true; // Set to false to disable zooming
// this.zoomSpeed = 1.0;

let totalBufferGeometry: THREE.BufferGeometry = null;
const loader = new THREE.OBJLoader();
let particleSystem: THREE.Points = null;
var tween = new TWEEN.Tween({ percent: 0.0 }).to({ percent: 1.0 }, 5000);
loader.load('./models/o.obj', function(object) { 
    // 将所有的geometry合并为一个大的
    totalBufferGeometry = BufferGeometryUtils.mergeBufferGeometries(object.children.map(child => child.geometry), false);

    const pointCnts: number = totalBufferGeometry.attributes.position.count;
    let pointIdx: Float32Array = new Float32Array(pointCnts);
    let star_point_position: Float32Array = new Float32Array(pointCnts * 3);
    for (let i = 0; i < pointCnts; i++) {
        pointIdx[i] = i;
        // const radius: number = Math.random() * 10000;
        // const theta: number = Math.random() * Math.PI;
        // const phi: number = Math.random() * Math.PI * 2;
        star_point_position[3 * i] = (Math.random() - 0.5) * 2000 * 5;
        star_point_position[3 * i + 1] = (Math.random() - 0.5) * 1100 * 5;
        star_point_position[3 * i + 2] = (Math.random() - 0.5) * 2000 * 5;
        // star_point_position[3 * i] = radius * Math.sin(theta) * Math.cos(phi);
        // star_point_position[3 * i + 1] = radius * Math.cos(theta);
        // star_point_position[3 * i + 2] = radius * Math.sin(theta) * Math.sin(phi);
    }

    const pointTexture = textureLoader.load('./images/particle.png');
    pointTexture.minFilter = THREE.LinearFilter;
    pointTexture.magFilter = THREE.LinearFilter;

    totalBufferGeometry.addAttribute('aIndex', new BufferAttribute(pointIdx, 1, false));
    totalBufferGeometry.addAttribute('aStarPos', new BufferAttribute(star_point_position, 3, false));
    // totalBufferGeometry.addAttribute('position', new BufferAttribute(star_point_position, 3, false));
    const shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
        vertexShader: point_vs,
        fragmentShader: point_fs,
        uniforms: {
            uTime: {
                value: 0.0
            },
            tex: {
                value: pointTexture
            },
            percent: {
                value: 0.0
            }
        },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    })

    // const particleSystem = new THREE.Points(totalBufferGeometry, pointMaterial);
    particleSystem = new THREE.Points(totalBufferGeometry, shaderMaterial);
    // particleSystem.scale.setScalar(0.1)
    scene.add(particleSystem);

    tween.onUpdate(function(obj) {
        console.log(obj)
        particleSystem.material.uniforms.percent.value = obj.percent;
    })
    // tween.start();
})

function update(msTotal) {
    // if (!totalBufferGeometry) return;
    // let aSizes = totalBufferGeometry.attributes.size;
    // let arr = totalBufferGeometry.attributes.size.array;
    // const pointCnts: number = totalBufferGeometry.attributes.size.count;
    // for (let i = 0; i < pointCnts; i++) {
    //     arr[i] = 5.5 + 5 * Math.sin(0.002 * msTotal + i * 10);
    // }
    // aSizes.needsUpdate = true;
    particleSystem.material.uniforms.uTime.value = msTotal;
}

new RenderLooper((msDt, msTotal) => {
    if (!particleSystem) return;
    update(msTotal);
    TWEEN.update();
    scene.rotation.y -= .0005;

    renderer.render(scene, camera);
    
}).start()

document.querySelector('#btn').addEventListener('click', function() {
    tween.start();
})
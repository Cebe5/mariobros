import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';

export var scene, camera, renderer, sun, fillLight;

// ESCENA
scene = new THREE.Scene();
scene.background = new THREE.Color(0x5c94fc);
scene.fog = new THREE.Fog(0x5c94fc, 80, 180);

camera = new THREE.PerspectiveCamera(68, innerWidth/innerHeight, 0.1, 500);
camera.position.set(0, 8, 14);

renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

sun = new THREE.DirectionalLight(0xfff5cc, 1.0);
sun.position.set(40, 80, 20); sun.castShadow = true;
sun.shadow.mapSize.width = 1024; sun.shadow.mapSize.height = 1024;
sun.shadow.camera.left = -60; sun.shadow.camera.right = 60;
sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -10; sun.shadow.camera.far = 200;
sun.shadow.bias = -0.001;
scene.add(sun);
scene.add(sun.target);
scene.add(new THREE.AmbientLight(0xaaccff, 0.4));
fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
fillLight.position.set(0, 10, 30);
fillLight.castShadow = false;
scene.add(fillLight);


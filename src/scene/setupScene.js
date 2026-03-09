import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1f2f);
  scene.fog = new THREE.Fog(0x001e3c, 5, 25);
  return scene;
}

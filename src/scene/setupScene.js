import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1f2f);
  scene.fog = new THREE.FogExp2(0x0a1f2f, 0.02);
  return scene;
}

import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x001e0f);
  scene.fog = new THREE.Fog(0x001e0f, 10, 50);
  return scene;
}

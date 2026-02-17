import * as THREE from 'three';

export function addLights(scene) {
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(5, 10, 7);
  scene.add(directional);
}

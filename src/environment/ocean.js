import * as THREE from 'three';

export function createOcean(scene) {
  const geometry = new THREE.PlaneGeometry(100, 100, 100, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1e90ff,
    wireframe: false,
    side: THREE.DoubleSide,
  });

  const ocean = new THREE.Mesh(geometry, material);
  ocean.rotation.x = -Math.PI / 2;
  scene.add(ocean);

  return ocean;
}

import * as THREE from "three";

export function createLightRays(scene) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/textures/lightRay.png");

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const raysGroup = new THREE.Group();

  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.PlaneGeometry(
      3 + Math.random() * 2,   // skinny width
      40
    );

    const ray = new THREE.Mesh(geometry, material.clone());

    ray.position.x = (i - 4.5) * 6;
    ray.position.y = 5;
    ray.position.z = -3* 5;

    ray.material.opacity = 1.1 * 0.1;

    raysGroup.add(ray);
  }

  scene.add(raysGroup);

  return raysGroup;
}

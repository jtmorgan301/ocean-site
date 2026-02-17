import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadFish(scene) {
  const loader = new GLTFLoader();

  return new Promise((resolve) => {
    loader.load("/models/clownfish.glb", (gltf) => {
      const fish = gltf.scene;
      const fishArray = [];

      fish.traverse((child) => {
        if (child.isMesh) {
          child.userData.description = "Clownfish: Reef species.";
          fishArray.push(child);
        }
      });

      scene.add(fish);
      resolve(fishArray);
    });
  });
}
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadFish(scene) {
  const loader = new GLTFLoader();
  const fishArray = [];

  return new Promise((resolve) => {
    loader.load('/models/clownfish.glb', (gltf) => {
      const fish = gltf.scene;
      fish.position.set(2, 0, -3);
      fish.userData.description = "Clownfish: Found in coral reefs.";
      scene.add(fish);
      fishArray.push(fish);
      resolve(fishArray);
    });
  });
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadFish(scene) {
  const loader = new GLTFLoader();

  return new Promise((resolve) => {
    loader.load("/models/clownfish.glb", (gltf) => {
      const fish = gltf.scene;
      const fishArray = [];

      fish.traverse((child) => {
        if (child.isMesh) {
          child.userData.description = "My name is Nemo and i am a clownfish!";
          fishArray.push(child);
        }
      });
      fish.rotation.y = Math.PI / 2;

      fish.position.x = 5;
      fish.position.z -= 7;
      fish.position.y -= 1.5;

      scene.add(fish);
      resolve(fishArray);
    });
  });
}
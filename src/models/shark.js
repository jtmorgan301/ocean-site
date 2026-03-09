import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadShark(scene) {
  const loader = new GLTFLoader();

  return new Promise((resolve) => {
    loader.load("/models/shark.glb", (gltf) => {
      const shark = gltf.scene;

      // Position deeper in the ocean
      shark.position.set(0, -8, -10);

      // Turn shark sideways if needed
      shark.rotation.y = Math.PI / 2;

      scene.add(shark);

      const sharkArray = [];

      shark.traverse((child) => {
        if (child.isMesh) {
          child.userData.description = "A curious reef shark cruising the deep.";
          sharkArray.push(child);
        }
      });

      resolve({
        shark,
        sharkArray,
        animations: gltf.animations
      });
    });
  });
}
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadFish(scene) {
  const loader = new GLTFLoader();

  return new Promise((resolve) => {
    loader.load("/models/clownfish.glb", (gltf) => {
      const fish = gltf.scene;
      scene.add(fish);
      const fishArray = [];

      fish.traverse((child) => {
        if (child.isMesh) {
          child.userData.description = "My name is Nemo and i am a clownfish!";
          fishArray.push(child);
        }
      });
      fish.rotation.y = Math.PI / 2;

      fish.position.set(2, -2, -7);   // clownfish slightly deeper

      scene.add(fish);
      resolve({
      fish,
      fishArray,
      animations: gltf.animations
    });
    });
  });
}
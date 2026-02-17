import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export function loadDiver(scene) {
  const loader = new GLTFLoader();

  return new Promise((resolve) => {
    loader.load("/models/diver.glb", (gltf) => {
      const diver = gltf.scene;
      diver.position.set(0, 2, 0);
      scene.add(diver);

      // 🔥 Check animations
      if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(diver);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        resolve({ diver, mixer });
      } else {
        resolve({ diver, mixer: null });
      }
    });
  });
}

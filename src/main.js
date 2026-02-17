import * as THREE from "three";

import { createScene } from "./scene/setupScene.js";
import { createCamera } from "./scene/camera.js";
import { createRenderer } from "./scene/renderer.js";
import { addLights } from "./scene/lights.js";

import { createOcean } from "./environment/ocean.js";
import { loadDiver } from "./models/diver.js";
import { loadFish } from "./models/fish.js";
import { setupMouse } from "./interaction/mouse.js";


const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

addLights(scene);

const ocean = createOcean(scene);

// Load models
let diver;
let fishArray = [];
let mixer;
const clock = new THREE.Clock();

loadDiver(scene).then((result) => {
  diver = result.diver;
  mixer = result.mixer;

  setupMouse(diver);
});

loadFish(scene).then((fish) => {
  fishArray = fish;
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

animate();

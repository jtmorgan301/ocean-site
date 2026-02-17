import * as THREE from "three";
import { createScene } from "./scene/setupScene.js";
import { createCamera } from "./scene/camera.js";
import { createRenderer } from "./scene/renderer.js";
import { addLights } from "./scene/lights.js";

import { createOcean } from "./environment/ocean.js";
import { loadDiver } from "./models/diver.js";
import { loadFish } from "./models/fish.js";
import { setupMouse } from "./interaction/mouse.js";

import { createRaycaster } from "./interaction/raycaster.js";
import { showTooltip, hideTooltip, createTooltip } from "./ui/tooltip.js";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

addLights(scene);

const ocean = createOcean(scene);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
createTooltip();

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

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


// 🔥 WAIT for fish to load
loadFish(scene).then((fishArray) => {

  const checkIntersections = createRaycaster(camera, fishArray);
  //Glow Effect Variables
  let hoveredFish = null;

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  const intersects = checkIntersections();
// Tooltip Logic
  if (intersects.length > 0) {
    const fishMesh = intersects[0].object;
    showTooltip(fishMesh.userData.description, mouseX, mouseY);
  } else {
    hideTooltip();
  }
  //Fish Glow Effect
    if (intersects.length > 0) {
    const fishMesh = intersects[0].object;

    showTooltip(fishMesh.userData.description, mouseX, mouseY);

    if (hoveredFish !== fishMesh) {
      if (hoveredFish) {
        hoveredFish.material.emissive.set(0x000000);
      }

      hoveredFish = fishMesh;
      hoveredFish.material.emissive.set(0x2266ff);
    }
  } else {
    hideTooltip();

    if (hoveredFish) {
      hoveredFish.material.emissive.set(0x000000);
      hoveredFish = null;
    }
  }

  renderer.render(scene, camera);
}

animate();
})

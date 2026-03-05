import * as THREE from "three";
import { createScene } from "./scene/setupScene.js";
import { createCamera } from "./scene/camera.js";
import { createRenderer } from "./scene/renderer.js";
import { addLights } from "./scene/lights.js";
import { createParticles } from "./environment/particles.js";
import { loadDiver } from "./models/diver.js";
import { loadFish } from "./models/fish.js";
import { setupMouse } from "./interaction/mouse.js";
import { createLightRays } from "./environment/lightRays.js";
import { createRaycaster } from "./interaction/raycaster.js";
import { showTooltip, hideTooltip, createTooltip } from "./ui/tooltip.js";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const particles = createParticles(scene);
const raysGroup = createLightRays(scene);

addLights(scene);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
createTooltip();


let mouseX = 0;
let mouseY = 0;
let checkIntersections = () => [];

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Load models
let diver;
let fishArray = [];
let mixers = [];
const clock = new THREE.Timer();
clock.connect(document);

loadDiver(scene).then((result) => {
  diver = result.diver;
  mixers.push(result.mixer);

  setupMouse(diver);
});


//WAIT for fish to load

loadFish(scene).then((result) => {

  const fish = result.fish;
  const animations = result.animations;

  // IMPORTANT: assign to outer array
  fishArray = result.fishArray;

  const mixer = new THREE.AnimationMixer(fish);
  mixer.clipAction(animations[0]).play();

  mixers.push(mixer);

  checkIntersections = createRaycaster(camera, fishArray);
});
  
  //Glow Effect Variables
  let hoveredFish = null;

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  clock.update();
  const delta = clock.getDelta();
  mixers.forEach(mixer => mixer.update(delta));
  
  const intersects = checkIntersections() ? checkIntersections() : [];
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
  particles.rotation.y += 0.0003;
  particles.rotation.x += 0.0001;

  raysGroup.children.forEach((ray, i) => {
  ray.position.x += Math.sin(Date.now() * 0.0002 + i) * 0.002;
  ray.rotation.z = Math.sin(Date.now() * 0.0001 + i) * 0.02;
});

  renderer.render(scene, camera);
}

animate();


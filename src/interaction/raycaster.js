import * as THREE from 'three';
import { showTooltip } from '../ui/tooltip.js';

export function setupRaycaster(camera, scene, fishArray) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  window.addEventListener('mousemove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function checkIntersections() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(fishArray, true);

    if (intersects.length > 0) {
      const fish = intersects[0].object.parent;
      showTooltip(fish.userData.description);
    }

    requestAnimationFrame(checkIntersections);
  }

  checkIntersections();
}

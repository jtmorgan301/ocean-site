import * as THREE from "three";

export function createRaycaster(camera, fishArray) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  window.addEventListener("mousemove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function checkIntersections() {
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(fishArray);
    }
    return checkIntersections; // Initial check
  }



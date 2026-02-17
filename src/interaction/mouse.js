let mouse = { x: 0, y: 0 };

export function setupMouse(diver) {
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function update() {
    if (!diver) return;

    // Target positions
    const targetX = mouse.x * 5;
    const targetY = mouse.y * 3 + 2;

    // Calculate movement difference
    const diffX = targetX - diver.position.x;
    const diffY = targetY - diver.position.y;

    // Smooth movement
    diver.position.x += diffX * 0.05;
    diver.position.y += diffY * 0.05;

    // 🔥 Rotate based on direction
    diver.rotation.z = -diffX * 0.1; // lean left/right
    diver.rotation.x = diffY * 0.05; // tilt up/down

    requestAnimationFrame(update);
  }

  update();
}

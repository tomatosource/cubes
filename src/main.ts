import { World } from "./world";

let then = 0;
function render(now: number) {
  const deltaTime = now - then;
  then = now;
  world.update(deltaTime);
  world.renderer.render(world.scene, world.camera);
  requestAnimationFrame(render);
}

const world = new World();
document.body.appendChild(world.renderer.domElement);
render(performance.now());

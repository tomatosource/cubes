import {
  Camera,
  BoxGeometry,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Renderer,
  Mesh,
  MeshNormalMaterial,
} from "three";

export class World {
  scene: Scene;
  camera: Camera;
  renderer: Renderer;
  cubes: Array<Mesh>;
  logger: HTMLElement;

  constructor() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      80, // fov
      windowWidth / windowHeight, // aspect
      1, // near fulcrum, i.e. min draw distance
      1000 // far fulcrum, i.e. max draw distance
    );
    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(this.scene.position);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(windowWidth, windowHeight);

    const cubeCount = 2;
    this.cubes = [];
    for (let i = 0; i < cubeCount; i++) {
      const cube = new Mesh(new BoxGeometry(2, 2, 2), new MeshNormalMaterial());
      this.scene.add(cube);
      this.cubes.push(cube);
    }

    this.logger = document.getElementById("log");
    this.log("hello world");
  }

  log(msg: unknown) {
    let content = this.logger.innerHTML;
    if (content.length > 5000) {
      content = content.slice(1000);
    }
    this.logger.innerHTML =
      `[${new Date().toLocaleTimeString()}] ${msg}<br/>` + content;
  }

  update(delta: number) {
    const speed = 0.0003 * delta;
    for (let i = 0; i < this.cubes.length; i++) {
      const mod = i + 1;
      this.cubes[i].rotation.x -= speed * mod;
      this.cubes[i].rotation.y -= speed * mod;
      this.cubes[i].rotation.z -= speed * mod;
    }
  }
}

import {
  Camera,
  BoxGeometry,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Renderer,
  Mesh,
  MeshNormalMaterial,
  Vector3,
} from "three";

const CAMERA_ROTATE_RADIUS = 30;

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
    this.camera.position.set(CAMERA_ROTATE_RADIUS, 0, 0);
    this.camera.lookAt(this.scene.position);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(windowWidth, windowHeight);

    this.cubes = this.initCubes();

    this.logger = document.getElementById("log");
    this.log("hello world");
  }

  log(msg: unknown) {
    let content = this.logger.innerHTML;
    if (content.length > 5000) {
      content = content.slice(1000);
    }
    this.logger.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}<br/>${content}`;
  }

  initCubes(): Array<Mesh> {
    const cubes = [];
    const tubeSteps = 50;
    const stepSize = 0.8;
    const ringCount = 20;
    const tubeRadius = 3;
    for (let i = 0; i < tubeSteps; i++) {
      for (let j = 0; j < ringCount; j++) {
        const cube = new Mesh(new BoxGeometry(), new MeshNormalMaterial());

        const y = Math.sin(Math.PI * 2 * (j / ringCount)) * tubeRadius;
        const z = Math.cos(Math.PI * 2 * (j / ringCount)) * tubeRadius;

        const offset = new Vector3(
          i * stepSize - (stepSize * tubeSteps) / 2,
          y,
          z
        );
        cube.position.add(offset);
        cube.rotation.x = (Math.PI / 2) * Math.random();
        cube.rotation.z = (Math.PI / 2) * Math.random();
        this.scene.add(cube);
        cubes.push(cube);
      }
    }
    return cubes;
  }

  update(delta: number) {
    const cubeSpinSpeed = 0.0001 * delta;
    const trackSpeed = 0.0015 * delta;
    const camRPM = 0.12;

    // for (let i = 0; i < this.cubes.length; i++) {
    // // if (i % 3 == 0) {
    // // continue;
    // // }
    // const mod = (Math.random() * i) / 5;
    // this.cubes[i].rotation.x -= cubeSpinSpeed * mod;
    // this.cubes[i].rotation.y -= cubeSpinSpeed * mod;
    // this.cubes[i].rotation.z -= cubeSpinSpeed * mod;
    // }
    const { x } = this.camera.position;
    // const theta = Math.atan2(x, z);
    // const newTheta = theta + (delta * Math.PI * camRPM) / 1000;
    // const newX = Math.sin(newTheta) * CAMERA_ROTATE_RADIUS;
    // const newZ = Math.cos(newTheta) * CAMERA_ROTATE_RADIUS;

    this.camera.position.set(x - trackSpeed, 0, 0);
    // this.camera.lookAt(this.scene.position);
    // this.camera.rotateZ(0.0001 * delta);
    this.log((1000 / delta).toFixed(2));
  }
}

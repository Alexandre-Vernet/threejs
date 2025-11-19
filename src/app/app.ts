import { Component, OnInit } from '@angular/core';
import * as T from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { ground } from './ground';
import { tree } from './tree';
import { house } from './house';
import { ambiant } from './ambiant';
import { road } from './road';
import { camera } from './camera';
import { keyboard } from './keyboard';
import { moulin } from './moulin';
import { picnicTable } from './picnicTable';
import { trackCar } from './track-car';
import { getRandomNumberInRange } from './getRandomNumberInRange';
import { playSound } from './playSound';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  ngOnInit() {
    const scene = new T.Scene();

    const renderer = new T.WebGLRenderer({ canvas: document.getElementById("app"), antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const houseGroup = house(renderer);
    const treeGroup = tree(renderer);
    const roadMesh = road(renderer);
    const moulinGroup = moulin();
    scene.add(roadMesh);
    ground(scene, renderer);
    ambiant(scene);
    const obstacles = new T.Group();


    const carList: T.Group<T.Object3DEventMap>[] = [];
    (async () => {
      const picnic = await picnicTable();
      obstacles.add(picnic);

      setInterval(async () => {
        const car = await trackCar();
        car.position.x = getRandomNumberInRange(-50, 50);
        const shortRandomNumber = Math.round(Math.random()) % 2;
        if (shortRandomNumber) {
          car.position.z = 4;
        } else {
          car.position.z = 6;
          car.rotation.y = -Math.PI / 2;
        }
        carList.push(car);
        obstacles.add(car);
      }, 1000)
    })();

    obstacles.add(houseGroup);
    obstacles.add(treeGroup);
    obstacles.add(moulinGroup);
    scene.add(obstacles);

    const perspectiveCamera = camera();

    const cameraBB = new T.Box3(
      new T.Vector3(),
      new T.Vector3()
    );


    const controls = new PointerLockControls(perspectiveCamera, document.body);

    document.addEventListener("click", () => {
      controls.lock();
    });


    const keys = keyboard();

    // Moulin animation
    const leftWing = moulinGroup.children.find(e => e.name === 'leftWing');
    const rightWing = moulinGroup.children.find(e => e.name === 'rightWing');

    const wings = [leftWing, rightWing];

    let speed = 0.1;

    let enableSound = false;

    document.addEventListener("keyup", (e) => {
      if (e.key === 'm') {
        enableSound = !enableSound;
      }
    });

    setInterval(() => {
      if (enableSound) {
        playSound();
      }
    }, 5000);


    function animate() {
      requestAnimationFrame(animate);
      const oldPosition = perspectiveCamera.position.clone();

      carList?.forEach(car => {
        if (car.position.z === 4) {
          car.position.x -= 0.05;
          if (car.position.x <= -75) {
            car.clear();
          }
        } else {
          car.position.x += 0.05;
          if (car.position.x >= 75) {
            car.clear();
          }
        }
      });

      if (keys.forward) controls.moveForward(speed);
      if (keys.backward) controls.moveForward(-speed);
      if (keys.left) controls.moveRight(-speed);
      if (keys.right) controls.moveRight(speed);
      if (keys.flyUp) perspectiveCamera.position.y += speed;
      if (keys.sprint) speed = 0.5;
      if (!keys.sprint) speed = 0.1;
      if (keys.flyDown && perspectiveCamera.position.y > 1) {
        perspectiveCamera.position.y -= speed;
      }

      cameraBB.setFromCenterAndSize(perspectiveCamera.position, new T.Vector3(0.1, 1.7, 0.1));

      obstacles.children.forEach(obj => {
        const bb = new T.Box3().setFromObject(obj);

        if (cameraBB.intersectsBox(bb)) {
          perspectiveCamera.position.copy(oldPosition)
        }
      });

      wings.forEach(w => w.rotation.z -= 0.01);

      renderer.render(scene, perspectiveCamera);
    }


    animate();
  }
}

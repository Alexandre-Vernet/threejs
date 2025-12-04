import { Component, OnInit } from '@angular/core';
import * as T from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { ground } from './ground';
import { House } from './house';
import { ambiant } from './ambiant';
import { road } from './road';
import { camera } from './camera';
import { keyboard } from './keyboard';
import { moulin } from './moulin';
import { spawnCar } from './track-car';
import { Characters } from './characters';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  ngOnInit() {
    const scene = new T.Scene();

    const renderer = new T.WebGLRenderer({ canvas: document.getElementById('app'), antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const roadMesh = road(renderer);
    const moulinGroup = moulin();
    scene.add(roadMesh);
    ground(scene, renderer);
    ambiant(scene);
    const obstacles = new T.Group();


    const carList: T.Group<T.Object3DEventMap>[] = [];
    setInterval(async () => {
      const c = await spawnCar();
      carList.push(c);
      obstacles.add(c);
    }, 1500);

    const c = new Characters();
    let char: T.Group<T.Object3DEventMap>;
    (async () => {
      char = await c.characters();
      const house = new House();
      const houseGroup = await house.generateHouses();
      obstacles.add(char);
      obstacles.add(houseGroup);
    })();

    obstacles.add(moulinGroup);
    scene.add(obstacles);

    const perspectiveCamera = camera();

    const cameraBB = new T.Box3(
      new T.Vector3(),
      new T.Vector3()
    );


    const controls = new PointerLockControls(perspectiveCamera, document.body);

    document.addEventListener('click', () => {
      controls.lock();
    });


    const keys = keyboard();

    // Moulin animation
    const leftWing = moulinGroup.children.find(e => e.name === 'leftWing');
    const rightWing = moulinGroup.children.find(e => e.name === 'rightWing');

    const wings = [leftWing, rightWing];

    let speed = 0.1;

    function animate() {
      requestAnimationFrame(animate);
      const oldPosition = perspectiveCamera.position.clone();
      if (char)
        c.animateCharacters(char);


      carList?.forEach(car => {
        if (car.position.z === 4) {
          car.position.x -= 0.05;
          if (car.position.x <= -99) {
            car.clear();
          }
        } else {
          car.position.x += 0.05;
          if (car.position.x >= 99) {
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

      // obstacles.children.forEach(obj => {
      //   const bb = new T.Box3().setFromObject(obj);
      //
      //   if (cameraBB.intersectsBox(bb)) {
      //     perspectiveCamera.position.copy(oldPosition)
      //   }
      // });

      wings.forEach(w => w.rotation.z -= 0.01);

      renderer.render(scene, perspectiveCamera);
    }


    animate();
  }
}

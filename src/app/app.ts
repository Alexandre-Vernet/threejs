import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { ground } from './ground';
import { tree } from './tree';
import { house } from './house';
import { ambiant } from './ambiant';
import { road } from './road';
import { car } from './car';
import { camera } from './camera';
import { keyboard } from './keyboard';
import { moulin } from './moulin';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  ngOnInit() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app"), antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const houseGroup = house();
    const treeGroup = tree();
    const carGroup = car();
    const roadMesh = road();
    const moulinGroup = moulin();
    scene.add(roadMesh);
    ground(scene);
    ambiant(scene);

    const obstacles = new THREE.Group();
    obstacles.add(houseGroup);
    obstacles.add(treeGroup);
    obstacles.add(carGroup);
    obstacles.add(moulinGroup);
    scene.add(obstacles);


    const perspectiveCamera = camera();

    const cameraBB = new THREE.Box3(
      new THREE.Vector3(),
      new THREE.Vector3()
    );


    const controls = new PointerLockControls(perspectiveCamera, document.body);

    document.addEventListener("click", () => {
      controls.lock();
    });

    let goBack = false;

    const keys = keyboard();

    // Moulin animation
    const leftWing = moulinGroup.children.find(e => e.name === 'leftWing');
    const rightWing = moulinGroup.children.find(e => e.name === 'rightWing');

    const wings = [leftWing, rightWing];

    function animate() {
      requestAnimationFrame(animate);
      const oldPosition = perspectiveCamera.position.clone();

      if (!goBack) {
        carGroup.position.x += 0.05;
        if (carGroup.position.x >= 30) goBack = true;
      } else {
        carGroup.position.x -= 0.05;
        if (carGroup.position.x <= -30) goBack = false;
      }

      const speed = 0.1;
      if (keys.forward) controls.moveForward(speed);
      if (keys.backward) controls.moveForward(-speed);
      if (keys.left) controls.moveRight(-speed);
      if (keys.right) controls.moveRight(speed);
      if (keys.flyUp) perspectiveCamera.position.y += speed;
      if (keys.flyDown && perspectiveCamera.position.y > 1) {
        perspectiveCamera.position.y -= speed;
      }

      cameraBB.setFromCenterAndSize(perspectiveCamera.position, new THREE.Vector3(0.1, 1.7, 0.1));

      obstacles.children.forEach(obj => {
        const bb = new THREE.Box3().setFromObject(obj);

        if (cameraBB.intersectsBox(bb)) {
          perspectiveCamera.position.copy(oldPosition)
        }
      });

      wings.forEach(w => w.rotation.z -= 0.01);

      renderer.render(scene, perspectiveCamera);
    }


    animate();
  }

  getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
}

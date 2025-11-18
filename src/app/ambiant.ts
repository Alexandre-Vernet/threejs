import * as THREE from 'three';

export const ambiant = (scene: THREE.Scene<THREE.Object3DEventMap>) => {
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);


  const sunGeometry = new THREE.SphereGeometry(5);
  const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xE8D623 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.rotation.x = -Math.PI / 2;
  sun.position.set(-3, 20, -0.5);
  scene.add(sun);

}

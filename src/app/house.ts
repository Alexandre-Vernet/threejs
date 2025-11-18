import * as THREE from 'three';

export const house = () => {
  const houseGroup = new THREE.Group();
  const houseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
  const houseMaterial = new THREE.MeshStandardMaterial({ color: 0xffddcc });
  const house = new THREE.Mesh(houseGeometry, houseMaterial);
  houseGroup.add(house);


  const roofGeometry = new THREE.ConeGeometry(1.6, 1, 4);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);

  roof.position.y = 1.25;
  roof.rotation.y = Math.PI / 4;
  houseGroup.add(roof);


  const doorGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x553311 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, -0.33, 1.01);
  houseGroup.add(door);

  const windowLeftGeometry = new THREE.PlaneGeometry(.3, .3);
  const windowLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const windowLeft = new THREE.Mesh(windowLeftGeometry, windowLeftMaterial);
  windowLeft.position.set(-.6, .4, 1.01);
  houseGroup.add(windowLeft);

  const windowRightGeometry = new THREE.PlaneGeometry(.3, .3);
  const windowRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const windowRight = new THREE.Mesh(windowRightGeometry, windowRightMaterial);
  windowRight.position.set(.6, .4, 1.01);
  houseGroup.add(windowRight);

  houseGroup.position.y = 1;

  return houseGroup;
}

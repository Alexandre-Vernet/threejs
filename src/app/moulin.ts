import * as THREE from 'three';


export const moulin = () => {
  const moulinGroup = new THREE.Group;

  const moulinGeometry = new THREE.CylinderGeometry(2, 3, 12);
  const moulinMaterial = new THREE.MeshStandardMaterial({ color: 0xe2d8b2 });
  const moulin = new THREE.Mesh(moulinGeometry, moulinMaterial);
  moulinGroup.add(moulin);

  const roofGeometry = new THREE.ConeGeometry(2.5, 3);
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xb9652c });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  moulinGroup.add(roof);
  roof.position.y = 7.5;

  const leftWingGeometry = new THREE.BoxGeometry(9, 2, 0.2);
  const leftWingMaterial = new THREE.MeshStandardMaterial({ color: 0xb9652c });
  const leftWing = new THREE.Mesh(leftWingGeometry, leftWingMaterial);
  leftWing.name = 'leftWing';
  moulinGroup.add(leftWing);
  leftWing.position.set(-0.5, 6.5, 2.3);
  leftWing.rotation.z = -Math.PI / 4;

  const rightWingGeometry = new THREE.BoxGeometry(9, 2, 0.2);
  const rightWingMaterial = new THREE.MeshStandardMaterial({ color: 0xb9652c });
  const rightWing = new THREE.Mesh(rightWingGeometry, rightWingMaterial);
  rightWing.name = 'rightWing';
  moulinGroup.add(rightWing);
  rightWing.position.set(-0.5, 6.5, 2.3);
  rightWing.rotation.z =  Math.PI / 4;


  moulinGroup.position.set(-5, 1, -10);

  return moulinGroup;
}

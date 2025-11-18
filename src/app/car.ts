import * as THREE from 'three';

export const car = () => {
// ===== VOITURE ====
  const carGroup = new THREE.Group();
  carGroup.position.set(-46, 0.5 , 4.2);

// Carrosserie
  const carGeometry = new THREE.BoxGeometry(1, .5, .8);
  const carMaterial = new THREE.MeshStandardMaterial({ color: 0xB00B0B });
  const car = new THREE.Mesh(carGeometry, carMaterial);
  car.position.set(0, 0, 0);
  carGroup.add(car);

// Roue arrière gauche
  const rearLeftWheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32);
  const rearLeftWheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const rearLeftWheel = new THREE.Mesh(rearLeftWheelGeometry, rearLeftWheelMaterial);
  rearLeftWheel.rotation.y = Math.PI / 2;
  rearLeftWheel.rotation.z = Math.PI / 2;
  rearLeftWheel.position.set(-0.3, -0.4, -0.3);
  carGroup.add(rearLeftWheel);

// Roue arrière droite
  const rearRightWheel = rearLeftWheel.clone();
  rearRightWheel.position.z = 0.3;
  carGroup.add(rearRightWheel);

// Roue avant gauche
  const frontLeftWheel = rearLeftWheel.clone();
  frontLeftWheel.position.set(0.3, -0.4, -0.3);
  carGroup.add(frontLeftWheel);

// Roue avant droite
  const frontRightWheel = frontLeftWheel.clone();
  frontRightWheel.position.z = 0.3;
  carGroup.add(frontRightWheel);

  return carGroup;
}

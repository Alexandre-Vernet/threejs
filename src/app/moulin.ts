import * as T from 'three';


export const moulin = () => {
  const moulinGroup = new T.Group;

  const moulinGeometry = new T.CylinderGeometry(2, 3, 12);
  const moulinMaterial = new T.MeshStandardMaterial({ color: 0xe2d8b2 });
  const moulin = new T.Mesh(moulinGeometry, moulinMaterial);
  moulinGroup.add(moulin);

  const roofGeometry = new T.ConeGeometry(2.5, 3);
  const roofMaterial = new T.MeshStandardMaterial({ color: 0xb9652c });
  const roof = new T.Mesh(roofGeometry, roofMaterial);
  moulinGroup.add(roof);
  roof.position.y = 7.5;

  const leftWingGeometry = new T.BoxGeometry(9, 2, 0.2);
  const leftWingMaterial = new T.MeshStandardMaterial({ color: 0xb9652c });
  const leftWing = new T.Mesh(leftWingGeometry, leftWingMaterial);
  leftWing.name = 'leftWing';
  moulinGroup.add(leftWing);
  leftWing.position.set(-0.5, 6.5, 2.3);
  leftWing.rotation.z = -Math.PI / 4;

  const rightWingGeometry = new T.BoxGeometry(9, 2, 0.2);
  const rightWingMaterial = new T.MeshStandardMaterial({ color: 0xb9652c });
  const rightWing = new T.Mesh(rightWingGeometry, rightWingMaterial);
  rightWing.name = 'rightWing';
  moulinGroup.add(rightWing);
  rightWing.position.set(-0.5, 6.5, 2.3);
  rightWing.rotation.z =  Math.PI / 4;


  moulinGroup.position.set(-5, 1, -10);

  return moulinGroup;
}

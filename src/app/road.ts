import * as THREE from 'three';

export const road = () => {
  const roadGroup = new THREE.Group;

  const roadGeometry = new THREE.PlaneGeometry(200, 3);
  const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x8F8D82 });
  const road = new THREE.Mesh(roadGeometry, roadMaterial);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 5);
  roadGroup.add(road);

  const whiteLineGeometry = new THREE.PlaneGeometry(200, 0.4);
  const whiteLineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const whiteLine = new THREE.Mesh(whiteLineGeometry, whiteLineMaterial);
  whiteLine.rotation.x = -Math.PI / 2;
  whiteLine.position.set(0, 0.02, 5);
  roadGroup.add(whiteLine);

  return roadGroup;
}

import * as THREE from 'three';

export const tree = () => {
  const treeGroup = new THREE.Group();

  const treeGeometry = new THREE.BoxGeometry(.5, 2, .5);
  const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x803524 });
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.set(3, 0, 0);
  treeGroup.add(tree);

  const leafGeometry = new THREE.ConeGeometry(1, 2, 8);
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x2C852C });
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.position.set(3, 1.8, 0);
  treeGroup.add(leaf);

  treeGroup.position.y = 1;

  return treeGroup;
}

import * as T from 'three';

export const tree = (renderer: T.WebGLRenderer) => {
  const treeGroup = new T.Group();

  const loader = new T.TextureLoader();
  const diff = loader.load('textures/tree/bark_willow_02_diff_4k.jpg');
  const arm = loader.load('textures/tree/bark_willow_02_arm_4k.jpg');
  const gl = loader.load('textures/tree/bark_willow_02_nor_gl_4k.jpg');

  diff.wrapS = diff.wrapT = T.RepeatWrapping;
  gl.wrapS = gl.wrapT = T.RepeatWrapping;
  arm.wrapS = arm.wrapT = T.RepeatWrapping;

  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  diff.anisotropy = maxAniso;
  gl.anisotropy = maxAniso;
  arm.anisotropy = maxAniso;

  const treeGeometry = new T.BoxGeometry(.5, 2, .5);
  const treeMaterial = new T.MeshStandardMaterial({
    map: diff,
    normalMap: gl,
    aoMap: arm,
  });
  const tree = new T.Mesh(treeGeometry, treeMaterial);
  tree.position.set(3, 0, 0);
  treeGroup.add(tree);

  const leafGeometry = new T.ConeGeometry(1, 2, 8);
  const leafMaterial = new T.MeshStandardMaterial({ color: 0x2C852C });
  const leaf = new T.Mesh(leafGeometry, leafMaterial);
  leaf.position.set(3, 1.8, 0);
  treeGroup.add(leaf);

  treeGroup.position.y = 1;

  return treeGroup;
}

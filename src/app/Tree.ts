import * as T from 'three';
import { getRandomNumberInRange } from './getRandomNumberInRange';

export class Tree {
  renderer: T.WebGLRenderer;

  constructor(renderer: T.WebGLRenderer) {
    this.renderer = renderer;
  }

  simpleTree() {
    const treeGroup = new T.Group();

    const loader = new T.TextureLoader();
    const diff = loader.load('textures/tree/bark_willow_02_diff_4k.jpg');
    const arm = loader.load('textures/tree/bark_willow_02_arm_4k.jpg');
    const gl = loader.load('textures/tree/bark_willow_02_nor_gl_4k.jpg');

    diff.wrapS = diff.wrapT = T.RepeatWrapping;
    gl.wrapS = gl.wrapT = T.RepeatWrapping;
    arm.wrapS = arm.wrapT = T.RepeatWrapping;

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

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

  forest() {
    const treeGroup = new T.Group();

    const loader = new T.TextureLoader();
    const diff = loader.load('textures/tree/bark_willow_02_diff_4k.jpg');
    const arm = loader.load('textures/tree/bark_willow_02_arm_4k.jpg');
    const gl = loader.load('textures/tree/bark_willow_02_nor_gl_4k.jpg');

    diff.wrapS = diff.wrapT = T.RepeatWrapping;
    gl.wrapS = gl.wrapT = T.RepeatWrapping;
    arm.wrapS = arm.wrapT = T.RepeatWrapping;

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    diff.anisotropy = maxAniso;
    gl.anisotropy = maxAniso;
    arm.anisotropy = maxAniso;

    for (let i = 0; i < 75; i++) {
      const size = getRandomNumberInRange(.1, 3);
      const treeHeight = getRandomNumberInRange(2, 15);
      const treeGeometry = new T.BoxGeometry(size, treeHeight, size);
      const treeMaterial = new T.MeshStandardMaterial({
        map: diff,
        normalMap: gl,
        aoMap: arm,
      });

      const treeLeaf = new T.Group();

      const tree = new T.Mesh(treeGeometry, treeMaterial);
      tree.position.y = treeHeight / 2;

      const leafGeometry = new T.ConeGeometry(size * 2, treeHeight, 8);
      const leafMaterial = new T.MeshStandardMaterial({ color: 0x2C852C });
      const leaf = new T.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(0, treeHeight + treeHeight / 2, 0);

      treeLeaf.add(tree);
      treeLeaf.add(leaf);
      treeLeaf.position.set(getRandomNumberInRange(25, 100), 0, getRandomNumberInRange(25, 100));

      treeGroup.add(treeLeaf);
    }

    return treeGroup;
  }
}

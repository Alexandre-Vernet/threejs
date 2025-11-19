import * as T from 'three';
import { getRandomNumberInRange } from './getRandomNumberInRange';

export class Tree {

  renderer: T.WebGLRenderer;
  texture = {
    diff: null,
    gl: null,
    arm: null
  }

  constructor(renderer: T.WebGLRenderer) {
    this.renderer = renderer;
  }

  private initTree() {
    const treeGroup = new T.Group();

    const loader = new T.TextureLoader();
    this.texture.diff = loader.load('textures/tree/bark_willow_02_diff_4k.jpg');
    this.texture.arm = loader.load('textures/tree/bark_willow_02_arm_4k.jpg');
    this.texture.gl = loader.load('textures/tree/bark_willow_02_nor_gl_4k.jpg');

    this.texture.diff.wrapS = this.texture.diff.wrapT = T.RepeatWrapping;
    this.texture.gl.wrapS = this.texture.gl.wrapT = T.RepeatWrapping;
    this.texture.arm.wrapS = this.texture.arm.wrapT = T.RepeatWrapping;

    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    this.texture.diff.anisotropy = maxAniso;
    this.texture.gl.anisotropy = maxAniso;
    this.texture.arm.anisotropy = maxAniso;

    return treeGroup;
  }

  simpleTree() {
    const treeGroup = this.initTree();

    const treeGeometry = new T.BoxGeometry(.5, 2, .5);
    const treeMaterial = new T.MeshStandardMaterial({
      map: this.texture.diff,
      normalMap: this.texture.gl,
      aoMap: this.texture.arm,
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
    const treeGroup = this.initTree();

    for (let i = 0; i < 75; i++) {
      const size = getRandomNumberInRange(.1, 3);
      const treeHeight = getRandomNumberInRange(2, 15);
      const treeGeometry = new T.BoxGeometry(size, treeHeight, size);
      const treeMaterial = new T.MeshStandardMaterial({
        map: this.texture.diff,
        normalMap: this.texture.gl,
        aoMap: this.texture.arm,
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

import * as T from 'three';

export const ground = (scene: T.Scene<T.Object3DEventMap>, renderer: T.WebGLRenderer) => {

  const loader = new T.TextureLoader();
  const diff = loader.load('textures/ground/sparse_grass_diff_4k.jpg');
  const arm = loader.load('textures/ground/sparse_grass_arm_4k.jpg');
  const gl = loader.load('textures/ground/sparse_grass_nor_gl_4k.jpg');

  diff.wrapS = diff.wrapT = T.RepeatWrapping;
  gl.wrapS = gl.wrapT = T.RepeatWrapping;
  arm.wrapS = arm.wrapT = T.RepeatWrapping;

  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  diff.anisotropy = maxAniso;
  gl.anisotropy = maxAniso;
  arm.anisotropy = maxAniso;


  diff.repeat.set(20, 20);
  gl.repeat.set(20, 20);
  arm.repeat.set(20, 20);


  const groundGeometry = new T.PlaneGeometry(200, 200);

  const groundMaterial = new T.MeshStandardMaterial({
    map: diff,
    normalMap: gl,
    aoMap: arm,
    // roughnessMap: arm,
    // metalnessMap: arm,
  });
  const ground = new T.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, 0);
  scene.add(ground);
}

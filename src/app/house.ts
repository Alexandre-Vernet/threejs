import * as T from 'three';

export const house = (renderer: T.WebGLRenderer) => {
  const houseGroup = new T.Group();
  const loader = new T.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  const wallDiff = loader.load('textures/house/wall/red_brick_diff_4k.jpg');
  const wallArm = loader.load('textures/house/wall/red_brick_arm_4k.jpg');
  const wallGl = loader.load('textures/house/wall/red_brick_nor_gl_4k.jpg');

  wallDiff.wrapS = wallDiff.wrapT = T.RepeatWrapping;
  wallGl.wrapS = wallGl.wrapT = T.RepeatWrapping;
  wallArm.wrapS = wallArm.wrapT = T.RepeatWrapping;


  wallDiff.anisotropy = maxAniso;
  wallGl.anisotropy = maxAniso;
  wallArm.anisotropy = maxAniso;

  const houseGeometry = new T.BoxGeometry(2, 1.5, 2);
  const houseMaterial = new T.MeshStandardMaterial({
    map: wallDiff,
    normalMap: wallGl,
    aoMap: wallArm
  });
  const house = new T.Mesh(houseGeometry, houseMaterial);
  houseGroup.add(house);


  const roofDiff = loader.load('textures/house/tiles/clay_roof_tiles_02_diff_4k.jpg');
  const roofArm = loader.load('textures/house/tiles/clay_roof_tiles_02_arm_4k.jpg');
  const roofGl = loader.load('textures/house/tiles/clay_roof_tiles_02_nor_gl_4k.jpg');

  roofDiff.wrapS = roofDiff.wrapT = T.RepeatWrapping;
  roofGl.wrapS = roofGl.wrapT = T.RepeatWrapping;
  roofArm.wrapS = roofArm.wrapT = T.RepeatWrapping;


  roofDiff.anisotropy = maxAniso;
  roofGl.anisotropy = maxAniso;
  roofArm.anisotropy = maxAniso;

  roofDiff.repeat.set(2, 2);
  roofGl.repeat.set(2, 2);
  roofArm.repeat.set(2, 2);

  const roofGeometry = new T.ConeGeometry(1.6, 1, 4);
  const roofMaterial = new T.MeshStandardMaterial({
    map: roofDiff,
    normalMap: roofGl,
    aoMap: roofArm
  });
  const roof = new T.Mesh(roofGeometry, roofMaterial);

  roof.position.y = 1.25;
  roof.rotation.y = Math.PI / 4;
  houseGroup.add(roof);


  const doorGeometry = new T.BoxGeometry(0.4, 0.8, 0.1);
  const doorMaterial = new T.MeshStandardMaterial({ color: 0x553311 });
  const door = new T.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, -0.33, 1.01);
  houseGroup.add(door);

  const windowLeftGeometry = new T.PlaneGeometry(.3, .3);
  const windowLeftMaterial = new T.MeshStandardMaterial({ color: 0xffffff });
  const windowLeft = new T.Mesh(windowLeftGeometry, windowLeftMaterial);
  windowLeft.position.set(-.6, .4, 1.01);
  houseGroup.add(windowLeft);

  const windowRightGeometry = new T.PlaneGeometry(.3, .3);
  const windowRightMaterial = new T.MeshStandardMaterial({ color: 0xffffff });
  const windowRight = new T.Mesh(windowRightGeometry, windowRightMaterial);
  windowRight.position.set(.6, .4, 1.01);
  houseGroup.add(windowRight);

  houseGroup.position.y = 1;

  return houseGroup;
}

import * as T from 'three';

export const road = (renderer: T.WebGLRenderer) => {
  const roadGroup = new T.Group;

  const loader = new T.TextureLoader();
  const diff = loader.load('textures/road/asphalt_pit_lane_diff_4k.jpg');
  const arm = loader.load('textures/road/asphalt_pit_lane_arm_4k.jpg');
  const gl = loader.load('textures/road/asphalt_pit_lane_nor_gl_4k.jpg');

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


  const roadGeometry = new T.PlaneGeometry(200, 3);
  const roadMaterial = new T.MeshStandardMaterial({
    map: diff,
    normalMap: gl,
    aoMap: arm,
  });
  const road = new T.Mesh(roadGeometry, roadMaterial);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 5);
  roadGroup.add(road);

  const whiteLineGeometry = new T.PlaneGeometry(200, 0.4);
  const whiteLineMaterial = new T.MeshStandardMaterial({ color: 0xffffff });
  const whiteLine = new T.Mesh(whiteLineGeometry, whiteLineMaterial);
  whiteLine.rotation.x = -Math.PI / 2;
  whiteLine.position.set(0, 0.02, 5);
  roadGroup.add(whiteLine);

  return roadGroup;
}

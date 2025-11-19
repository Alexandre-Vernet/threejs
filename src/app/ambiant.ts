import * as T from 'three';

export const ambiant = (scene: T.Scene<T.Object3DEventMap>) => {
  const ambient = new T.AmbientLight(0xffffff, 1);
  scene.add(ambient);


  const sunGeometry = new T.SphereGeometry(5);
  const sunMaterial = new T.MeshStandardMaterial({ color: 0xE8D623 });
  const sun = new T.Mesh(sunGeometry, sunMaterial);
  sun.rotation.x = -Math.PI / 2;
  sun.position.set(-3, 20, -0.5);
  scene.add(sun);

}

import * as T from 'three';

export const camera = () => {
  const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 5);

  return camera;
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getRandomNumberInRange } from './getRandomNumberInRange';

export const trackCar = () => {
  const random = getRandomNumberInRange(0, 5);

  const vehicleName = [
    'vehicle-racer.glb',
    'vehicle-speedster.glb',
    'vehicle-suv.glb',
    'vehicle-truck.glb',
    'vehicle-vintage-racer.glb',
    'vehicle-speedster.glb'
  ];

  switch (random) {
    case 0:
      return applyTexture(vehicleName[0]);
    case 1:
      return applyTexture(vehicleName[1]);
    case 2:
      return applyTexture(vehicleName[2]);
    case 3:
      return applyTexture(vehicleName[3]);
    case 4:
      return applyTexture(vehicleName[4]);
    default:
      return applyTexture(vehicleName[5]);
  }
}

const applyTexture = async (carName: string) => {
  const texturePath = 'models/car/';
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(texturePath + carName);
  const car = gltf.scene;
  if (carName === 'vehicle-truck.glb') {
    car.scale.set(3.5, 3.5, 3.5);
  } else {
    car.scale.set(2, 2, 2);
  }
  car.position.set(3, 0, 4);
  car.rotation.y = Math.PI / 2;

  return car;
}

export const spawnCar = async () => {
  const car = await trackCar();
  car.position.x = getRandomNumberInRange(-50, 50);
  const shortRandomNumber = Math.round(Math.random()) % 2;
  if (shortRandomNumber) {
    car.position.z = 4;
  } else {
    car.position.z = 6;
    car.rotation.y = -Math.PI / 2;
  }

  return car;
}

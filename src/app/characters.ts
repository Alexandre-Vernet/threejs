import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getRandomNumberInRange } from './getRandomNumberInRange';

export const characters = () => {
  const character = 'abcdef'
  const random = getRandomNumberInRange(0, 5);

  const characterName = [
    'character-male-',
    'character-female-',
  ];

  switch (random) {
    case 0:
      return applyTexture(characterName[0]);
    case 1:
      return applyTexture(characterName[1]);
    case 2:
      return applyTexture(characterName[2]);
    case 3:
      return applyTexture(characterName[3]);
    case 4:
      return applyTexture(characterName[4]);
    default:
      return applyTexture(characterName[5]);
  }
}

const applyTexture = async (carName: string) => {
  const texturePath = 'textures/characters/';
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(texturePath + carName);
  const car = gltf.scene;
  car.scale.set(2, 2, 2);
  car.position.set(3, 0, 4);
  car.rotation.y = Math.PI / 2;

  return car;
}

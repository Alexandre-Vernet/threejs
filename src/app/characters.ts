import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getRandomNumberInRange } from './getRandomNumberInRange';
import * as T from 'three';

export class Characters {

  characters() {
    const random = getRandomNumberInRange(0, 2);

    const characterType = [
      'character-male-',
      'character-female-',
    ];

    switch (random) {
      case 0:
        return this.applyTexture(characterType[0]);
      default:
        return this.applyTexture(characterType[1]);
    }
  }

  animateCharacters(char: T.Group<T.Object3DEventMap>) {
    if (char.position.x <= -60) {
      char.position.x += 0.05;
    } else {
      char.position.x -= 0.05;
    }
  }


  private async applyTexture(characterType: string) {
    const texturePath = 'models/characters/';
    const allowedRandomCharacter = 'abcdef';
    const random = getRandomNumberInRange(0, 5);
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(texturePath + characterType + allowedRandomCharacter[random] + '.glb');
    const character = gltf.scene;
    character.scale.set(1.5, 1.5, 1.5);
    character.position.set(-80, 0, 1);
    character.rotation.y = Math.PI / 2;

    return character;
  }
}

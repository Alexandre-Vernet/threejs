import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getRandomNumberInRange } from './getRandomNumberInRange';

export const characters = () => {
    const random = getRandomNumberInRange(0, 2);

    const characterType = [
        'character-male-',
        'character-female-',
    ];

    switch (random) {
        case 0:
            return applyTexture(characterType[0]);
        default:
            return applyTexture(characterType[1]);
    }
}

const applyTexture = async (characterType: string) => {
    const texturePath = 'models/characters/';
    const allowedRandomCharacter = 'abcdef';
    const random = getRandomNumberInRange(0, 5);
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(texturePath + characterType + allowedRandomCharacter[random] + '.glb');
    const character = gltf.scene;
    character.scale.set(1.5, 1.5, 1.5);
    character.position.set(3, 0, 4);
    character.rotation.y = Math.PI / 2;

    return character;
}

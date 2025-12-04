import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as T from 'three';
import { getRandomNumberInRange } from './getRandomNumberInRange';

export class House {
  houseGroup = new T.Group();

  async generateHouses() {

    for (let i = -4; i < 5; i++) {
      const h = await this.loadModelHouse();

      // House
      h.scale.set(10, 10, 10);
      h.rotation.y = -Math.PI;
      h.position.set(i * 20, 0, -10);

      // Fence
      const f = await this.loadModelFence(i, -10);

      this.houseGroup.add(h);
      this.houseGroup.add(f);
    }

    for (let i = -4; i < 5; i++) {
      const texturePath = 'models/city-kit/glb/';
      const loader = new GLTFLoader();
      const houseNameSuffix = 'building-type-';
      const allowedRandomCharacter = 'abcdefghijklmno';
      const random = getRandomNumberInRange(0, 15);
      const houseGltf = await loader.loadAsync(texturePath + houseNameSuffix + allowedRandomCharacter[random] + '.glb');

      const h = houseGltf.scene;
      h.scale.set(10, 10, 10);
      h.position.set(i * 20, 0, 20);


      const f = await this.loadModelFence(i, 20);


      this.houseGroup.add(h);
      this.houseGroup.add(f);
    }

    return this.houseGroup;
  }


  private async loadModelHouse() {
    const texturePath = 'models/city-kit/glb/';
    const loader = new GLTFLoader();
    const houseNameSuffix = 'building-type-';
    const allowedRandomCharacter = 'abcdefghijklmno';
    const random = getRandomNumberInRange(0, 15);
    const houseGltf = await loader.loadAsync(texturePath + houseNameSuffix + allowedRandomCharacter[random] + '.glb');

    return houseGltf.scene;
  }

  private async loadModelFence(index: number, z: number) {
    const loader = new GLTFLoader();
    const fenceGltf = await loader.loadAsync('models/city-kit/glb/fence.glb');
    const f = fenceGltf.scene;
    f.scale.set(25, 10, 10);
    f.rotation.y = Math.PI / 2;
    f.position.set(index * 20 + 10, 0, z);

    return f;
  }
}

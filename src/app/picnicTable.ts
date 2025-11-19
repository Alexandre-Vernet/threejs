import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const picnicTable = async () => {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync("textures/picnic_table/wooden_picnic_table_4k.gltf");
  const table = gltf.scene;
  table.scale.set(1, 1, 1);
  table.position.set(3, 0, -3);
  table.position.x = 3;
  table.position.y = 0;
  table.rotation.y = Math.PI / 2;

  return table;
};

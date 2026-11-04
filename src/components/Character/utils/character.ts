import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onProgress?: (percent: number) => void
) => {
  const loadingManager = new THREE.LoadingManager();
  const loader = new GLTFLoader(loadingManager);
  const dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath("/draco/");
  dracoLoader.setWorkerLimit(2);
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (signal: AbortSignal) => {
    onProgress?.(2);
    const encryptedBlob = await decryptFile(
      "/models/character.enc",
      "Character3D#@",
      (progress) => onProgress?.(5 + progress * 50),
      signal
    );
    if (signal.aborted) throw signal.reason;
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    try {
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        const handleAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", handleAbort, { once: true });

        loader.load(
          blobUrl,
          (loadedGltf) => {
            signal.removeEventListener("abort", handleAbort);
            resolve(loadedGltf);
          },
          (event) => {
            if (event.total > 0) {
              onProgress?.(55 + (event.loaded / event.total) * 35);
            }
          },
          (error) => {
            signal.removeEventListener("abort", handleAbort);
            reject(error);
          }
        );

        if (signal.aborted) handleAbort();
      });

      const rightFoot = gltf.scene.getObjectByName("footR");
      const leftFoot = gltf.scene.getObjectByName("footL");
      if (rightFoot) rightFoot.position.y = 3.36;
      if (leftFoot) leftFoot.position.y = 3.36;

      onProgress?.(95);
      void renderer.compileAsync(gltf.scene, camera, scene).catch((error: unknown) => {
        console.error("Unable to precompile the 3D character:", error);
      });
      return gltf;
    } finally {
      URL.revokeObjectURL(blobUrl);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;

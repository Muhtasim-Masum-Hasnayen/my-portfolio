import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { setAllTimeline, setCharTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const canvas = canvasDiv.current;
    const rect = canvas.getBoundingClientRect();
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const setRendererSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.5)
      );
      renderer.setSize(width, height);
    };
    setRendererSize();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvas.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      14.5,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let character: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let frameId = 0;
    let introTimeout: number | undefined;
    let touchTimeout: number | undefined;
    let disposed = false;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    let cleanupHover: (() => void) | undefined;
    let cleanupCharacterTimeline: (() => void) | undefined;
    let cleanupAllTimeline: (() => void) | undefined;

    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);
    const landingDiv = document.getElementById("landingDiv");

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => (mouse = { x, y }));
    };
    const onTouchStart = () => {
      touchTimeout = window.setTimeout(() => {
        landingDiv?.addEventListener("touchmove", onTouchMove);
      }, 200);
    };
    const onTouchEnd = () => {
      window.clearTimeout(touchTimeout);
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };
    const onResize = () => {
      handleResize(renderer, camera, canvasDiv);
      setRendererSize();
      if (!character) return;
      cleanupCharacterTimeline?.();
      cleanupAllTimeline?.();
      cleanupCharacterTimeline = setCharTimeline(character, camera);
      cleanupAllTimeline = setAllTimeline();
    };

    const animate = () => {
      if (disposed || document.hidden) return;
      frameId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        if (screenLight) light.setPointLight(screenLight);
      }
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    const clock = new THREE.Clock();
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        clock.getDelta();
        animate();
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize);
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }
    animate();

    loadCharacter()
      .then((gltf) => {
        if (!gltf || disposed) return;
        const animations = setAnimations(gltf);
        cleanupHover = hoverDivRef.current
          ? animations.hover(gltf, hoverDivRef.current)
          : undefined;
        mixer = animations.mixer;
        character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        screenLight = character.getObjectByName("screenlight") || null;
        cleanupCharacterTimeline = setCharTimeline(character, camera);
        cleanupAllTimeline = setAllTimeline();
        progress.loaded().then(() => {
          if (disposed) return;
          introTimeout = window.setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
      })
      .catch((error: unknown) => {
        if (!disposed) console.error("Unable to load the 3D character:", error);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(touchTimeout);
      window.clearTimeout(introTimeout);
      cleanupHover?.();
      cleanupCharacterTimeline?.();
      cleanupAllTimeline?.();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
        landingDiv.removeEventListener("touchmove", onTouchMove);
      }
      scene.clear();
      renderer.dispose();
      if (canvas.contains(renderer.domElement)) {
        canvas.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;

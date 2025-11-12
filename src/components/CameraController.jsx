import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';

export default function CameraController({ focusPosition }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!focusPosition) return;

    const target = new Vector3(...focusPosition);
    const start = camera.position.clone();

    let progress = 0;
    const duration = 60; // frames para suavizar o movimento

    function animate() {
      if (progress < 1) {
        progress += 1 / duration;
        camera.position.lerpVectors(start, target.clone().add(new Vector3(0, 5, 15)), progress);
        camera.lookAt(target);
        requestAnimationFrame(animate);
      }
    }

    animate();
  }, [focusPosition, camera]);

  return null;
}

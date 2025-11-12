import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

function CreatePlanet({
  name,
  position,
  diameter,
  mat,
  rotationSpeed,
  orbitRadius,
  orbitSpeed,
  onClick,
}) {
  const planetRef = useRef();
  const material = useLoader(TextureLoader, mat);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotação do planeta
    planetRef.current.rotation.y += rotationSpeed;

    // Translação (órbita) do planeta
    planetRef.current.position.x = orbitRadius * Math.cos(elapsedTime * orbitSpeed);
    planetRef.current.position.z = orbitRadius * Math.sin(elapsedTime * orbitSpeed);
  });
  return (
    <mesh ref={planetRef} onClick={onClick} position={position}>
      <sphereGeometry args={diameter} />
      <meshStandardMaterial
        map={material}
        emissiveMap={material}
        transparent
        emissive={'#FFFFFF'}
        emissiveIntensity={name === 'sun' ? 0.9 : 0.12}
      />
    </mesh>
  );
}

function CreateSaturnWithRings({
  position,
  diameter,
  ringMat,
  innerRadius,
  outerRadius,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  onClick,
}) {
  const saturnRef = useRef();
  const ringRef = useRef();

  // carrega texturas
  const saturnTexture = useLoader(THREE.TextureLoader, 'saturn.jpg'); // 🔥 garanta que o caminho está certo
  const ringTexture = useLoader(THREE.TextureLoader, `/${ringMat}`); // idem

  const ringGeometry = useMemo(
    () => new THREE.RingGeometry(innerRadius, outerRadius, 128),
    [innerRadius, outerRadius]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (saturnRef.current) {
      saturnRef.current.rotation.y += rotationSpeed;
      saturnRef.current.position.x = orbitRadius * Math.cos(t * orbitSpeed);
      saturnRef.current.position.z = orbitRadius * Math.sin(t * orbitSpeed);
    }
    if (ringRef.current) ringRef.current.rotation.z += 0.0005;
  });

  return (
    <group ref={saturnRef} position={position}>
      {/* Corpo do planeta */}
      <mesh onClick={onClick}>
        <sphereGeometry args={diameter} />
        <meshStandardMaterial
          map={saturnTexture}
          metalness={0.2}
          roughness={1}
          emissiveMap={saturnTexture}
          emissive={'#ffffff'}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Anéis */}
      <group ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={ringGeometry}>
          <meshStandardMaterial
            map={ringTexture}
            opacity={0.8}
            side={THREE.DoubleSide}
            emissiveMap={ringTexture}
            emissive={'#ffffff'}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

function CreateEarthAndMoon({
  earthPosition,
  earthDiameter,
  moonDiameter,
  moonMat,
  earthRotationSpeed,
  moonOrbitRadius,
  moonOrbitSpeed,
  earthOrbitRadius,
  earthOrbitSpeed,
  onClickEarth,
}) {
  const earthRef = useRef();
  const moonRef = useRef();
  const earthDayTexture = useLoader(TextureLoader, 'Earth_day.jpg');
  const earthNightTexture = useLoader(TextureLoader, 'Earth_night.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y += earthRotationSpeed;

    earthRef.current.position.x = earthOrbitRadius * Math.cos(elapsedTime * earthOrbitSpeed);
    earthRef.current.position.z = earthOrbitRadius * Math.sin(elapsedTime * earthOrbitSpeed);

    moonRef.current.position.x = moonOrbitRadius * Math.cos(elapsedTime * moonOrbitSpeed);
    moonRef.current.position.z = moonOrbitRadius * Math.sin(elapsedTime * moonOrbitSpeed);
  });

  return (
    <group ref={earthRef} position={earthPosition}>
      <mesh onClick={onClickEarth}>
        <sphereGeometry args={earthDiameter} />
        <meshStandardMaterial
          map={earthDayTexture}
          emissiveMap={earthNightTexture}
          emissive={'#ffffff'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={moonRef} position={[moonOrbitRadius, 0, moonOrbitRadius]}>
        <sphereGeometry args={moonDiameter} />
        <meshStandardMaterial map={useLoader(TextureLoader, moonMat)} />
      </mesh>
    </group>
  );
}

export { CreatePlanet, CreateEarthAndMoon, CreateSaturnWithRings };

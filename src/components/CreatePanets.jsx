import { useRef } from "react";
import {useFrame, useLoader} from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

function CreatePlanet({
    name,
    position,
    diameter,
    mat,
    rotationSpeed,
    orbitRadius,
    orbitSpeed,
  }) {
    const planetRef = useRef();
    const material = useLoader(TextureLoader, mat);
  
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
  
      // Rotação do planeta
      planetRef.current.rotation.y += rotationSpeed;
  
      // Translação (órbita) do planeta
      planetRef.current.position.x =
        orbitRadius * Math.cos(elapsedTime * orbitSpeed);
      planetRef.current.position.z =
        orbitRadius * Math.sin(elapsedTime * orbitSpeed);
    });
    return (
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={diameter} />
        <meshStandardMaterial
          map={material}
          emissiveMap={material}
          transparent
          emissive={"#ffffff"}
          emissiveIntensity={name === "sun" ? 0.9 : 0.3}
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
    thickness,
    orbitRadius,
    orbitSpeed,
    rotationSpeed,
  }) {
    const saturnRef = useRef();
    const ringRef = useRef();
  
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
  
      saturnRef.current.rotation.y += rotationSpeed;
  
      saturnRef.current.position.x =
        orbitRadius * Math.cos(elapsedTime * orbitSpeed);
      saturnRef.current.position.z =
        orbitRadius * Math.sin(elapsedTime * orbitSpeed);
    });
  
    const ringTexture = useLoader(TextureLoader, ringMat);
  
    return (
      <group ref={saturnRef} position={position}>
        <mesh>
          <sphereGeometry args={diameter} />
          <meshStandardMaterial
            map={useLoader(TextureLoader, "saturn.jpg")}
            emissiveMap={useLoader(TextureLoader, "saturn.jpg")}
            transparent
            emissive={"#ffffff"}
            emissiveIntensity={0.1}
          />
        </mesh>
        <group ref={ringRef} rotation={[2,0.3, 2]}>
          {Array.from({ length: thickness }, (_, i) => (
            <mesh key={i}>
              <ringGeometry
                args={[innerRadius + i * 0.01, outerRadius + i * 0.01, 64]}
              />
              <meshStandardMaterial
                map={ringTexture}
                side={THREE.DoubleSide}
                emissiveMap={ringTexture}
                emissive={"#ffffff"}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
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
    
  }) {
    const earthRef = useRef();
    const moonRef = useRef();
    const earthDayTexture = useLoader(TextureLoader, "Earth_day.jpg");
    const earthNightTexture = useLoader(TextureLoader, "Earth_night.jpg");
  
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime() ;
  
      earthRef.current.rotation.y += earthRotationSpeed;
  
      earthRef.current.position.x =
        earthOrbitRadius * Math.cos(elapsedTime * earthOrbitSpeed);
      earthRef.current.position.z =
        earthOrbitRadius * Math.sin(elapsedTime * earthOrbitSpeed);

      moonRef.current.position.x =
        moonOrbitRadius * Math.cos(elapsedTime * moonOrbitSpeed);
      moonRef.current.position.z =
        moonOrbitRadius * Math.sin(elapsedTime * moonOrbitSpeed);
    });
  
    return (
      <group ref={earthRef} position={earthPosition}>
        <mesh>
          <sphereGeometry args={earthDiameter} />
          <meshStandardMaterial
            map={earthDayTexture}
            emissiveMap={earthNightTexture}
            emissive={"#ffffff"}
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh ref={moonRef} position={[moonOrbitRadius, 0 , moonOrbitRadius]}>
          <sphereGeometry args={moonDiameter} />
          <meshStandardMaterial map={useLoader(TextureLoader, moonMat)} />
        </mesh>
      </group>
    );
  }

  export { CreatePlanet, CreateEarthAndMoon, CreateSaturnWithRings}
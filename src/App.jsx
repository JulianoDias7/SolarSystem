import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Nebula, Starfield } from './components/Universe';
import { CreatePlanet, CreateEarthAndMoon, CreateSaturnWithRings } from './components/CreatePanets';
import * as THREE from 'three';
import LoadingScreen from './components/LoadingScreen';
import PlanetOverlay from './components/PlanetOverlay'; // 🔥 novo import
import CameraController from './components/CameraController';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // 🔥 novo

  const controlsRef = useRef();

  const handleLoaded = () => setLoading(false);

  const handlePlanetClick = (name, pos) => {
    setFocus(pos);
    setSelectedPlanet({ name, pos });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 segundos de loading
    return () => clearTimeout(timer);
  }, []);

  const handleCloseOverlay = () => setSelectedPlanet(null);

  return (
    <div className="w-full h-full absolute">
      {loading && <LoadingScreen />}

      <Canvas camera={{ position: [0, 20, 140], fov: 60 }} className="w-full h-full bg-black">
        <Suspense fallback={null}>
          <group>
            <CreatePlanet
              name="sun"
              position={[0, 0, 0]}
              diameter={[10, 120, 120]}
              mat="Sun.jpg"
              rotationSpeed={0.0001}
              orbitRadius={0}
              orbitSpeed={0}
              onClick={() => handlePlanetClick('sun', [0, 0, 0])}
            />
            <pointLight position={[0, 0, 0]} intensity={2000} distance={150} decay={1.8} />
            <CreatePlanet
              name="mercury"
              position={[24, 0, 0]}
              diameter={[2, 32, 32]}
              mat="mercury.jpg"
              rotationSpeed={0.01}
              orbitRadius={24}
              orbitSpeed={(1 / 20) * 2}
              onClick={() => handlePlanetClick('mercury', [24, 0, 0])}
            />
            <CreatePlanet
              name="venus"
              position={[36, 0, 0]}
              diameter={[2, 32, 32]}
              mat="venus_surface.jpg"
              rotationSpeed={0.007}
              orbitRadius={36}
              orbitSpeed={(1 / 100) * 2}
              onClick={() => handlePlanetClick('venus', [36, 0, 0])}
            />
            <CreateEarthAndMoon
              earthPosition={[48, 0, 0]}
              earthDiameter={[2, 32, 32]}
              moonDiameter={[0.4, 32, 32]}
              moonMat="Moon.jpg"
              earthRotationSpeed={0.005}
              moonOrbitRadius={4}
              moonOrbitSpeed={1 / 10}
              earthOrbitRadius={48}
              earthOrbitSpeed={(1 / 60) * 2}
              onClickEarth={() => handlePlanetClick('earth', [48, 0, 0])}
            />
            <CreatePlanet
              name="mars"
              position={[60, 0, 0]}
              diameter={[2, 32, 32]}
              mat="mars.jpg"
              rotationSpeed={0.008}
              orbitRadius={60}
              orbitSpeed={(1 / 150) * 2}
              onClick={() => handlePlanetClick('mars', [60, 0, 0])}
            />
            <CreatePlanet
              name="jupiter"
              position={[80, 0, 0]}
              diameter={[4, 32, 32]}
              mat="jupiter.jpg"
              rotationSpeed={0.01}
              orbitRadius={80}
              orbitSpeed={(1 / 50) * 2}
              onClick={() => handlePlanetClick('jupiter', [80, 0, 0])}
            />
            <CreateSaturnWithRings
              position={[100, 0, 0]}
              diameter={[2.6, 32, 32]}
              ringMat="saturn_ring_alpha.png"
              innerRadius={5}
              outerRadius={6}
              thickness={10}
              rotationSpeed={0.02}
              orbitRadius={100}
              orbitSpeed={(1 / 100) * 2}
              onClick={() => handlePlanetClick('saturn', [100, 0, 0])}
            />
            <CreatePlanet
              name="uranus"
              position={[120, 0, 0]}
              diameter={[2.6, 32, 32]}
              mat="uranus.jpg"
              rotationSpeed={0.005}
              orbitRadius={120}
              orbitSpeed={(1 / 80) * 2}
              onClick={() => handlePlanetClick('uranus', [120, 0, 0])}
            />
            <CreatePlanet
              name="neptune"
              position={[140, 0, 0]}
              diameter={[2.6, 32, 32]}
              mat="neptune.jpg"
              rotationSpeed={0.006}
              orbitRadius={140}
              orbitSpeed={(1 / 70) * 2}
              onClick={() => handlePlanetClick('neptune', [140, 0, 0])}
            />
            <Starfield numStars={10000} starMat="stars.png" />
            <Nebula starTxt="Universe.jpg" />
          </group>
          <CameraController focus={focus} controlsRef={controlsRef} />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.25}
          enableZoom
          zoomSpeed={3}
          enableRotate
          rotateSpeed={1}
          enablePan
          panSpeed={1}
          minDistance={30}
          maxDistance={150}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0.6}
        />
      </Canvas>

      {/* 🔥 overlay */}
      <PlanetOverlay planet={selectedPlanet} onClose={handleCloseOverlay} />
    </div>
  );
}

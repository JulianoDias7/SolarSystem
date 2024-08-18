import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Nebula, Starfield } from "./components/Universe";
import { CreatePlanet, CreateEarthAndMoon, CreateSaturnWithRings } from "./components/CreatePanets";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "./components/LoadingScreen";
import Modal from "./components/Modal";


function Animate({ onLoaded }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded(); // Notifica que o carregamento está completo
    }, 1000); // Simulação de carregamento, substitua com sua lógica real
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <group>
      <CreatePlanet
        name="sun"
        position={[0, 0, 0]}
        diameter={[10, 120, 120]}
        mat="Sun.jpg"
        rotationSpeed={0.0001}
        orbitRadius={0}
        orbitSpeed={0}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={2000}
        distance={150}
        decay={1.8}
      />
      <CreatePlanet
        name="mercury"
        position={[24, 0, 0]}
        diameter={[2, 32, 32]}
        mat="mercury.jpg"
        rotationSpeed={0.01}
        orbitRadius={24}
        orbitSpeed={1 / 20*2}
      />
      <CreatePlanet
        name="venus"
        position={[36, 0, 0]}
        diameter={[2, 32, 32]}
        mat="venus_surface.jpg"
        rotationSpeed={0.007}
        orbitRadius={36}
        orbitSpeed={1 / 100*2}
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
        earthOrbitSpeed={1 / 60*2}
      />
      <CreatePlanet
        name="mars"
        position={[60, 0, 0]}
        diameter={[2, 32, 32]}
        mat="mars.jpg"
        rotationSpeed={0.008}
        orbitRadius={60}
        orbitSpeed={1 / 150*2}
      />
      <CreatePlanet
        name="jupiter"
        position={[80, 0, 0]}
        diameter={[4, 32, 32]}
        mat="jupiter.jpg"
        rotationSpeed={0.01}
        orbitRadius={80}
        orbitSpeed={1 / 50*2}
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
        orbitSpeed={1 / 100*2}
      />
      <CreatePlanet
        name="uranus"
        position={[120, 0, 0]}
        diameter={[2.6, 32, 32]}
        mat="uranus.jpg"
        rotationSpeed={0.005}
        orbitRadius={120}
        orbitSpeed={1 / 80*2}
      />
      <CreatePlanet
        name="neptune"
        position={[140, 0, 0]}
        diameter={[2.6, 32, 32]}
        mat="neptune.jpg"
        rotationSpeed={0.006}
        orbitRadius={140}
        orbitSpeed={1 / 70*2}
      />
      <Starfield numStars={10000} starMat="stars.png" />
      <Nebula starTxt="Universe.jpg" />
    </group>
  );
}

function Scene({ onLoaded }) {
  return (
    <>
      <Animate onLoaded={onLoaded} />
    </>
  );
}

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true)

  const handleLoaded = () => {
    setLoading(false); // Torna o menu visível após o carregamento
    setTimeout(() => {
      setMenuVisible(true); // Oculta a tela de carregamento após o delay
    }, 100);
  };

  return (
    <div className="w-full h-full absolute">
      {loading && <LoadingScreen />}
      <Canvas className="w-full h-full bg-black">
        <Suspense fallback={null}>
          <Scene onLoaded={handleLoaded} />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.25}
          enableZoom
          zoomSpeed={3}
          enableRotate
          rotateSpeed={1}
          enablePan
          panSpeed={1}
          minDistance={90}
          maxDistance={150}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0.8}
        />
      </Canvas>
      {menuVisible && <Sidebar />}
      
    </div>
  );
}

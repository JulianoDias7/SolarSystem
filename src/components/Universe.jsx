import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';


function Starfield({ numStars = 1000 }) {
  const ref = useRef();

  const starfield = useMemo(() => {
    const verts = [];
    const colors = [];

  
    for (let i = 0; i < numStars; i++) {
      const radius = Math.random() * 200 + 150; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const color = new THREE.Color().setHSL(0.6, 0.2, Math.random());
      verts.push(x, y, z);
      colors.push(color.r, color.g, color.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 3, 
      transparent: true,
      opacity: 1.0,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: new THREE.TextureLoader().load('/stars.png'), 
    });

    return new THREE.Points(geo, mat);
  }, [numStars]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0002;
    }
  });

  return <primitive ref={ref} object={starfield} />;
}


function Nebula({ radius = 1500, opacity = 1, starTxt }) {
  const starTexture = useLoader(TextureLoader, `/${starTxt}`);
  const { camera } = useThree();
  const groupRef = useRef();

  const numStars = 50;
  const spiralArms = 10;

  function getSpiralPosition(index, spiralArms) {
    const armIndex = index % spiralArms;
    const armAngle = (armIndex / spiralArms) * 2 * Math.PI;
    const radius = 100 + index * 10;
    const angle = armAngle + index * 1;
    return [radius * Math.cos(angle), radius * Math.sin(angle), 0];
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh) => {
        mesh.lookAt(camera.position);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: numStars }).map((_, i) => {
        const position = getSpiralPosition(i, spiralArms);
        return (
          <mesh key={i} position={position} scale={[0.4, 0.6, 0.2]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              map={starTexture}
              transparent
              opacity={opacity}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export { Nebula, Starfield };

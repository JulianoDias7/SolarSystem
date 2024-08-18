import React, { useRef, useMemo } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

function Starfield({ numStars, starMat }) {


  const starfield = useMemo(() => {
    function randomSpherePoint() {
      const radius = Math.random() * 1000 + 100;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);

      return {
        pos: new THREE.Vector3(x, y, z),
        hue: 0.6,
        minDist: radius,
      };
    }

    const verts = [];
    const colors = [];
    let col;

    for (let i = 0; i < numStars; i += 1) {
      let p = randomSpherePoint();
      const { pos, hue } = p;
      col = new THREE.Color().setHSL(hue, 0.2, Math.random());
      verts.push(pos.x, pos.y, pos.z);
      colors.push(col.r, col.g, col.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 1.0,
      vertexColors: true,
      map: new THREE.TextureLoader().load(
        starMat
      ),
    });
    return new THREE.Points(geo, mat);
  }, [numStars]);

  return <primitive object={starfield} />;
}

function Nebula({ radius = 1500, opacity = 1, starTxt }) {
  const starTexture = useLoader(TextureLoader, starTxt);
  const { camera } = useThree();
  const groupRef = useRef();

  const numStars = 50;
  const spiralArms = 10;

  function getSpiralPosition(index, spiralArms) {
    const armIndex = index % spiralArms;
    const armAngle = (armIndex / spiralArms) * 2 * Math.PI;
    const radius = 100 + index * 10; // Aumente o raio inicial e o incremento
    const angle = armAngle + index * 1; // Ajuste o ângulo de rotação
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
            {" "}
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

export { Nebula, Starfield};

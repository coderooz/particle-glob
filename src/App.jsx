import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const Particle = ({ position }) => {
  const ref = useRef();
  
  // Oscillation effect for particles
  useEffect(() => {
    const interval = setInterval(() => {
      ref.current.position.x = position.x + Math.sin(Date.now() * 0.002) * 1;
      ref.current.position.y = position.y + Math.cos(Date.now() * 0.002) * 1;
    }, 16);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color={new THREE.Color(Math.random(), Math.random(), Math.random())} />
    </mesh>
  );
};

const Globe = () => {
  const particles = [];
  
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    const x = Math.cos(angle) * 5;
    const y = Math.sin(angle) * 5;
    const z = Math.cos(angle) * Math.sin(angle) * 2;

    particles.push({ x, y, z });
  }

  return (
    <>
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Sphere>

      {particles.map((position, index) => (
        <Particle key={index} position={position} />
      ))}
    </>
  );
};

const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Globe />
        <OrbitControls />
        <Stars />
      </Canvas>
    </div>
  );
};

export default App;

'use client';
import { useGLTF } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useMotionValue, useSpring } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

const Cursor = () => {
  const [Xpos, setXpos] = useState(0);
  const [Ypos, setYpos] = useState(0);

  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  //   const scene = useRef<any>(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 1 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 1 })
  };

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPosition = (clientX / innerWidth) * 2 - 1;
      const yPosition = (clientY / innerHeight) * 2 - 1;

      const spinFactor = 20;
      const xSpin = (clientX / innerWidth) * -spinFactor;
      const ySpin = (clientY / innerHeight) * -spinFactor;

      const scaleXFactor = innerWidth / 300;
      const scaleYFactor = innerHeight / 260;
      setXpos(xPosition * scaleXFactor);
      setYpos(yPosition * -scaleYFactor);

      mouse.x.set(xSpin);
      mouse.y.set(ySpin);
    };

    window.addEventListener('mousemove', manageMouseMove);
    return () => window.removeEventListener('mousemove', manageMouseMove);
  }, [mouse.x, mouse.y]);

  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full w-full" ref={targetRef}>
      <Canvas
        className="h-full w-full"
        gl={{ alpha: true }} // This line makes the background transparent
        {...(targetRef.current && { eventSource: targetRef.current })}
      >
        <ambientLight intensity={0.1} />
        <directionalLight intensity={3.5} position={[1, 0, -0.25]} />
        <motion.mesh
          scale={0.005}
          rotation-z={smoothMouse.x}
          rotation-y={smoothMouse.y}
          rotation-x={degreesToRadians(90)}
          position-z={0}
          position-x={Xpos}
          position-y={Ypos}
        >
          <PhoneMesh />
        </motion.mesh>
      </Canvas>
    </div>
  );
};

function PhoneMesh() {
  const ref = useRef<Group | null>(null);
  const gltf = useGLTF('/3DAssets/Models/Phone/Phone.glb') as any;
  const { nodes, materials } = gltf;

  const [color, normal, aoMap] = useLoader(TextureLoader, [
    '/3DAssets/Materials/Phone/color.webp',
    '/3DAssets/Materials/Phone/normal.webp',
    '/3DAssets/Materials/Phone/occlusion.webp'
  ]);

  return (
    <group ref={ref}>
      {/* <Suspense> */}
      <motion.mesh
        //upper antenns
        receiveShadow
        castShadow
        geometry={nodes.bp1.geometry}
        position-z={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>

      <motion.mesh
        //Lower antenns
        receiveShadow
        castShadow
        geometry={nodes.bp2.geometry}
        position-z={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>

      <motion.mesh
        //rear body
        receiveShadow
        castShadow
        geometry={nodes.bp3.geometry}
        material={materials.Material001}
        // position-z={negativeZ}
        position-x={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>

      <motion.mesh
        //mid body
        receiveShadow
        castShadow
        geometry={nodes.bp6.geometry}
        // position-z={negativeZ}
        position-x={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>

      <motion.mesh
        //keybaord
        receiveShadow
        castShadow
        geometry={nodes.bp5.geometry}
        // position-z={negativeZ}
        position-x={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>

      <motion.mesh
        //front most face
        receiveShadow
        castShadow
        geometry={nodes.bp4.geometry}
        rotation-z={0}
        // position-z={negativeZ}
        position-x={0}
      >
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>
      {/* </Suspense> */}
    </group>
  );
}

export default Cursor;

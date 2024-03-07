'use client';
import { useGLTF } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { useMotionValue, useSpring } from 'framer-motion';
// import { Perf } from 'r3f-perf';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

type PhoneCollisionsProps = {
  initialVisibility: boolean;
};

const PhoneCollisions = ({ initialVisibility }: PhoneCollisionsProps) => {
  const [gravity, setGravity] = useState<[number, number, number]>([0, 0, 0]);
  // const { nodes } = useGLTF('/3DAssets/Models/Phone/Phone.glb') as any;

  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  const collisionEnter = () => {
    // hitSound.currentTime = 0
    // hitSound.volume = Math.random()
    // hitSound.play()
    // console.log('collision')
  };

  const mouse = {
    //only the objects that use the mouse will be re renderes with useMotionValue - not the whole page
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 1 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 1 })
  };

  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    // Set a timeout to change isVisible to true after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      mouse.x.set(x);
      mouse.y.set(y);
    };

    window.addEventListener('mousemove', manageMouseMove);
    return () => window.removeEventListener('mousemove', manageMouseMove);
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    const updateGravity = () => {
      // Map the mouse position to a suitable range for gravity
      // For example, mapping it between -10 and 10

      const newGravityX = (smoothMouse.x.get() - 0.5) * 10;
      const newGravityY = (smoothMouse.y.get() - 0.5) * 10;
      // console.log('X' + newGravityX);
      // console.log('Y' + newGravityY);
      // console.log(newGravityY);

      isVisible ? setGravity([newGravityX, -newGravityY, 0]) : setGravity([0, 0, 0]);
    };

    // apply forces based upon events

    const unsubscribeX = smoothMouse.x.onChange(updateGravity);
    const unsubscribeY = smoothMouse.y.onChange(updateGravity);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [isVisible, smoothMouse.x, smoothMouse.y]);

  return (
    <motion.div className="opacity-1 z-[0] h-full w-full ">
      <Canvas shadows orthographic camera={{ position: [0, 0, 200], zoom: 60 }} className="h-full">
        <directionalLight castShadow position={[1, 1, 4]} intensity={1} />
        <directionalLight castShadow position={[-1, -1, 4]} intensity={1} />

        <ambientLight intensity={1.5} />
        <Physics gravity={gravity}>
          <mesh
            scale={0.04}
            rotation-y={degreesToRadians(45)}
            rotation-x={degreesToRadians(90)}
            rotation-z={degreesToRadians(-90)}
            position-y={-0.5}
            position-x={0.5}
          >
            <PhoneMesh />
          </mesh>

          <RigidBody type="fixed" restitution={1} friction={0.7} onCollisionEnter={collisionEnter}>
            <mesh receiveShadow position={[0, 0, -5]}>
              <boxGeometry args={[0.0167 * innerWidth, innerHeight * 0.0069 * 2, 0.5]} />
              <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} />
            </mesh>
            <CuboidCollider
              args={[0.0165 * innerWidth, 0.5, 10]}
              position={[0, innerHeight * -0.0065, 0]}
            />
            <CuboidCollider
              args={[0.0165 * innerWidth, 0.5, 10]}
              position={[0, innerHeight * 0.0065, 0]}
            />
            <CuboidCollider
              args={[0.5, innerHeight * 0.0069 * 2, 10]}
              position={[(-0.0172 * innerWidth) / 2, 0, 0]}
            />
            <CuboidCollider
              args={[0.5, innerHeight * 0.0069 * 2, 10]}
              position={[(0.0172 * innerWidth) / 2, 0, 0]}
            />
            <CuboidCollider
              args={[(0.0167 * innerWidth) / 2, innerHeight * 0.0069, 0.5 / 2]}
              position={[0, 0, 5]}
            />
          </RigidBody>
        </Physics>
      </Canvas>
    </motion.div>
  );
};

export default PhoneCollisions;

function PhoneMesh() {
  const ref = useRef<Group | null>(null);
  const gltf = useGLTF('/3DAssets/Models/Phone/Phone.glb') as any;
  const { nodes, materials } = gltf;

  const [color, normal, aoMap] = useLoader(TextureLoader, [
    '/3DAssets/Materials/Phone/color.webp',
    '/3DAssets/Materials/Phone/normal.webp',
    '/3DAssets/Materials/Phone/occlusion.webp'
  ]);

  // const rearBody = useRef<any>(null);

  // const rearBodyJump = () => {
  //   // const mass = rearBody.current.mass()
  //   rearBody.current.applyImpulse({ x: 0, y: 10, z: 0 });
  //   rearBody.current.applyTorqueImpulse({
  //     x: Math.random() - 0.5,
  //     y: Math.random() - 0.5,
  //     z: Math.random() - 0.5
  //   });
  // };

  return (
    <group ref={ref}>
      <RigidBody colliders="hull">
        <mesh
          //upper antenns
          receiveShadow
          castShadow
          geometry={nodes.bp1.geometry}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>

      <RigidBody colliders="hull">
        <mesh
          //Lower antenns
          receiveShadow
          castShadow
          geometry={nodes.bp2.geometry}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        // gravityScale={0.2}
        restitution={1}
        friction={1}
        // mass={ 0.5 }
      >
        <mesh
          //rear body
          // onClick={rearBodyJump}
          receiveShadow
          castShadow
          geometry={nodes.bp3.geometry}
          material={materials.Material001}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
          {/* <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} /> */}
        </mesh>
      </RigidBody>

      <RigidBody colliders="hull">
        <mesh
          //mid body
          receiveShadow
          castShadow
          geometry={nodes.bp6.geometry}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>

      {/* <RigidBody colliders='trimesh'> */}
      <RigidBody colliders="hull">
        <mesh
          //keybaord
          receiveShadow
          castShadow
          geometry={nodes.bp5.geometry}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>

      <RigidBody colliders="hull">
        <mesh
          //front most face
          receiveShadow
          castShadow
          geometry={nodes.bp4.geometry}
          rotation-z={0}
        >
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>
    </group>
  );
}

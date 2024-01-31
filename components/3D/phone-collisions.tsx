'use client';
import { useGLTF } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { useMotionValue, useSpring } from 'framer-motion';
import { Perf } from 'r3f-perf';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

const PhoneCollisions = () => {
  const [gravity, setGravity] = useState<[number, number, number]>([0, 0, 0]);
  // const { nodes } = useGLTF('/3DAssets/Models/Phone/Phone.glb') as any;

  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // const [hitSound] = useState(() => new Audio('/Audio/hit.mp3'))

  // const Xscalar = 0
  // const Yscalar = 0

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
      // const newGravityX = (smoothMouse.x.get() - 0.5) * 10;
      // const newGravityY = (smoothMouse.y.get() - 0.5) * 10;
      // console.log("X"+newGravityX)
      // console.log("Y"+newGravityY)
      // console.log(newGravityY)

      // setGravity([newGravityX, -newGravityY, 0]);
      setGravity([0, 0, 0]);
    };

    // apply forces based upon events
    // useEffect(() => {
    //     if (rigidBody.current) {
    //       // A one-off "push"
    //       rigidBody.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);

    //       // A continuous force
    //       rigidBody.current.addForce({ x: 0, y: 10, z: 0 }, true);

    //       // A one-off torque rotation
    //       rigidBody.current.applyTorqueImpulse({ x: 0, y: 10, z: 0 }, true);

    //       // A continuous torque
    //       rigidBody.current.addTorque({ x: 0, y: 10, z: 0 }, true);
    //     }
    //   }, []);

    const unsubscribeX = smoothMouse.x.onChange(updateGravity);
    const unsubscribeY = smoothMouse.y.onChange(updateGravity);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothMouse.x, smoothMouse.y]);

  return (
    <Canvas shadows orthographic camera={{ position: [0, 0, 200], zoom: 60 }}>
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <directionalLight castShadow position={[1, 1, 4]} intensity={1} />
      <directionalLight castShadow position={[-1, -1, 4]} intensity={1} />
      {/* <mesh position={[0, 0, 8]} >
            <boxGeometry args={[2, 2, 2]} />
            </mesh> */}
      <ambientLight intensity={1.5} />
      <Physics gravity={gravity}>
        {/* We can animate these gravity values */}
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
          {/* <mesh receiveShadow position={[0, innerHeight * -0.0065, 0]}>
                        <boxGeometry args={[0.0165 * innerWidth, 0.5, 10]} /> */}
          {/* <meshStandardMaterial color="greenyellow" /> */}
          {/* <CuboidCollider args={[0.0165 * innerWidth / 2, 0.5 / 2, 10 / 2]} /> */}
          {/* <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} />
                    </mesh> */}

          {/* <mesh receiveShadow position={[0, innerHeight * 0.0065, 0]}>
                        <boxGeometry args={[0.0165 * innerWidth, 0.5, 10]} /> */}
          {/* <meshStandardMaterial color="greenyellow" /> */}
          {/* <CuboidCollider args={[0.0165 * innerWidth / 2, 0.5 / 2, 10 / 2]} /> */}
          {/* <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} />
                    </mesh> */}

          {/* <mesh receiveShadow position={[-0.0172 * innerWidth / 2, 0, 0]}>
                        <boxGeometry args={[0.5, innerHeight * 0.0069 * 2, 10]} /> */}
          {/* <meshStandardMaterial color="greenyellow" /> */}
          {/* <CuboidCollider args={[0.0165*innerWidth/2, 0.5/2, 10/2]}/> */}
          {/* <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} />
                    </mesh> */}

          {/* <mesh receiveShadow position={[0.0172 * innerWidth / 2, 0, 0]}>
                        <boxGeometry args={[0.5, innerHeight * 0.0069 * 2, 10]} /> */}
          {/* <meshStandardMaterial color="greenyellow" /> */}
          {/* <CuboidCollider args={[0.0165*innerWidth/2, 0.5/2, 10/2]}/> */}
          {/* <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} />
                    </mesh> */}

          <mesh receiveShadow position={[0, 0, -5]}>
            <boxGeometry args={[0.0167 * innerWidth, innerHeight * 0.0069 * 2, 0.5]} />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            {/* <CuboidCollider args={[0.0165*innerWidth/2, 0.5/2, 10/2]}/> */}
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
        {/* <RigidBody type="fixed"> */}
        {/* <CuboidCollider args={[10, 0.5, 10]} position={[0, 3.2, 0]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                    <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, - 5.5]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[0.009*innerWidth, 1, 0]} />
                    <CuboidCollider args={[0.5, 2, 5]} position={[-0.009*innerWidth, 1, 0]} /> */}
        {/* </RigidBody> */}
      </Physics>
      {/* <Environment preset="city" /> */}
    </Canvas>
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

  const rearBody = useRef<any>(null);

  const rearBodyJump = () => {
    // const mass = rearBody.current.mass()
    rearBody.current.applyImpulse({ x: 0, y: 5, z: 0 });
    rearBody.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5
    });
  };

  // const [hitSound] = useState(() => new Audio('/Audio/hit.mp3'))

  // const collisionEnter = () => {
  //     hitSound.currentTime = 0
  //     hitSound.volume = Math.random()
  //     hitSound.play()
  // }

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
        ref={rearBody}
        colliders="hull"
        // gravityScale={0.2}
        restitution={1}
        friction={1}
        // mass={ 0.5 }
      >
        <mesh
          //rear body
          onClick={rearBodyJump}
          receiveShadow
          castShadow
          geometry={nodes.bp3.geometry}
          material={materials.Material001}
        >
          {/* <MeshTransmissionMaterial
                        samples={8}
                        resolution={512}
                        anisotropy={1}
                        thickness={0.1}
                        roughness={0.4}
                        toneMapped={true}
                        distortionScale={1}
                        temporalDistortion={1} 
                    /> */}
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

// function Twister() {
//     //animate an object (with contstand animation i.e constant spinngin)
//     const twister = useRef<any>(null)
//     useFrame((state) => {
//         //this is the threejs clock we wantto animate on frame
//         const time = state.clock.getElapsedTime()
//         //we can calulate the rotation with this time - first we calulate a Euler value
//         const eulerRotation = new THREE.Euler(0, time, 0)
//         //Then we have to conver to a Quanternion bevause rapier taks Quanternions
//         const quaternionRotation = new THREE.Quaternion()
//         quaternionRotation.setFromEuler(eulerRotation)
//         twister.current.setNextKinematicRotation(quaternionRotation)

//         //more complex motion
//         //    const angle = time * 0.5
//         //     const x = Math.cos(angle)
//         //     const z = Math.sin(angle)
//         //     twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z })
//     })

//     return (
//         <RigidBody
//             ref={twister}
//             position={[0, - 0.8, 0]}
//             friction={0}
//             type="kinematicPosition"
//         >
//             <mesh castShadow scale={[0.4, 0.4, 3]}>
//                 <boxGeometry />
//                 <meshStandardMaterial color="red" />
//             </mesh>
//         </RigidBody>

//     )
// }

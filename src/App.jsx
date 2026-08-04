import { Suspense, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, Html, Center, ScrollControls, useScroll } from '@react-three/drei'
import { useControls } from 'leva'
import { Driver } from './Driver'

// Model component
function Ferrari() {
  const { scene } = useGLTF('/ferrari_f1_2019-v1.glb')

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Force the material to be completely solid and write to the depth buffer
          child.material.transparent = false;
          child.material.depthWrite = true;
          // Ensure side rendering is set to default (FrontSide) to prevent double-rendering
          child.material.side = THREE.FrontSide;
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />
}

export function CinematicCamera() {
  const scroll = useScroll();
  const { camera } = useThree();
  
  // Set wide-angle lens for aggressive car photography
  camera.fov = 35;
  camera.updateProjectionMatrix();

  // 1. Camera position track
  const positionCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.8, -6.5),  // Start: Rear three-quarter
    new THREE.Vector3(5.0, 0.5, -2.0),  // Mid: Side profile sweep
    new THREE.Vector3(0.0, 0.9,  1.0),  // End: Just behind cockpit, at helmet height
  ]), []);

  // 2. Look-at target track
  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.6,  0.0),  // Start: looking at engine cover
    new THREE.Vector3(0.0, 0.4,  0.0),  // Mid: looking at cockpit
    new THREE.Vector3(0.0, 0.1,  0.0),  // End: looking at helmet
  ]), []);

  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();
  const smoothedLook = new THREE.Vector3(0, 0.6, 0); // Starting look position

  useFrame((state) => {
    const t = scroll.offset; // 0 to 1

    // Get the exact point on the smooth curves
    positionCurve.getPointAt(t, targetPos);
    lookCurve.getPointAt(t, targetLook);

    // Apply position
    state.camera.position.lerp(targetPos, 0.05); // Heavier damping for smooth drone feel
    
    // Apply smoothed look-at (Camera Weight)
    smoothedLook.lerp(targetLook, 0.05);
    state.camera.lookAt(smoothedLook);
  });

  return null;
}

export default function App() {
  return (
    <>
      <div className="typography-overlay">
        <h1>HOBBIES</h1>
      </div>

      <Canvas
        dpr={1}
        camera={{ position: [0.0, 0.8, -6.5], fov: 85, near: 0.2 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={<Html center className="loading-fallback">Loading Grid...</Html>}>
          <ScrollControls pages={3} damping={0.2}>
            <Center>
              <Ferrari />
            </Center>
            <CinematicCamera />
          </ScrollControls>
          
          {/* Driver locked in final position */}
          <Driver 
            position={[0.0, -1.0, 0.0]} 
            rotation={[0, 0, 0]} 
            scale={1} 
          />

          <Environment preset="studio" />
          
          {/* Glowing rain light at the rear */}
          <pointLight 
            position={[0, 0.5, 2]} 
            color="red" 
            intensity={5} 
            distance={5} 
          />
        </Suspense>
      </Canvas>
    </>
  )
}

// Preload the model
useGLTF.preload('/ferrari_f1_2019-v1.glb')


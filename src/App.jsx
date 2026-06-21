import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, useGLTF, Html, Center, OrbitControls } from '@react-three/drei'

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

// Camera logger component
function CameraLogger() {
  const { camera } = useThree()
  useEffect(() => {
    const logPosition = () => {
      console.log('Camera Position:', camera.position)
    }
    window.addEventListener('mouseup', logPosition)
    return () => window.removeEventListener('mouseup', logPosition)
  }, [camera])
  return null
}

export default function App() {
  return (
    <>
      <div className="typography-overlay">
        <h1>HOBBIES</h1>
      </div>

      <Canvas
        dpr={1}
        camera={{ position: [0, 0.4, -6], fov: 35, near: 0.2 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={<Html center className="loading-fallback">Loading Grid...</Html>}>
          <Center>
            <Ferrari />
          </Center>
          
          <Environment preset="studio" />
          
          {/* Glowing rain light at the rear */}
          <pointLight 
            position={[0, 0.5, 2]} 
            color="red" 
            intensity={5} 
            distance={5} 
          />
          <OrbitControls minDistance={4} maxDistance={10} maxPolarAngle={Math.PI / 2} />
          <CameraLogger />
        </Suspense>
      </Canvas>
    </>
  )
}

// Preload the model
useGLTF.preload('/ferrari_f1_2019-v1.glb')

import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Driver(props) {
  const { scene } = useGLTF('/rhp_bell_hp77_driver_f1.glb');

  useEffect(() => {
    // Forcefully scale the internal scene up by 100x to fix microscopic FBX export
    scene.scale.set(100, 100, 100);
    scene.position.set(0, 0, 0);

    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        child.visible = true;

        // Reset skeleton bind pose to fix collapsed bones
        if (child.isSkinnedMesh && child.skeleton) {
          child.skeleton.pose();
        }

        // Fix materials
        const applyMaterialFixes = (mat) => {
          if (!mat) return;
          mat.transparent = false;
          mat.depthWrite = true;
          mat.side = THREE.DoubleSide; // Fix inside-out normals
          mat.needsUpdate = true;
        };

        if (Array.isArray(child.material)) {
          child.material.forEach(applyMaterialFixes);
        } else {
          applyMaterialFixes(child.material);
        }

        // Apply gold visor override
        if (child.name.toLowerCase().includes('visor') || child.name.toLowerCase().includes('glass')) {
          const goldVisor = new THREE.MeshPhysicalMaterial({
            color: 0xffaa00,
            metalness: 1.0,
            roughness: 0.0,
            clearcoat: 1.0,
            envMapIntensity: 2.0
          });
          child.material = goldVisor;
        }
      }
    });
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/rhp_bell_hp77_driver_f1.glb');

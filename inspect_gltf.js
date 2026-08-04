import fs from 'fs';
import { NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';

async function checkGLTF() {
  const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(),
    });

  const doc = await io.read('public/rhp_bell_hp77_driver_f1.glb');
  const root = doc.getRoot();
  
  console.log('Meshes:');
  root.listMeshes().forEach(m => console.log(' - ' + m.getName()));
  
  console.log('\nNodes:');
  root.listNodes().forEach(n => {
    const s = n.getScale();
    const t = n.getTranslation();
    console.log(` - ${n.getName()}: scale=[${s.join(',')}], translation=[${t.join(',')}]`);
  });
}

checkGLTF().catch(console.error);

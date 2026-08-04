const fs = require('fs');

function inspectGLB(filePath) {
    const buffer = fs.readFileSync(filePath);
    const magic = buffer.toString('utf8', 0, 4);
    if (magic !== 'glTF') {
        console.log('Not a valid GLB file');
        return;
    }

    const version = buffer.readUInt32LE(4);
    const length = buffer.readUInt32LE(8);
    console.log(`GLB Version: ${version}, Total Length: ${length}`);

    let chunkOffset = 12;
    const chunkLength = buffer.readUInt32LE(chunkOffset);
    const chunkType = buffer.toString('utf8', chunkOffset + 4, chunkOffset + 8);

    if (chunkType === 'JSON') {
        const jsonContent = buffer.toString('utf8', chunkOffset + 8, chunkOffset + 8 + chunkLength);
        const gltf = JSON.parse(jsonContent);
        
        console.log('\n--- GLTF JSON Data ---');
        console.log('Asset:', gltf.asset);
        console.log('Scenes count:', gltf.scenes ? gltf.scenes.length : 0);
        console.log('Nodes count:', gltf.nodes ? gltf.nodes.length : 0);
        console.log('Meshes count:', gltf.meshes ? gltf.meshes.length : 0);
        console.log('Materials count:', gltf.materials ? gltf.materials.length : 0);
        console.log('Cameras count:', gltf.cameras ? gltf.cameras.length : 0);
        
        if (gltf.nodes) {
            console.log('\nNodes:');
            gltf.nodes.forEach((node, index) => {
                console.log(`Node ${index}: ${node.name || 'unnamed'}`);
                if (node.scale) console.log(`  scale: ${node.scale}`);
                if (node.translation) console.log(`  translation: ${node.translation}`);
                if (node.mesh !== undefined) console.log(`  mesh: ${node.mesh}`);
            });
        }
    }
}

inspectGLB('public/rhp_bell_hp77_driver_f1.glb');

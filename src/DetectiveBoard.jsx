import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Center } from '@react-three/drei';
import { useControls } from 'leva';
import { Board } from './Board';
import './DetectiveBoard.css';

// A helper to make tweaking easier
function TweakedHtml({ name, defaultPosition, defaultRotation, defaultScale = 0.1, children, transform = true, ...props }) {
  const { position, rotation, scale } = useControls(name, {
    position: defaultPosition,
    rotation: defaultRotation,
    scale: defaultScale,
  });

  return (
    <Html 
      transform={transform} 
      position={position} 
      rotation={rotation} 
      scale={scale} 
      {...props}
    >
      {children}
    </Html>
  );
}

export default function DetectiveBoard() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const getTransform = (id, baseTransform) => {
    return hoveredNode === id ? `${baseTransform} scale(1.05)` : baseTransform;
  };

  return (
    <div className="board-container" style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <OrbitControls makeDefault minDistance={2} maxDistance={50} />
        <Environment preset="city" />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* The 3D Board, centered and scaled up if it was too small */}
        <Center>
          <Board scale={10} />
        </Center>

        {/* NODE 1: Center (The Suspect) */}
        <TweakedHtml 
          name="Suspect Polaroid v3" 
          defaultPosition={[0, 5, 0.5]} 
          defaultRotation={[0, 0, 0]}
          defaultScale={5}
        >
          <div 
            className="board-node polaroid"
            onMouseEnter={() => setHoveredNode('suspect')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              transform: getTransform('suspect', 'rotate(2deg)') 
            }}
          >
            <div className="pin"></div>
            <img src="/images/suspect.jpg" alt="Suspect Portrait" onError={(e) => e.target.src = 'https://via.placeholder.com/250x300?text=Missing+File'} />
            <div className="polaroid-text">
              ERMIAS SIMEGNE<br />
              STATUS: Software Engineering Undergrad<br />
              EXP: 2027
            </div>
          </div>
        </TweakedHtml>

        {/* NODE 2: Top Left (Tech Evidence) */}
        <TweakedHtml 
          name="Tech Folder v3" 
          defaultPosition={[-18, 15, 0.5]} 
          defaultRotation={[0, 0, 0]}
          defaultScale={5}
        >
          <div 
            className="board-node manila-folder"
            onMouseEnter={() => setHoveredNode('tech')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              transform: getTransform('tech', 'rotate(-4deg)') 
            }}
          >
            <div className="folder-tab"></div>
            <div className="tape"></div>
            <div className="sticky-note">
              <p><strong>EVIDENCE:</strong><br/>Space Science Institute & Muqecha Studios Internships (Next.js, FastAPI)</p>
            </div>
            <img src="/images/ssgi-portal.png" className="folder-img" alt="SSGI Portal" onError={(e) => e.target.src = 'https://via.placeholder.com/250x150?text=Tech+Evidence'} />
          </div>
        </TweakedHtml>

        {/* NODE 3: Bottom Right (Training Dossier) */}
        <TweakedHtml 
          name="Training Cards v3" 
          defaultPosition={[18, -10, 0.5]} 
          defaultRotation={[0, 0, 0]}
          defaultScale={5}
        >
          <div 
            className="board-node index-card-stack"
            onMouseEnter={() => setHoveredNode('training')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              transform: getTransform('training', 'rotate(6deg)') 
            }}
          >
            <div className="index-card" style={{ transform: 'rotate(-8deg)', left: '-10px', top: '10px' }}>
              <h3>A2SV Trainee</h3>
              <img src="/images/alx-cert.png" alt="ALX Certificate" onError={(e) => e.target.src = 'https://via.placeholder.com/200x80?text=ALX+Cert'} />
            </div>
            <div className="index-card">
              <div className="pin"></div>
              <h3>Kifiya AI Mastery</h3>
              <img src="/images/kifiya-cert.png" alt="Kifiya Certificate" onError={(e) => e.target.src = 'https://via.placeholder.com/200x80?text=Kifiya+Cert'} />
            </div>
          </div>
        </TweakedHtml>

        {/* NODE 4: Bottom Left (Leadership Pattern) */}
        <TweakedHtml 
          name="Leadership News v3" 
          defaultPosition={[-18, -10, 0.5]} 
          defaultRotation={[0, 0, 0]}
          defaultScale={5}
        >
          <div 
            className="board-node newspaper-clipping"
            onMouseEnter={() => setHoveredNode('leadership')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              transform: getTransform('leadership', 'rotate(-3deg)') 
            }}
          >
            <div className="tape"></div>
            <div className="newspaper-headline">Leadership Pattern Detected</div>
            <div className="newspaper-body">
              Subject identified as UNA-ET Secretary and MUN Coordinator. Shows strong organizational and leadership capabilities.
            </div>
            <img src="/images/una-et.png" alt="UNA-ET Certificate" onError={(e) => e.target.src = 'https://via.placeholder.com/250x150?text=UNA-ET+Cert'} />
          </div>
        </TweakedHtml>

        {/* NODE 5: Hobbies (On the stand) */}
        <TweakedHtml 
          name="Hobbies Button v3" 
          defaultPosition={[0, 42, -5]} 
          defaultRotation={[-0.2, 0, 0]}
          defaultScale={6}
        >
          <Link 
            to="/hobbies"
            className="board-node hobbies-note button-style"
            onMouseEnter={() => setHoveredNode('hobbies')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ 
              transform: getTransform('hobbies', 'rotate(0deg)'),
              padding: '12px 24px',
              background: '#cc0000',
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              display: 'inline-block',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              border: '2px solid #ff3333',
              cursor: 'pointer'
            }}
          >
            INSPECT HOBBIES
          </Link>
        </TweakedHtml>

      </Canvas>
    </div>
  );
}

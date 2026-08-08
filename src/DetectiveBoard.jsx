import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DetectiveBoard.css';

export default function DetectiveBoard() {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Helper to apply the hover scale effect dynamically
  const getTransform = (id, baseTransform) => {
    return hoveredNode === id ? `${baseTransform} scale(1.05)` : baseTransform;
  };

  return (
    <div className="board-container">
      
      {/* Red Strings Layer */}
      <svg className="string-layer">
        {/* String to Tech Evidence (Top Left) */}
        <line x1="50%" y1="50%" x2="25%" y2="25%" className="string-line" />
        {/* String to Leadership (Bottom Left) */}
        <line x1="50%" y1="50%" x2="25%" y2="75%" className="string-line" />
        {/* String to Training Dossier (Bottom Right) */}
        <line x1="50%" y1="50%" x2="75%" y2="70%" className="string-line" />
        {/* String to Hobbies */}
        <line x1="50%" y1="50%" x2="80%" y2="25%" className="string-line" />
      </svg>

      {/* NODE 1: Center (The Suspect) */}
      <div 
        className="board-node polaroid"
        onMouseEnter={() => setHoveredNode('suspect')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{ 
          top: '50%', left: '50%', 
          marginLeft: '-125px', marginTop: '-180px', // Center offset
          transform: getTransform('suspect', 'rotate(2deg)') 
        }}
      >
        <div className="pin"></div>
        {/* Replace with uploaded portrait photo */}
        <img src="/images/suspect.jpg" alt="Suspect Portrait" onError={(e) => e.target.src = 'https://via.placeholder.com/250x300?text=Missing+File'} />
        <div className="polaroid-text">
          ERMIAS SIMEGNE<br />
          STATUS: Software Engineering Undergrad<br />
          EXP: 2027
        </div>
      </div>

      {/* NODE 2: Top Left (Tech Evidence) */}
      <div 
        className="board-node manila-folder"
        onMouseEnter={() => setHoveredNode('tech')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{ 
          top: '10%', left: '10%', 
          transform: getTransform('tech', 'rotate(-4deg)') 
        }}
      >
        <div className="folder-tab"></div>
        <div className="tape"></div>
        <div className="sticky-note">
          <p><strong>EVIDENCE:</strong><br/>Space Science Institute & Muqecha Studios Internships (Next.js, FastAPI)</p>
        </div>
        {/* Replace with SSGI portal screenshot */}
        <img src="/images/ssgi-portal.png" className="folder-img" alt="SSGI Portal" onError={(e) => e.target.src = 'https://via.placeholder.com/250x150?text=Tech+Evidence'} />
      </div>

      {/* NODE 3: Bottom Right (Training Dossier) */}
      <div 
        className="board-node index-card-stack"
        onMouseEnter={() => setHoveredNode('training')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{ 
          top: '55%', left: '65%', 
          transform: getTransform('training', 'rotate(6deg)') 
        }}
      >
        {/* Background card (ALX) */}
        <div className="index-card" style={{ transform: 'rotate(-8deg)', left: '-10px', top: '10px' }}>
          <h3>A2SV Trainee</h3>
          <img src="/images/alx-cert.png" alt="ALX Certificate" onError={(e) => e.target.src = 'https://via.placeholder.com/200x80?text=ALX+Cert'} />
        </div>
        {/* Foreground card (Kifiya) */}
        <div className="index-card">
          <div className="pin"></div>
          <h3>Kifiya AI Mastery</h3>
          <img src="/images/kifiya-cert.png" alt="Kifiya Certificate" onError={(e) => e.target.src = 'https://via.placeholder.com/200x80?text=Kifiya+Cert'} />
        </div>
      </div>

      {/* NODE 4: Bottom Left (Leadership Pattern) */}
      <div 
        className="board-node newspaper-clipping"
        onMouseEnter={() => setHoveredNode('leadership')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{ 
          top: '60%', left: '12%', 
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

      {/* NODE 5: Hobbies (Link to 3D F1 Page) */}
      <Link 
        to="/hobbies"
        className="board-node hobbies-note"
        onMouseEnter={() => setHoveredNode('hobbies')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{ 
          top: '15%', left: '75%', 
          transform: getTransform('hobbies', 'rotate(8deg)') 
        }}
      >
        <div className="pin" style={{ background: '#333' }}></div>
        CONFIDENTIAL:<br />
        Subject's Hobbies<br />
        (Click to inspect)
      </Link>

    </div>
  );
}

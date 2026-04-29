import React from 'react';
import { MeshGradient } from "@paper-design/shaders-react";

export function ShaderBackground() {
  return (
    <div
      className="shader-background-container"
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <MeshGradient
        style={{ width: '100%', height: '100%', display: 'block' }}
        colors={["#050506", "#963BF7", "#050506", "#F7621E", "#050506"]}
        speed={0.35}
        backgroundColor="#050506"
      />
      {/* Balanced vignette using brand background color */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(circle at center, transparent 0%, #050506 85%)',
        opacity: 0.75
      }} />
    </div>
  );
}


import React, { useRef, useEffect } from 'react';
import { SpriteMatrix } from '@/lib/shipGenerator';

interface SpriteCanvasProps {
  spriteMatrix: SpriteMatrix;
  pixelSize?: number;
}

const COLORS: { [key: number]: string } = {
  0: 'transparent',
  1: '#94a3b8', // Ship Body (slate-400)
  2: '#67e8f9', // Ship Cockpit (cyan-300)
  3: '#f97316', // Ship Thruster (orange-500)
  4: '#facc15', // Ship Detail (amber-400)
  5: '#ef4444', // Car Body (red-500)
  6: '#1f2937', // Car Wheels (gray-800)
  7: '#60a5fa', // Car Windows (blue-400)
  8: '#3b82f6', // Car Body (blue-500)
  9: '#22c55e', // Car Body (green-500)
  10: '#eab308', // Car Body (yellow-500)
  11: '#e2e8f0', // Car Body (slate-200)
};

const SpriteCanvas: React.FC<SpriteCanvasProps> = ({ spriteMatrix, pixelSize = 20 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !spriteMatrix) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const height = spriteMatrix.length;
    const width = spriteMatrix[0]?.length || 0;

    canvas.height = height * pixelSize;
    canvas.width = width * pixelSize;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const cell = spriteMatrix[y][x];
        if (cell > 0) {
          ctx.fillStyle = COLORS[cell];
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
          
          // Add a subtle border to each pixel
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }, [spriteMatrix, pixelSize]);

  return <canvas ref={canvasRef} className="bg-card rounded-lg animate-fade-in" />;
};

export default SpriteCanvas;

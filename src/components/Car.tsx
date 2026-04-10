import React from "react";

export default function Car({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(90deg)" }}
    >
      {/* Car Body Shadow */}
      <rect x="35" y="15" width="130" height="370" rx="30" fill="gray" opacity="0.3" filter="blur(8px)" />
      
      {/* Main Body */}
      <path
        d="M 50,50 Q 100,0 150,50 L 160,180 Q 170,220 160,280 L 150,350 Q 100,380 50,350 L 40,280 Q 30,220 40,180 Z"
        fill="#ff3b30"
      />
      
      {/* Roof/Windshield */}
      <path
        d="M 70,120 Q 100,90 130,120 L 140,220 Q 100,240 60,220 Z"
        fill="#111"
        stroke="#333"
        strokeWidth="2"
      />
      
      {/* Rear Window */}
      <path
        d="M 70,250 Q 100,240 130,250 L 120,300 Q 100,310 80,300 Z"
        fill="#111"
      />
      
      {/* Racing Stripes */}
      <rect x="90" y="20" width="8" height="350" fill="#fff" opacity="0.9" />
      <rect x="102" y="20" width="8" height="350" fill="#fff" opacity="0.9" />
      
      {/* Wheels */}
      <rect x="25" y="60" width="15" height="40" rx="5" fill="#111" />
      <rect x="160" y="60" width="15" height="40" rx="5" fill="#111" />
      <rect x="25" y="280" width="15" height="45" rx="5" fill="#111" />
      <rect x="160" y="280" width="15" height="45" rx="5" fill="#111" />
      
      {/* Headlights */}
      <path d="M 60,40 Q 65,30 75,35 Z" fill="#fffa90" />
      <path d="M 140,40 Q 135,30 125,35 Z" fill="#fffa90" />
      
      {/* Taillights */}
      <rect x="60" y="355" width="20" height="5" rx="2" fill="#ff0000" />
      <rect x="120" y="355" width="20" height="5" rx="2" fill="#ff0000" />
    </svg>
  );
}

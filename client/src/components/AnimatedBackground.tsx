import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-shift"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-gradient-to-r from-pink-400/30 to-blue-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[30%] right-[10%] w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[15%] w-4 h-4 border-2 border-blue-300/40 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-[60%] right-[20%] w-6 h-6 border-2 border-purple-300/40 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[70%] w-3 h-3 bg-pink-300/40 rotate-45 animate-bounce-slow"></div>
        <div className="absolute top-[40%] left-[80%] w-5 h-5 border-2 border-blue-300/40 animate-spin-reverse"></div>
      </div>
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
    </div>
  );
}
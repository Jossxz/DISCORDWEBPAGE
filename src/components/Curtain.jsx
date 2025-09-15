import React from 'react'
import { useState } from "react";

const Curtain = () => {
  const [isOpen, setIsOpen] = useState(true);
  
return (
    <div className="relative h-screen w-screen bg-gray-200 flex items-center justify-center">
      {/* Conteúdo da página */}
      <h1 className="text-4xl font-bold z-0">Meu Conteúdo</h1>

      {/* Overlay preto */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black transition-opacity duration-700 ease-in-out cursor-pointer"
        />
      )}
    </div>
  );
}

export default Curtain
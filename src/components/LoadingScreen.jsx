import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="text-white text-lg">Carregando aguarde ...</div>
    </div>
  );
}

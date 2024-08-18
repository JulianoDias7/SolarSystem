import React from "react";

const Modal = ({ children, onClose }) =>(

    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20"
      onClick={onClose}
    >
      <div
        className="bg-black-500 p-4 w-3/5  rounded-md bg-opacity-75"
        onClick={(e) => e.stopPropagation()} // Evita que o clique dentro do modal feche ele
      >
        
        {children}
      </div>
    </div>
  );
  
  export default Modal;
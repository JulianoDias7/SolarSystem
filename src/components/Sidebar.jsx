import React, { useState } from "react";
import Modal from "./Modal";
import { AboutContent, FLContent, ProjectsContent, ContactContent } from "./ModalContents";

const modalComponents = {
  About: AboutContent,
  FL: FLContent,
  Projects: ProjectsContent,
  Contact: ContactContent,
};

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const [ModalComponent, setModalComponent] = useState(null);

  const handleItemClick = (item) => {
    if (activeItem === item) {
      setActiveItem(null);
      setModalComponent(null);
    } else {
      console.log(modalComponents[item])
      setActiveItem(item);
      setModalComponent(modalComponents[item]);
    }
  };

  const closeModal = () => {
    setActiveItem(null);
    setModalComponent(null);
  };

  return (
    <>
    <div className="absolute top-16 z-50 right-0 w-60 flex flex-col items-end">
      <ul className="flex flex-col">
        <li className="mb-4">
          <button
            onClick={() => handleItemClick("About")}
            className={`text-white py-2 px-4  h-12 rounded-l-full transition-all duration-300 flex items-center justify-center w-full ${
              activeItem === "About" ? "bg-gray-700 rounded-lg-full scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-gray-950 text-gray-500"
            }`}
             
          >
            Sobre Mim
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => handleItemClick("FL")}
            className={`text-white py-2 px-4 h-12 rounded-l-full transition-all duration-300 flex items-center justify-center w-full ${
              activeItem === "FL" ? "bg-gray-700 rounded-lg-full scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-gray-950 text-gray-500"
            }`}
            
          >
            Frameworks & Linguagens
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => handleItemClick("Projects")}
            className={`text-white py-2 px-4 h-12 rounded-l-full transition-all duration-300 flex items-center justify-center w-full ${
              activeItem === "Projects" ? "bg-gray-700 rounded-lg-full scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-gray-950 text-gray-500 "
            } `}
            
          >
            Projetos
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => handleItemClick("Contact")}
            className={`text-white py-2 px-4 h-12 rounded-l-full transition-all duration-300 flex items-center justify-center w-full ${
              activeItem === "Contact" ? "bg-gray-700 rounded-lg-full scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-gray-950 text-gray-500"
            } `}
           
          >
            Contato
          </button>
        </li>
      </ul>
    </div>


      {ModalComponent&& (
        <Modal onClose={closeModal}>{ModalComponent}</Modal>
          
      )}
    </>
  );
}

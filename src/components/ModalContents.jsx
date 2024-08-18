import React from "react";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaPython } from "react-icons/fa6";
import {
  SiTailwindcss,
  SiTensorflow,
  SiMongodb,
  SiDjango,
  SiPytorch,
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { FaReact, FaGit } from "react-icons/fa";

export const AboutContent = () => (
  <div className="flex flex-col items-center p-4 rounded-lg  opacity-94 ">
    <img
      src="Sun.jpg"
      alt="Juliano"
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-700"
    />
    <div className="overflow-y-auto text-white text-justify font-mono  scrollbar-custom">
      <p className="text-lg mb-4">
        Olá! Sou Juliano, um desenvolvedor apaixonado por criar experiências
        digitais únicas. Minha jornada começou em uma área diferente, mas minha
        curiosidade e amor pela tecnologia me levaram a fazer a transição para o
        desenvolvimento de software.
      </p>
      <p className="text-lg mb-4">
        Minha jornada no desenvolvimento começou como um hobby a mais de 10 anos
        e a dois se tornou uma carreira gratificante. Um dos projetos mais
        significativos que desenvolvi foi uma visualização interativa de dados,
        utilizando React, Three.js e Tailwind CSS, que me permitiu explorar
        novas tecnologias e aprimorar minhas habilidades.
      </p>
      <p className="text-lg">
        Atualmente, estou mergulhando no mundo do machine learning com
        TensorFlow.js e explorando o potencial da inteligência artificial para
        criar soluções inovadoras. Estou empolgado com as possibilidades que
        isso abre e sempre à procura de novas oportunidades. Se você quer inovar
        ou bater um papo sobre tecnologia, entre em contato!
      </p>
    </div>
  </div>
);
export const FLContent = () => (
  <div className="text-center text-xl text-gray-700">
    <h3>Frameworks, Linguagens e Ferramentas</h3>
    <div className="grid grid-cols-4 gap-4 mt-8 justify-items-center items-center text-4xl ">
      {[
        { icon: <FaHtml5 />, label: 'HTML5' },
        { icon: <FaCss3Alt />, label: 'CSS3' },
        { icon: <SiTailwindcss />, label: 'Tailwind' },
        { icon: <FaNodeJs />, label: 'Node.js' },
        { icon: <SiMongodb />, label: 'MongoDB' },
        { icon: <FaReact />, label: 'React' },
        { icon: <TbBrandThreejs />, label: 'Three.js' },
        { icon: <FaPython />, label: 'Python' },
        { icon: <SiTensorflow />, label: 'TensorFlow' },
        { icon: <SiDjango />, label: 'Django' },
        { icon: <SiPytorch />, label: 'PyTorch' },
        { icon: <FaGit />, label: 'Git' },
      ].map(({ icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center transition-transform duration-300 hover:scale-110  hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        >
          {icon}
          <span className="mt-2">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export const ProjectsContent = () => <div>Projects Content</div>;
export const ContactContent = () => <div>Contact Content</div>;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const planetInfo = {
  sun: {
    name: 'Sol',
    description:
      'O Sol é uma estrela do tipo anã amarela e o centro do nosso Sistema Solar. Sua energia mantém a vida na Terra.',
    temperature: '≈ 5.500 °C (superfície)',
    dayLength: '—',
    yearLength: '—',
  },
  mercury: {
    name: 'Mercúrio',
    description:
      'O menor e o planeta mais próximo do Sol. Extremamente quente durante o dia e frio à noite.',
    temperature: '≈ 167 °C',
    dayLength: '58,6 dias terrestres',
    yearLength: '88 dias terrestres',
  },
  venus: {
    name: 'Vênus',
    description:
      'Vênus tem uma atmosfera densa e efeito estufa intenso, tornando-o o planeta mais quente do Sistema Solar.',
    temperature: '≈ 464 °C',
    dayLength: '243 dias terrestres',
    yearLength: '225 dias terrestres',
  },
  earth: {
    name: 'Terra',
    description:
      'Nosso lar azul. Único planeta conhecido com vida, água líquida abundante e atmosfera equilibrada.',
    temperature: '≈ 15 °C',
    dayLength: '24 horas',
    yearLength: '365 dias',
  },
  mars: {
    name: 'Marte',
    description:
      'Conhecido como o planeta vermelho, Marte pode ter abrigado vida no passado e é alvo de futuras missões humanas.',
    temperature: '≈ -63 °C',
    dayLength: '24,6 horas',
    yearLength: '687 dias terrestres',
  },
  jupiter: {
    name: 'Júpiter',
    description:
      'Gigante gasoso com a maior massa do Sistema Solar. Possui mais de 70 luas e uma imensa tempestade chamada Grande Mancha Vermelha.',
    temperature: '≈ -108 °C',
    dayLength: '9,9 horas',
    yearLength: '11,9 anos terrestres',
  },
  saturn: {
    name: 'Saturno',
    description:
      'Famoso por seus impressionantes anéis, Saturno é um gigante gasoso composto principalmente de hidrogênio e hélio.',
    temperature: '≈ -139 °C',
    dayLength: '10,7 horas',
    yearLength: '29,5 anos terrestres',
  },
  uranus: {
    name: 'Urano',
    description:
      'Urano tem uma cor azul-esverdeada devido ao metano em sua atmosfera e gira de lado, quase deitado em seu eixo.',
    temperature: '≈ -195 °C',
    dayLength: '17 horas',
    yearLength: '84 anos terrestres',
  },
  neptune: {
    name: 'Netuno',
    description:
      'O planeta mais distante do Sol, com ventos supersônicos e uma coloração azul intensa.',
    temperature: '≈ -200 °C',
    dayLength: '16 horas',
    yearLength: '165 anos terrestres',
  },
};

export default function PlanetOverlay({ planet, onClose }) {
  if (!planet) return null;

  const info = planetInfo[planet.name.toLowerCase()];

  return (
    <AnimatePresence>
      <motion.div
        key={planet.name}
        className="absolute top-6 left-6 bg-black/70 backdrop-blur-md text-white rounded-2xl p-6 shadow-lg max-w-sm border border-white/20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-2">{info?.name || planet.name}</h2>
        <p className="text-sm text-gray-300 mb-3">{info?.description}</p>

        <div className="text-sm space-y-1">
          <p>
            🌡️ <strong>Temperatura média:</strong> {info?.temperature}
          </p>
          <p>
            🕒 <strong>Duração do dia:</strong> {info?.dayLength}
          </p>
          <p>
            🌞 <strong>Duração do ano:</strong> {info?.yearLength}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-lg text-sm"
        >
          Fechar
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

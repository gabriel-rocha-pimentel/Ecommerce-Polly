import React from 'react';
import { motion } from 'framer-motion';

const messages = [
  "Frete grátis para todo o Brasil!",
  "Novos descontos toda semana!",
  "Parcele suas compras em até 10x sem juros!",
  "Confira nossas ofertas exclusivas!"
];

const TopBar = () => {
  return (
    <div className="bg-polly-blue text-polly-white text-xs sm:text-sm py-2 overflow-hidden fixed top-0 left-0 right-0 z-[60] h-8 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25, 
            ease: 'linear',
          },
        }}
      >
        {messages.map((msg, i) => (
          <span key={i} className="px-8">
            {msg}
          </span>
        ))}
         {messages.map((msg, i) => (
          <span key={`duplicate-${i}`} className="px-8">
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TopBar;
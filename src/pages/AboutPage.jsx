
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Smile, Package } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-polly-gray-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          className="text-4xl font-bold text-polly-blue-dark mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre a Polly E-commerce
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img  
              className="rounded-lg shadow-soft w-full h-auto object-cover aspect-video" 
              alt="Equipe Polly E-commerce sorrindo"
             src="https://images.unsplash.com/photo-1637622124152-33adfabcc923" />
          </motion.div>
          <motion.div
            className="text-lg text-polly-gray-dark space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p>
              Somos a <strong className="text-polly-blue-dark">Polly E-commerce</strong>, uma empresa especializada em oferecer produtos de qualidade com agilidade e excelência no atendimento. Nosso objetivo é facilitar o dia a dia dos nossos clientes com praticidade e economia.
            </p>
            <p>
              Desde a nossa fundação, buscamos inovar e expandir nosso catálogo, sempre com foco na satisfação de quem confia em nossos serviços. Acreditamos que uma boa experiência de compra vai além do produto, envolvendo também um suporte atencioso e processos eficientes.
            </p>
            <p>
              Nossa equipe é apaixonada pelo que faz e está sempre pronta para ajudar você a encontrar exatamente o que precisa. Explore nosso site e descubra um mundo de possibilidades!
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 pt-12 border-t border-polly-blue-light/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-polly-blue-dark mb-8 text-center">Nossos Valores</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Package className="h-12 w-12 text-polly-blue-dark mx-auto mb-3" />, title: "Qualidade", text: "Produtos selecionados para garantir a melhor experiência." },
              { icon: <Smile className="h-12 w-12 text-polly-blue-dark mx-auto mb-3" />, title: "Atendimento", text: "Excelência e agilidade para resolver suas necessidades." },
              { icon: <Users className="h-12 w-12 text-polly-blue-dark mx-auto mb-3" />, title: "Comunidade", text: "Construindo relações de confiança com nossos clientes." },
            ].map((value, index) => (
              <motion.div 
                key={value.title} 
                className="bg-polly-white p-6 rounded-lg shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
              >
                {value.icon}
                <h3 className="text-xl font-semibold text-polly-blue-dark mb-2">{value.title}</h3>
                <p className="text-polly-gray-dark">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
  
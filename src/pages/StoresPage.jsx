
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const stores = [
  {
    name: 'Loja Fortaleza',
    address: 'Av. Exemplo, 123, Centro, Fortaleza - CE',
    phone: '(85) 3333-4444',
    email: 'fortaleza@polly.com',
  },
  {
    name: 'Loja São Paulo',
    address: 'Rua Comercial, 456, Jardins, São Paulo - SP',
    phone: '(11) 5555-6666',
    email: 'saopaulo@polly.com',
  },
  {
    name: 'Loja Rio de Janeiro',
    address: 'Praça da Orla, 789, Copacabana, Rio de Janeiro - RJ',
    phone: '(21) 7777-8888',
    email: 'rio@polly.com',
  },
];

const StoresPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-4xl font-bold text-polly-blue-dark mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nossas Lojas Físicas
      </motion.h1>

      <motion.div 
        className="mb-12 rounded-lg overflow-hidden shadow-soft"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img  
            className="w-full h-64 md:h-96 object-cover" 
            alt="Mapa com marcações fictícias de lojas"
           src="https://images.unsplash.com/photo-1518487346609-25352f3e0c8c" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store, index) => (
          <motion.div
            key={store.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            <Card className="h-full hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-polly-blue-dark text-2xl">{store.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-polly-blue-light mt-1 flex-shrink-0" />
                  <span className="text-polly-gray-dark">{store.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-polly-blue-light flex-shrink-0" />
                  <span className="text-polly-gray-dark">{store.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-polly-blue-light flex-shrink-0" />
                  <span className="text-polly-gray-dark">{store.email}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
  
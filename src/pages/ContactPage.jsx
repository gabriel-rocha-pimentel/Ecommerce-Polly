
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook, Linkedin, Send } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio
    console.log('Form data submitted:', formData);
    toast({
      title: 'Mensagem Enviada!',
      description: 'Obrigado por entrar em contato. Responderemos em breve.',
      duration: 5000,
    });
    setFormData({ name: '', email: '', message: '' }); // Limpar formulário
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        className="text-4xl font-bold text-polly-blue-dark mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Entre em Contato
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          className="bg-polly-white p-8 rounded-lg shadow-soft"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-polly-blue-dark mb-6">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-polly-gray-dark">Nome</Label>
              <Input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Seu nome completo" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-polly-gray-dark">E-mail</Label>
              <Input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="seuemail@exemplo.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message" className="text-polly-gray-dark">Mensagem</Label>
              <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Digite sua mensagem aqui..." required className="mt-1 min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full btn-primary py-3">
              <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
            </Button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="bg-polly-gray-light p-6 rounded-lg shadow-soft">
            <h3 className="text-xl font-semibold text-polly-blue-dark mb-4">Nossas Informações</h3>
            <div className="space-y-3 text-polly-gray-dark">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-polly-blue-light" />
                <span>WhatsApp: (11) 91234-5678</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-polly-blue-light" />
                <span>E-mail: contato@polly.com</span>
              </p>
            </div>
          </div>
          
          <div className="bg-polly-gray-light p-6 rounded-lg shadow-soft">
            <h3 className="text-xl font-semibold text-polly-blue-dark mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-polly-blue-dark hover:text-polly-blue-light transition-colors"><Instagram size={28} /></a>
              <a href="#" aria-label="Facebook" className="text-polly-blue-dark hover:text-polly-blue-light transition-colors"><Facebook size={28} /></a>
              <a href="#" aria-label="LinkedIn" className="text-polly-blue-dark hover:text-polly-blue-light transition-colors"><Linkedin size={28} /></a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
  
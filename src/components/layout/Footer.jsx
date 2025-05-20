import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, PackageSearch } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Footer = () => {
  const { companyName } = useAuth();
  return (
    <footer className="bg-polly-blue-dark text-polly-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PackageSearch className="h-8 w-8 text-polly-white" />
              <span className="font-bold text-2xl">{companyName}</span>
            </div>
            <p className="text-sm text-polly-gray-light">
              A melhor loja para suas necessidades. Qualidade e excelência no atendimento.
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Links Rápidos</p>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-polly-blue transition-colors">Home</Link></li>
              <li><Link to="/produtos" className="hover:text-polly-blue transition-colors">Produtos</Link></li>
              <li><Link to="/lojas" className="hover:text-polly-blue transition-colors">Nossas Lojas</Link></li>
              <li><Link to="/sobre" className="hover:text-polly-blue transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contato" className="hover:text-polly-blue transition-colors">Contato</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Redes Sociais</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-polly-white hover:text-polly-blue transition-colors"><Facebook size={24} /></a>
              <a href="#" aria-label="Instagram" className="text-polly-white hover:text-polly-blue transition-colors"><Instagram size={24} /></a>
              <a href="#" aria-label="Youtube" className="text-polly-white hover:text-polly-blue transition-colors"><Youtube size={24} /></a>
            </div>
            <p className="font-semibold text-lg mt-6 mb-2">Contato</p>
            <p className="text-sm text-polly-gray-light">Email: contato@{companyName.toLowerCase().replace(/\s+/g, '')}.com</p>
            <p className="text-sm text-polly-gray-light">WhatsApp: (11) 91234-5678</p>
          </div>
        </div>
        <div className="mt-12 border-t border-polly-blue/30 pt-8 text-center">
          <p className="text-sm text-polly-gray-light">&copy; {new Date().getFullYear()} {companyName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
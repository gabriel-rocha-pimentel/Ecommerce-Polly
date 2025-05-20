import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/lojas', label: 'Nossas Lojas' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contatos' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { companyName } = useAuth(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <nav className="bg-polly-white shadow-md sticky top-8 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <PackageSearch className="h-8 w-8 text-polly-blue" />
                <span className="font-bold text-xl sm:text-2xl text-polly-blue-dark">{companyName}</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-polly-blue text-polly-white'
                        : 'text-polly-text hover:bg-polly-gray-light hover:text-polly-blue-dark'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Link to="/carrinho" className="ml-6 relative text-polly-blue-dark hover:text-polly-blue transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
             <Link to="/carrinho" className="mr-4 relative text-polly-blue-dark hover:text-polly-blue transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Button onClick={toggleMenu} variant="ghost" size="icon" aria-label="Abrir menu" className="text-polly-blue-dark hover:text-polly-blue">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-polly-white shadow-lg absolute w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                      isActive
                        ? 'bg-polly-blue text-polly-white'
                        : 'text-polly-text hover:bg-polly-gray-light hover:text-polly-blue-dark'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
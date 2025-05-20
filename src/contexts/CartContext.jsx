import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem('pollyCart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart());
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('pollyCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast({
      title: "Produto Adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      duration: 3000,
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    const removedProduct = cartItems.find(item => item.id === productId);
    if (removedProduct) {
      toast({
        title: "Produto Removido",
        description: `${removedProduct.name} foi removido do carrinho.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Carrinho Limpo",
      description: "Todos os produtos foram removidos do carrinho.",
      duration: 3000,
    });
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.price).replace('R$', '').replace('.', '').replace(',', '.'));
    return total + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho Vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    // Lógica de checkout (simulada)
    toast({
      title: "Compra Finalizada!",
      description: "Obrigado por comprar na Polly E-commerce! (Simulação)",
      duration: 5000,
    });
    clearCart(); 
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
    return price; 
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-polly-bg">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-polly-blue-dark mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meu Carrinho
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div 
          className="text-center py-10 bg-polly-white p-8 rounded-lg shadow-soft"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="h-24 w-24 text-polly-gray-light mx-auto mb-4" />
          <p className="text-xl text-polly-gray-dark mb-6">Seu carrinho está vazio.</p>
          <Button asChild className="btn-primary">
            <Link to="/produtos">Continuar Comprando</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {cartItems.map(item => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-soft overflow-hidden bg-polly-white">
                <img  
                  className="w-24 h-24 object-cover rounded-md mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0" 
                  alt={item.imageAlt || item.name} 
                  src={item.images && item.images.length > 0 ? item.images[0] : "https://images.unsplash.com/photo-1523275335684-37898b6baf30"} 
                />
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/produto/${item.id}`}>
                    <h3 className="text-lg font-semibold text-polly-blue-dark hover:text-polly-blue transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-polly-gray-dark">{item.category}</p>
                  <p className="text-md font-medium text-polly-blue mt-1">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0 sm:ml-auto">
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 border-polly-blue/50 text-polly-blue hover:bg-polly-blue/10">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="h-8 w-12 text-center px-1 border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue"
                    min="1"
                  />
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 border-polly-blue/50 text-polly-blue hover:bg-polly-blue/10">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-500/10 h-8 w-8">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
             <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Button asChild variant="outline" className="btn-outline-primary w-full sm:w-auto">
                <Link to="/produtos"><ArrowLeft className="mr-2 h-4 w-4" /> Continuar Comprando</Link>
              </Button>
              <Button variant="destructive" onClick={clearCart} className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto">
                Limpar Carrinho
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 shadow-xl bg-polly-white">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-polly-blue-dark">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between text-polly-text">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'itens'})</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-polly-text">
                  <span>Frete</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
                <hr className="my-2 border-polly-gray-light" />
                <div className="flex justify-between text-xl font-bold text-polly-blue-dark">
                  <span>Total</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <Button className="w-full btn-primary mt-6 py-3 text-base" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
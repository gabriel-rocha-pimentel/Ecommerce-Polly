import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowDownUp, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import * as productService from '@/services/productService.js';
import { useToast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'Todos';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState('default');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await productService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        toast({ title: 'Erro ao carregar produtos', description: error.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [toast]);
  
  const priceToNumber = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (typeof priceStr === 'string') {
      return parseFloat(priceStr.replace('R$','').replace(/\./g,'').replace(',','.').trim());
    }
    return 0; 
  };

  const filteredAndSortedProducts = useMemo(() => {
    let prods = [...products].filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (categoryFilter !== 'Todos') {
      prods = prods.filter(p => p.category === categoryFilter);
    }
    
    if (sortOrder === 'price-asc') {
      prods.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    } else if (sortOrder === 'price-desc') {
      prods.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    } else if (sortOrder === 'name-asc') {
      prods.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      prods.sort((a, b) => b.name.localeCompare(a.name));
    }

    return prods;
  }, [products, searchTerm, categoryFilter, sortOrder]);

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando produtos...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-polly-bg">
      <motion.h1 
        className="text-4xl font-bold text-polly-blue-dark mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nossos Produtos
      </motion.h1>

      <motion.div 
        className="mb-8 p-6 bg-polly-white rounded-lg shadow-soft"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-polly-gray-dark" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-polly-gray-dark mb-1">Categoria</label>
            <div className="relative">
              <select 
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full h-10 rounded-md border border-polly-blue/50 bg-polly-white px-3 py-2 text-sm ring-offset-polly-bg focus:outline-none focus:ring-2 focus:ring-polly-blue"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-polly-gray-dark mb-1">Ordenar por</label>
            <div className="relative">
              <select 
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full h-10 rounded-md border border-polly-blue/50 bg-polly-white px-3 py-2 text-sm ring-offset-polly-bg focus:outline-none focus:ring-2 focus:ring-polly-blue"
              >
                <option value="default">Padrão</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="name-asc">Nome: A-Z</option>
                <option value="name-desc">Nome: Z-A</option>
              </select>
              <ArrowDownUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-polly-white">
                <Link to={`/produto/${product.id}`} className="block">
                  <div className="aspect-square w-full">
                    <img  
                      className="object-cover w-full h-full" 
                      alt={product.imageAlt || product.name}
                     src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80"} />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-polly-blue-dark truncate">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-polly-gray-dark h-10 overflow-hidden text-ellipsis">{product.description}</CardDescription>
                  </CardHeader>
                </Link>
                <CardContent className="p-4 flex-grow">
                  <p className="text-xl font-semibold text-polly-blue">
                     {typeof product.price === 'number' ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : product.price}
                  </p>
                </CardContent>
                <CardFooter className="p-4 mt-auto flex justify-end">
                  <Button 
                    className="w-full btn-primary" 
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p 
          className="text-center text-polly-gray-dark text-xl py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Nenhum produto encontrado com os critérios selecionados.
        </motion.p>
      )}
    </div>
  );
};

export default ProductsPage;
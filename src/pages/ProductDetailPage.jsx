import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import * as productService from '@/services/productService.js';
import { useToast } from '@/components/ui/use-toast';

const ProductCardSmall = ({ product, onBuy }) => (
    <Card className="w-60 md:w-64 flex-shrink-0 snap-start overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-polly-white">
      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-square w-full">
          <img  className="w-full h-full object-cover" alt={product.imageAlt || product.name} src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"} />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-md text-polly-blue-dark truncate">{product.name}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <p className="text-lg font-semibold text-polly-blue">
            {typeof product.price === 'number' ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : product.price}
        </p>
      </CardContent>
      <CardFooter className="p-4 mt-auto flex justify-end">
        <Button className="w-full btn-primary text-sm" onClick={() => onBuy(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
        </Button>
      </CardFooter>
    </Card>
  );

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await productService.getProductById(productId);
        setProduct(fetchedProduct);
        if (fetchedProduct) {
          const allProducts = await productService.getProducts();
          const related = allProducts
            .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        toast({ title: 'Erro ao carregar produto', description: error.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId, toast]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando produto...</p></div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-polly-gray-dark">Produto não encontrado</h1>
        <Link to="/produtos" className="mt-4 inline-block">
          <Button variant="outline" className="btn-outline-primary"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar aos produtos</Button>
        </Link>
      </div>
    );
  }
  
  const rating = product.rating || 4.5; 
  const reviews = product.reviews || (Math.floor(Math.random() * 200) + 10);
  const stock = product.stock !== undefined ? product.stock : (Math.floor(Math.random() * 50) + 1);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-polly-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/produtos" className="mb-6 inline-block">
          <Button variant="outline" className="btn-outline-primary text-polly-blue hover:bg-polly-blue/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar aos produtos
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div 
            className="aspect-square rounded-lg overflow-hidden shadow-xl bg-polly-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img  className="w-full h-full object-cover" alt={product.imageAlt || product.name} src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMGltYWdlfGVufDB8fDB8fHww&w=1000&q=80"} />
          </motion.div>

          <div className="flex flex-col h-full">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-polly-blue-dark mb-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {product.name}
            </motion.h1>
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(Math.floor(rating))].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                {rating % 1 !== 0 && <Star key="half" className="h-5 w-5 fill-current opacity-50" />} 
                {[...Array(5 - Math.ceil(rating))].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
              </div>
              <span className="text-sm text-polly-gray-dark">({reviews} avaliações)</span>
            </div>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-polly-blue mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {typeof product.price === 'number' ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : product.price}
            </motion.p>
            <motion.p 
              className="text-polly-text leading-relaxed mb-6 flex-grow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {product.description}
            </motion.p>
            <span className={`text-sm mb-4 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `${stock} em estoque` : 'Fora de estoque'}
            </span>
            <motion.div 
              className="mt-auto flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="w-full btn-primary py-3 text-base" 
                onClick={() => addToCart(product)}
                disabled={stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
              </Button>
            </motion.div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.section 
            className="mt-16 pt-12 border-t border-polly-gray-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-polly-blue-dark mb-8">Produtos Relacionados</h2>
            <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-polly-blue-dark scrollbar-track-polly-gray-light">
              {relatedProducts.map((relatedProd, index) => (
                <motion.div
                  key={relatedProd.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCardSmall product={relatedProd} onBuy={addToCart} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
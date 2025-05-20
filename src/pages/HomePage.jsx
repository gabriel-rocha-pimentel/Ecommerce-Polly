import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shirt, Watch, Headphones, Home as HomeIcon, Gift } from 'lucide-react'; // Renamed Home to HomeIcon
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const mainCategoryIcons = [
  { name: 'Eletrônicos', icon: <Zap className="h-8 w-8 text-polly-blue" />, link: '/produtos?category=Eletrônicos' },
  { name: 'Moda', icon: <Shirt className="h-8 w-8 text-polly-blue" />, link: '/produtos?category=Moda' },
  { name: 'Acessórios', icon: <Watch className="h-8 w-8 text-polly-blue" />, link: '/produtos?category=Acessórios' },
  { name: 'Casa', icon: <HomeIcon className="h-8 w-8 text-polly-blue" />, link: '/produtos?category=Casa e Decoração' },
];

const productCarouselsData = [
  {
    title: 'Eletrônicos em Destaque',
    category: 'Eletrônicos',
    cta: 'Ver Mais Eletrônicos',
    products: [
      { id: 1, name: 'Super Smartphone X2', price: 'R$ 3.299,00', imageAlt: 'Smartphone moderno com tela brilhante', description: 'Câmera de 108MP e processador ultra-rápido.', category: 'Eletrônicos' },
      { id: 2, name: 'Notebook Gamer Pro', price: 'R$ 7.899,00', imageAlt: 'Notebook gamer com teclado iluminado', description: 'Placa de vídeo dedicada e tela de 144Hz.', category: 'Eletrônicos' },
      { id: 3, name: 'Fone Bluetooth MaxSound', price: 'R$ 499,00', imageAlt: 'Fone de ouvido sem fio confortável', description: 'Cancelamento de ruído ativo e bateria de longa duração.', category: 'Eletrônicos' },
      { id: 4, name: 'Smartwatch Fit+', price: 'R$ 899,00', imageAlt: 'Smartwatch elegante com monitor de saúde', description: 'Monitoramento cardíaco e GPS integrado.', category: 'Eletrônicos' },
    ]
  },
  {
    title: 'Últimas Tendências da Moda',
    category: 'Moda',
    cta: 'Descubra a Coleção',
    products: [
      { id: 5, name: 'Jaqueta Jeans Premium', price: 'R$ 349,90', imageAlt: 'Jaqueta jeans estilosa', description: 'Design clássico com tecido de alta qualidade.', category: 'Moda' },
      { id: 6, name: 'Vestido Floral Verão', price: 'R$ 189,90', imageAlt: 'Vestido leve com estampa floral', description: 'Perfeito para dias quentes e ensolarados.', category: 'Moda' },
      { id: 7, name: 'Tênis Casual Urbano', price: 'R$ 279,00', imageAlt: 'Tênis branco confortável e moderno', description: 'Conforto e estilo para o seu dia a dia.', category: 'Moda' },
      { id: 8, name: 'Bolsa de Couro Clássica', price: 'R$ 459,00', imageAlt: 'Bolsa de couro preta elegante', description: 'Espaçosa e sofisticada para todas as ocasiões.', category: 'Moda' },
    ]
  },
  {
    title: 'Acessórios Incríveis',
    category: 'Acessórios',
    cta: 'Explorar Acessórios',
    products: [
      { id: 9, name: 'Relógio Cronógrafo Sport', price: 'R$ 1.299,00', imageAlt: 'Relógio esportivo com cronógrafo', description: 'Resistente à água e design arrojado.', category: 'Acessórios' },
      { id: 10, name: 'Óculos de Sol Aviador', price: 'R$ 299,00', imageAlt: 'Óculos de sol modelo aviador', description: 'Proteção UV400 e armação metálica.', category: 'Acessórios' },
      { id: 11, name: 'Cinto de Couro Genuíno', price: 'R$ 149,90', imageAlt: 'Cinto de couro marrom', description: 'Durabilidade e elegância para seu visual.', category: 'Acessórios' },
      { id: 12, name: 'Mochila Executiva Tech', price: 'R$ 399,00', imageAlt: 'Mochila preta com compartimento para notebook', description: 'Compartimento para notebook e design moderno.', category: 'Acessórios' },
    ]
  }
];

const promotionalBanners = [
  { title: 'Oferta Imperdível!', description: 'Descontos de até 50% em produtos selecionados. Não perca!', imageAlt: 'Banner promocional com produtos em oferta', cta: 'Conferir Ofertas', link: '/produtos?filter=ofertas' },
  { title: 'Novidades da Semana', description: 'Confira os lançamentos que acabaram de chegar na Polly E-commerce.', imageAlt: 'Banner com produtos recém-lançados', cta: 'Ver Novidades', link: '/produtos?filter=novidades' },
  { title: 'Frete Grátis Acima de R$199', description: 'Aproveite o frete grátis para todo o Brasil em compras acima de R$199.', imageAlt: 'Banner de frete grátis', cta: 'Comprar Agora', link: '/produtos' },
];

const ProductCard = ({ product, onBuy }) => (
  <Card className="w-64 md:w-72 flex-shrink-0 snap-start overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-polly-white">
    <Link to={`/produto/${product.id}`} className="block">
      <div className="aspect-square w-full">
        <img  className="w-full h-full object-cover" alt={product.imageAlt} src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-polly-blue-dark truncate">{product.name}</CardTitle>
        <CardDescription className="text-sm text-polly-gray-dark h-10 overflow-hidden">{product.description}</CardDescription>
      </CardHeader>
    </Link>
    <CardContent className="p-4 flex-grow">
      <p className="text-xl font-semibold text-polly-blue">{product.price}</p>
    </CardContent>
    <CardFooter className="p-4 mt-auto flex justify-end">
      <Button className="btn-primary" onClick={() => onBuy(product)}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
      </Button>
    </CardFooter>
  </Card>
);

const HomePage = () => {
  const { addToCart } = useCart();
  const { companyName } = useAuth();

  return (
    <div className="space-y-12 md:space-y-16 pb-16 bg-polly-bg">
      <motion.section 
        className="relative bg-gradient-to-r from-polly-blue to-polly-blue-dark text-polly-white py-20 md:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10">
          <img  className="w-full h-full object-cover" alt="Banner de compras vibrante" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bem-vindo à {companyName}
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A melhor loja para suas necessidades
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-3 rounded-lg hover:bg-polly-blue-dark/90 transition-colors">
              <Link to="/produtos">Ver Produtos</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {mainCategoryIcons.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <Link to={item.link} className="block group">
                <Card className="text-center bg-polly-white p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="mx-auto bg-polly-blue/20 p-4 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-polly-blue/30 transition-colors">
                    {React.cloneElement(item.icon, { className: "h-10 w-10 text-polly-blue group-hover:text-polly-blue-dark transition-colors"})}
                  </div>
                  <p className="mt-3 font-semibold text-polly-blue-dark group-hover:text-polly-blue transition-colors">{item.name}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {productCarouselsData.map((carousel, carouselIndex) => (
        <React.Fragment key={carousel.title}>
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-3xl font-bold text-polly-blue-dark mb-8">{carousel.title}</h2>
            <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-polly-blue-dark scrollbar-track-polly-gray-light">
              {carousel.products.map((product, productIndex) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                >
                  <ProductCard product={product} onBuy={addToCart} />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <Button asChild size="lg" className="btn-primary px-8 py-3 rounded-lg hover:bg-polly-blue-dark/90 transition-colors">
                <Link to={`/produtos?category=${carousel.category}`}>{carousel.cta}</Link>
              </Button>
            </div>
          </section>

          {promotionalBanners[carouselIndex] && (
            <motion.section 
              className="container mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-r from-polly-blue to-polly-blue-dark text-polly-white p-8 md:p-12 rounded-lg shadow-xl overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img  className="w-full h-full object-cover" alt={promotionalBanners[carouselIndex].imageAlt} src="https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
                </div>
                <div className="relative z-10 md:flex md:items-center md:justify-between">
                  <div className="md:w-2/3 mb-6 md:mb-0">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{promotionalBanners[carouselIndex].title}</h3>
                    <p className="text-base md:text-lg">{promotionalBanners[carouselIndex].description}</p>
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                    <Button asChild size="lg" className="bg-polly-white text-polly-blue hover:bg-polly-gray-light transition-colors px-6 py-3">
                      <Link to={promotionalBanners[carouselIndex].link}>{promotionalBanners[carouselIndex].cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </React.Fragment>
      ))}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-polly-gray-light rounded-lg">
        <h2 className="text-3xl font-bold text-center text-polly-blue-dark mb-12">Explore Mais Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Casa e Cozinha', icon: <HomeIcon className="h-12 w-12 text-polly-blue" />, description: "Tudo para deixar seu lar mais aconchegante e funcional.", link: "/produtos?category=Casa e Decoração" },
            { title: 'Áudio e Vídeo', icon: <Headphones className="h-12 w-12 text-polly-blue" />, description: "Qualidade de som e imagem para seu entretenimento.", link: "/produtos?category=Eletrônicos" },
            { title: 'Presentes Criativos', icon: <Gift className="h-12 w-12 text-polly-blue" />, description: "Surpreenda quem você ama com presentes únicos.", link: "/produtos?category=Presentes" },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link to={category.link}>
                <Card className="text-center bg-polly-white hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="flex-grow p-6">
                    <div className="mx-auto bg-polly-blue/20 p-4 rounded-full w-fit">
                      {category.icon}
                    </div>
                    <CardTitle className="text-polly-blue-dark mt-4">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-polly-gray-dark">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
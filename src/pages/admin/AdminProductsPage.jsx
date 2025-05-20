import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import * as productService from '@/services/productService.js';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (!admin || !admin.id) {
        toast({ title: 'Erro', description: 'Administrador não identificado.', variant: 'destructive' });
        setLoading(false);
        return;
      }
      try {
        const fetchedProducts = await productService.getProductsByAdminId(admin.id);
        setProducts(fetchedProducts);
      } catch (error) {
        toast({ title: 'Erro ao carregar produtos', description: error.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [admin, toast]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) return;
    try {
      await productService.deleteProduct(productId, admin.id);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast({ title: 'Produto Excluído!', description: 'O produto foi removido com sucesso.' });
    } catch (error) {
      toast({ title: 'Erro ao excluir produto', description: error.message, variant: 'destructive' });
    }
  };
  
  const formatPriceTable = (price) => {
    if (typeof price === 'number') {
      return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
    return price;
  };

  if (loading) {
    return <div className="text-center p-10 text-polly-text dark:text-polly-white">Carregando produtos...</div>;
  }

  return (
    <motion.div 
      className="space-y-8 text-polly-text dark:text-polly-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-polly-blue-dark dark:text-polly-blue">Gerenciar Produtos</h1>
        <Button asChild className="btn-primary">
          <Link to="/admin/produtos/novo"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="shadow-soft bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
          <CardHeader className="items-center text-center">
            <Package className="h-12 w-12 text-polly-gray-dark dark:text-polly-gray-light mb-2" />
            <CardTitle className="text-xl text-polly-blue-dark dark:text-polly-white">Nenhum produto cadastrado</CardTitle>
            <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">Comece adicionando seu primeiro produto!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="btn-primary">
              <Link to="/admin/produtos/novo"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Primeiro Produto</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-soft bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-polly-blue/50">
                <TableHead className="dark:text-polly-gray-light">Nome</TableHead>
                <TableHead className="dark:text-polly-gray-light">Categoria</TableHead>
                <TableHead className="dark:text-polly-gray-light">Preço</TableHead>
                <TableHead className="dark:text-polly-gray-light">Estoque</TableHead>
                <TableHead className="text-right dark:text-polly-gray-light">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="dark:border-polly-blue/40 hover:bg-polly-gray-light/30 dark:hover:bg-polly-blue/10">
                  <TableCell className="font-medium dark:text-polly-white">{product.name}</TableCell>
                  <TableCell className="dark:text-polly-gray-light">{product.category}</TableCell>
                  <TableCell className="dark:text-polly-gray-light">{formatPriceTable(product.price)}</TableCell>
                  <TableCell className="dark:text-polly-gray-light">{product.stock}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button asChild variant="outline" size="sm" className="border-polly-blue text-polly-blue hover:bg-polly-blue hover:text-white dark:border-polly-blue dark:text-polly-blue dark:hover:bg-polly-blue dark:hover:text-white">
                      <Link to={`/admin/produtos/editar/${product.id}`}><Edit className="h-4 w-4" /></Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </motion.div>
  );
};

export default AdminProductsPage;
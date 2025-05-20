import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Users, DollarSign, PlusCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import * as productService from '@/services/productService';
import { useAuth } from '@/contexts/AuthContext';

const StatCard = ({ title, value, icon, color, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="shadow-soft bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-polly-text dark:text-polly-gray-light">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 ${color} dark:opacity-80` })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-polly-blue-dark dark:text-polly-white">{value}</div>
        {description && <p className="text-xs text-polly-gray-dark dark:text-polly-gray-light">{description}</p>}
      </CardContent>
    </Card>
  </motion.div>
);

const AdminDashboardPage = () => {
  const { admin } = useAuth();
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const products = await productService.getProductsByAdminId(admin?.id);
        setTotalProducts(products.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      setLoading(false);
    };

    if (admin?.id) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [admin]);

  if (loading) {
    return <div className="text-center p-10 text-polly-text dark:text-polly-white">Carregando dashboard...</div>;
  }

  return (
    <div className="space-y-8 text-polly-text dark:text-polly-white">
      <motion.h1 
        className="text-3xl font-bold text-polly-blue-dark dark:text-polly-blue"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Dashboard Administrativo
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de Produtos" value={totalProducts} icon={<Package />} color="text-polly-blue" description="Produtos cadastrados por você" />
        <StatCard title="Vendas (Simulado)" value="R$ 12,345" icon={<DollarSign />} color="text-green-500" description="+5.2% este mês" />
        <StatCard title="Novos Usuários (Simulado)" value="89" icon={<Users />} color="text-orange-500" description="Registrados na última semana" />
        <StatCard title="Atividade Recente (Simulado)" value="3 Alertas" icon={<Activity />} color="text-red-500" description="Eventos importantes" />
      </div>

      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-soft bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
          <CardHeader>
            <CardTitle className="text-polly-blue-dark dark:text-polly-white">Ações Rápidas</CardTitle>
            <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">Acesse as funcionalidades principais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full btn-primary justify-start">
              <Link to="/admin/produtos/novo"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Produto</Link>
            </Button>
            <Button asChild variant="outline" className="w-full btn-outline-primary justify-start dark:text-polly-blue dark:border-polly-blue dark:hover:bg-polly-blue/20 dark:hover:text-polly-white">
              <Link to="/admin/produtos"><Package className="mr-2 h-4 w-4" /> Gerenciar Produtos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
          <CardHeader>
            <CardTitle className="text-polly-blue-dark dark:text-polly-white">Visão Geral (Simulado)</CardTitle>
            <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">Gráfico de desempenho da loja.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-polly-gray-light dark:bg-polly-text/30 rounded-md flex items-center justify-center">
              <p className="text-polly-gray-dark dark:text-polly-gray-light">Simulação de Gráfico de Vendas</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
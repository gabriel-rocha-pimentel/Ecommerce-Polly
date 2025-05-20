import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, PackageSearch } from 'lucide-react';

const AdminSignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyNameState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await signup(name, email, password, companyName);
    setIsLoading(false);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-polly-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-xl bg-polly-white">
          <CardHeader className="text-center">
            <PackageSearch className="mx-auto h-12 w-12 text-polly-blue" />
            <CardTitle className="text-3xl font-bold text-polly-blue-dark mt-2">Criar Conta Admin</CardTitle>
            <CardDescription className="text-polly-gray-dark">
              Registre-se para gerenciar a Polly E-commerce.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" type="text" placeholder="Seu Nome" value={name} onChange={(e) => setName(e.target.value)} required 
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue" />
              </div>
               <div>
                <Label htmlFor="companyName">Nome da Empresa (Opcional)</Label>
                <Input id="companyName" type="text" placeholder="Nome da Sua Loja" value={companyName} onChange={(e) => setCompanyNameState(e.target.value)} 
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required 
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue" />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required 
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue" />
              </div>
              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : <><UserPlus className="mr-2 h-4 w-4" /> Criar Conta</>}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-polly-gray-dark">
              Já tem uma conta?{' '}
              <Link to="/admin/login" className="font-medium text-polly-blue hover:underline">
                Faça login
              </Link>
            </p>
             <Link to="/" className="text-sm text-polly-blue hover:underline">
              Voltar para a loja
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminSignupPage;
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, PackageSearch } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      navigate(from, { replace: true });
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
            <CardTitle className="text-3xl font-bold text-polly-blue-dark mt-2">Admin Login</CardTitle>
            <CardDescription className="text-polly-gray-dark">
              Acesse o painel de administração da Polly E-commerce.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-polly-blue/50 focus:border-polly-blue focus:ring-polly-blue"
                />
              </div>
              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? 'Entrando...' : <><LogIn className="mr-2 h-4 w-4" /> Entrar</>}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-polly-gray-dark">
              Não tem uma conta?{' '}
              <Link to="/admin/signup" className="font-medium text-polly-blue hover:underline">
                Cadastre-se
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

export default AdminLoginPage;
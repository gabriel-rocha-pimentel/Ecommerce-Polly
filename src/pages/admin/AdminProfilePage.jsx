import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { User, Save, ShieldAlert, Trash2, Building, Mail, KeyRound } from 'lucide-react';

const AdminProfilePage = () => {
  const { admin, updateProfile, deleteAccount, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData(prev => ({
        ...prev,
        name: admin.name || '',
        email: admin.email || '',
        companyName: admin.companyName || '',
      }));
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      toast({ title: 'Erro de Senha', description: 'As novas senhas não coincidem.', variant: 'destructive' });
      setIsLoading(false);
      return;
    }
    
    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      companyName: formData.companyName,
    };

    if (formData.newPassword && formData.currentPassword) {
      dataToUpdate.currentPassword = formData.currentPassword; 
      dataToUpdate.newPassword = formData.newPassword;
    } else if (formData.newPassword && !formData.currentPassword) {
        toast({ title: 'Erro de Senha', description: 'Por favor, insira sua senha atual para definir uma nova.', variant: 'destructive' });
        setIsLoading(false);
        return;
    }


    const success = await updateProfile(dataToUpdate);
    if (success) {
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmNewPassword: '' }));
    }
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados e produtos associados serão removidos.')) {
      return;
    }
    setIsLoading(true);
    await deleteAccount();
    setIsLoading(false);
  };

  if (authLoading && !admin) {
    return <div className="text-center p-10 text-polly-text dark:text-polly-white">Carregando perfil...</div>;
  }

  if (!admin) {
    navigate('/admin/login');
    return null;
  }

  return (
    <motion.div 
      className="space-y-8 text-polly-text dark:text-polly-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-polly-blue-dark dark:text-polly-blue">Meu Perfil</h1>

      <Card className="shadow-xl bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-polly-blue-dark dark:text-polly-blue">
            <User className="mr-2 h-5 w-5" /> Informações Pessoais
          </CardTitle>
          <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">
            Atualize suas informações pessoais e de login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark dark:text-polly-gray-light" />
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required 
                         className="pl-10 dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email de Login</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark dark:text-polly-gray-light" />
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required 
                         className="pl-10 dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark dark:text-polly-gray-light" />
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} 
                        className="pl-10 dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
            </div>

            <hr className="my-4 border-polly-gray-light dark:border-polly-blue/30" />
            
            <h3 className="text-lg font-semibold text-polly-blue-dark dark:text-polly-blue flex items-center">
              <KeyRound className="mr-2 h-5 w-5" /> Alterar Senha (Opcional)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} 
                       className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} 
                       className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={formData.confirmNewPassword} onChange={handleChange} 
                       className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
            </div>
            <CardFooter className="p-0 pt-6 flex justify-end">
              <Button type="submit" className="btn-primary" disabled={isLoading || authLoading}>
                <Save className="mr-2 h-4 w-4" /> {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30 border-red-500/50 dark:border-red-500/70">
        <CardHeader>
          <CardTitle className="text-xl flex items-center text-red-600 dark:text-red-500">
            <ShieldAlert className="mr-2 h-5 w-5" /> Zona de Perigo
          </CardTitle>
          <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">
            Ações irreversíveis. Tenha cuidado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-red-500/10 dark:bg-red-500/20 rounded-md">
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">Excluir Conta Permanentemente</p>
              <p className="text-sm text-red-600 dark:text-red-300">
                Todos os seus dados, incluindo produtos cadastrados, serão removidos.
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount} 
              disabled={isLoading || authLoading}
              className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" /> {isLoading ? 'Excluindo...' : 'Excluir Minha Conta'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProfilePage;
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '@/services/authService.js';
import * as productService from '@/services/productService.js';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("Polly E-commerce");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setAdmin(currentUser);
          setCompanyName(currentUser.companyName || "Polly E-commerce");
          localStorage.setItem('adminToken', currentUser.token); 
          localStorage.setItem('adminUser', JSON.stringify(currentUser));
          localStorage.setItem('companyName', currentUser.companyName || "Polly E-commerce");
        } else {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('companyName');
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('companyName');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        if (session?.user) {
          const currentUserDetails = await authService.getCurrentUser();
          if(currentUserDetails) {
            setAdmin(currentUserDetails);
            setCompanyName(currentUserDetails.companyName || "Polly E-commerce");
            localStorage.setItem('adminToken', session.access_token);
            localStorage.setItem('adminUser', JSON.stringify(currentUserDetails));
            localStorage.setItem('companyName', currentUserDetails.companyName || "Polly E-commerce");
          } else {
             setAdmin(null);
             localStorage.removeItem('adminToken');
             localStorage.removeItem('adminUser');
             localStorage.removeItem('companyName');
          }
        } else {
          setAdmin(null);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('companyName');
        }
        setLoading(false);
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.loginAdmin(email, password);
      setAdmin(response.user);
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
      if (response.user.companyName) {
        setCompanyName(response.user.companyName);
        localStorage.setItem('companyName', response.user.companyName);
      }
      toast({ title: 'Login bem-sucedido!', description: `Bem-vindo, ${response.user.name}!` });
      navigate('/admin/dashboard');
      return true;
    } catch (error) {
      toast({ title: 'Erro no Login', description: error.message, variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, companyNameValue) => {
    setLoading(true);
    try {
      // Check if an admin already exists
      const { data: profilesCount, error: countError } = await supabase.rpc('count_profiles');

      if (countError) {
        console.error('Error checking admin count:', countError);
        throw new Error('Não foi possível verificar o status do administrador. Tente novamente.');
      }

      if (profilesCount > 0) {
        throw new Error('Já existe um usuário administrador registrado. Não é possível criar outra conta de administrador.');
      }

      const response = await authService.registerAdmin(name, email, password, companyNameValue);
      setAdmin(response.user);
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
      const currentCompanyName = companyNameValue || "Polly E-commerce";
      setCompanyName(currentCompanyName);
      localStorage.setItem('companyName', currentCompanyName);
      toast({ title: 'Cadastro realizado com sucesso!', description: `Bem-vindo, ${response.user.name}!` });
      navigate('/admin/dashboard');
      return true;
    } catch (error) {
      toast({ title: 'Erro no Cadastro', description: error.message, variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logoutAdmin();
      setAdmin(null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('companyName');
      toast({ title: 'Logout realizado', description: 'Até logo!' });
      navigate('/admin/login');
    } catch (error) {
      toast({ title: 'Erro no Logout', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  
  const updateProfile = async (updatedData) => {
    if (!admin) return false;
    setLoading(true);
    try {
      const response = await authService.updateAdminProfile(admin.id, updatedData);
      setAdmin(response.user);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
      if (response.user.companyName) {
        setCompanyName(response.user.companyName);
        localStorage.setItem('companyName', response.user.companyName);
      }
      toast({ title: 'Perfil Atualizado!', description: 'Suas informações foram salvas.' });
      return true;
    } catch (error) {
      toast({ title: 'Erro ao Atualizar Perfil', description: error.message, variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!admin) return false;
    setLoading(true);
    try {
      await productService.deleteProductsByAdminId(admin.id);
      await authService.deleteAdminAccount(admin.id); 
      const { error: signOutError } = await supabase.auth.signOut(); 
      if (signOutError) {
          console.error("Error during sign out after account deletion:", signOutError);
      }
      setAdmin(null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('companyName');
      setCompanyName("Polly E-commerce"); 
      toast({ title: 'Conta Excluída', description: 'Sua conta e produtos foram removidos.' });
      navigate('/admin/login');
      return true;
    } catch (error) {
      toast({ title: 'Erro ao Excluir Conta', description: error.message, variant: 'destructive' });
      return false;
    } finally {
      setLoading(false);
    }
  };


  const value = {
    admin,
    isAuthenticated: !!admin,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    deleteAccount,
    companyName,
    setCompanyName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
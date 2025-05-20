import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import AdminLayout from '@/components/admin/AdminLayout';

import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import StoresPage from '@/pages/StoresPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import CartPage from '@/pages/CartPage';

import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminSignupPage from '@/pages/admin/AdminSignupPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminNewProductPage from '@/pages/admin/AdminNewProductPage';
import AdminEditProductPage from '@/pages/admin/AdminEditProductPage';
import AdminProfilePage from '@/pages/admin/AdminProfilePage';

import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

function PageWrapper({ children, isAdminPage = false }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={isAdminPage ? "" : "pt-8"} 
    >
      {children}
    </motion.div>
  );
}

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Carregando...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-polly-bg">
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/produtos" element={<PageWrapper><ProductsPage /></PageWrapper>} />
          <Route path="/produto/:productId" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
          <Route path="/lojas" element={<PageWrapper><StoresPage /></PageWrapper>} />
          <Route path="/sobre" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contato" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/carrinho" element={<PageWrapper><CartPage /></PageWrapper>} />
        </Route>

        <Route path="/admin/login" element={<PageWrapper isAdminPage><AdminLoginPage /></PageWrapper>} />
        <Route path="/admin/signup" element={<PageWrapper isAdminPage><AdminSignupPage /></PageWrapper>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<PageWrapper isAdminPage><AdminDashboardPage /></PageWrapper>} />
            <Route path="produtos" element={<PageWrapper isAdminPage><AdminProductsPage /></PageWrapper>} />
            <Route path="produtos/novo" element={<PageWrapper isAdminPage><AdminNewProductPage /></PageWrapper>} />
            <Route path="produtos/editar/:productId" element={<PageWrapper isAdminPage><AdminEditProductPage /></PageWrapper>} />
            <Route path="perfil" element={<PageWrapper isAdminPage><AdminProfilePage /></PageWrapper>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AnimatedRoutes />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, User, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const adminNavLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/produtos/novo', label: 'Novo Produto', icon: PlusCircle },
  { to: '/admin/perfil', label: 'Perfil', icon: User },
];

const AdminSidebar = () => {
  const { admin, logout, companyName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-polly-blue-dark text-polly-white flex flex-col fixed top-0 left-0 h-full z-40 pt-8"> {/* pt-8 for TopBar */}
      <div className="p-6 border-b border-polly-blue/50">
        <NavLink to="/admin/dashboard" className="flex items-center space-x-3">
          <ShoppingBag className="h-8 w-8 text-polly-white" />
          <span className="text-xl font-semibold">{companyName} Admin</span>
        </NavLink>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin/dashboard' || link.to === '/admin/produtos'}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-polly-blue/80',
                isActive ? 'bg-polly-blue text-white' : 'text-polly-gray-light hover:text-white'
              )
            }
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-polly-blue/50">
        {admin && (
          <div className="mb-4 text-center">
            <p className="text-sm font-medium">{admin.name}</p>
            <p className="text-xs text-polly-gray-light">{admin.email}</p>
          </div>
        )}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-polly-gray-light hover:bg-polly-blue/80 hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
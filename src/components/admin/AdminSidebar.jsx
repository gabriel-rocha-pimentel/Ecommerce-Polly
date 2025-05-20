import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, User, LogOut, ShoppingBag, FolderTree, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const adminNavLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/produtos/novo', label: 'Novo Produto', icon: PlusCircle },
  // Example for categories page if added later
  // { to: '/admin/categorias', label: 'Categorias', icon: FolderTree },
  { to: '/admin/perfil', label: 'Perfil', icon: User },
];

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { admin, logout, companyName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleLinkClick = () => {
    if (isOpen && window.innerWidth < 768) { // 768px is md breakpoint
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside 
        className={cn(
          "bg-polly-blue-dark text-polly-white flex flex-col fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out",
          "w-64", // Default width
          isOpen ? "translate-x-0" : "-translate-x-full", // Mobile slide in/out
          "md:translate-x-0 md:pt-0" // Desktop always visible, no top padding adjustment needed if TopBar removed from admin
        )}
      >
        <div className="p-6 border-b border-polly-blue/50 flex justify-between items-center">
          <NavLink to="/admin/dashboard" className="flex items-center space-x-3" onClick={handleLinkClick}>
            <ShoppingBag className="h-8 w-8 text-polly-white" />
            <span className="text-xl font-semibold">{companyName || 'Admin'}</span>
          </NavLink>
          <Button variant="ghost" size="icon" className="md:hidden text-polly-white" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {adminNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin/dashboard' || link.to === '/admin/produtos'}
              onClick={handleLinkClick}
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
    </>
  );
};

export default AdminSidebar;
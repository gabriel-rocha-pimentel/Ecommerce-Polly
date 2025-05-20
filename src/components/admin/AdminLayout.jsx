import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-polly-bg dark:bg-polly-text">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Header with Hamburger Menu */}
        <div className="md:hidden p-4 bg-polly-blue-dark text-polly-white flex justify-between items-center sticky top-0 z-30">
          <span className="text-lg font-semibold">Admin Panel</span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Main Content Area */}
        <div className="p-4 sm:p-6 md:p-10 flex-grow mt-8 md:mt-0 md:ml-64"> {/* Adjust ml-64 for sidebar width */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
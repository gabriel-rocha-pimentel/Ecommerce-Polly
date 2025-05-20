import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-polly-bg dark:bg-polly-text">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto mt-8 md:mt-0"> {/* Added mt for TopBar */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="p-4 sm:ml-64">
        <main className="pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;


import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 md:ml-60">
        <Header toggleSidebar={toggleSidebar} goBack={goBack} />
        <main className="flex-1 py-6 px-4 sm:px-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen h-full">
      <Header goBack={goBack} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

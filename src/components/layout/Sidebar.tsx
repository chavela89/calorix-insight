
import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  Heart,
  Home,
  Settings,
  Trophy,
  User2,
  Apple,
  Activity,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

function SidebarNavItem({ icon, label, to, isActive }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="text-primary"
          >
            <path 
              d="M20 10V14C20 18.4183 16.4183 22 12 22C7.58172 22 4 18.4183 4 14V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M16 11H8M12 15V7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          <h1 className="text-xl font-semibold tracking-tight">
            CaloriX
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="flex flex-col gap-1">
          <SidebarNavItem icon={<Home className="h-5 w-5" />} label="Главная" to="/" />
          <SidebarNavItem icon={<Apple className="h-5 w-5" />} label="Питание" to="/nutrition" />
          <SidebarNavItem icon={<Activity className="h-5 w-5" />} label="Прогресс" to="/progress" />
          <SidebarNavItem icon={<BarChart2 className="h-5 w-5" />} label="Статистика" to="/statistics" />
          <SidebarNavItem icon={<Calendar className="h-5 w-5" />} label="Планирование" to="/planner" />
          <SidebarNavItem icon={<Lightbulb className="h-5 w-5" />} label="AI Рекомендации" to="/recommendations" />
          <SidebarNavItem icon={<Trophy className="h-5 w-5" />} label="Достижения" to="/achievements" />
        </nav>
        <Separator className="my-4" />
        <div className="rounded-lg bg-muted p-4 my-4">
          <h4 className="font-medium mb-2">Улучшите свой опыт</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Откройте полный доступ ко всем функциям приложения с премиум-подпиской.
          </p>
          <Button className="w-full">Активировать премиум</Button>
        </div>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-1">
          <SidebarNavItem icon={<User2 className="h-5 w-5" />} label="Профиль" to="/profile" />
          <SidebarNavItem icon={<Heart className="h-5 w-5" />} label="Здоровье" to="/health" />
          <SidebarNavItem icon={<Settings className="h-5 w-5" />} label="Настройки" to="/settings" />
        </nav>
      </ScrollArea>
      <div className="flex flex-col p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <User2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">Александр</p>
            <p className="text-xs text-muted-foreground">Бесплатный план</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

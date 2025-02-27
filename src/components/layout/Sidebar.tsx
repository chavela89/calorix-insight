
import React from "react";
import { NavLink, Link } from "react-router-dom";
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
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
    <>
      {/* Overlay для мобильных устройств */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Боковая панель */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-[280px] flex-col bg-background border-r transition-transform duration-300 ease-in-out",
          "shadow-lg md:shadow-none", // Тень только для мобильной версии
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0 md:w-64" // На десктопе всегда видима и меньшей ширины
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Apple className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CaloriX</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Закрыть меню</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="space-y-0.5 px-2">
            <SidebarNavItem
              to="/"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
            />
            <SidebarNavItem
              to="/nutrition"
              icon={<Apple className="h-5 w-5" />}
              label="Nutrition"
            />
            <SidebarNavItem
              to="/progress"
              icon={<Activity className="h-5 w-5" />}
              label="Progress"
            />
            <SidebarNavItem
              to="/statistics"
              icon={<BarChart2 className="h-5 w-5" />}
              label="Statistics"
            />
            <SidebarNavItem
              to="/planner"
              icon={<Calendar className="h-5 w-5" />}
              label="Meal Planner"
            />
            <SidebarNavItem
              to="/recommendations"
              icon={<Lightbulb className="h-5 w-5" />}
              label="Recommendations"
            />
            <SidebarNavItem
              to="/achievements"
              icon={<Trophy className="h-5 w-5" />}
              label="Achievements"
            />
            <SidebarNavItem
              to="/health"
              icon={<Heart className="h-5 w-5" />}
              label="Health"
            />
          </nav>
          <Separator className="my-2" />
          <nav className="space-y-0.5 px-2">
            <SidebarNavItem
              to="/profile"
              icon={<User2 className="h-5 w-5" />}
              label="My Profile"
            />
            <SidebarNavItem
              to="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
            />
          </nav>
        </ScrollArea>
      </div>
    </>
  );
}

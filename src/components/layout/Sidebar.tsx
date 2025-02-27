
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
            ? "bg-
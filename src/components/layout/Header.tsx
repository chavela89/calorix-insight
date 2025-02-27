
import React from "react";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Меню</span>
          </Button>
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
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0 text-[10px]">
                  3
                </Badge>
                <span className="sr-only">Уведомления</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-4 bg-background border border-border">
              <h4 className="font-medium text-base mb-2">Уведомления</h4>
              <DropdownMenuSeparator />
              <div className="py-2 space-y-3">
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">Внесите приемы пищи</h5>
                    <span className="text-xs text-muted-foreground">Сегодня</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Вы еще не добавили обед. Внесите данные, чтобы отслеживать прогресс.
                  </p>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">Поздравляем!</h5>
                    <span className="text-xs text-muted-foreground">Вчера</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Вы достигли своей цели по белку 7 дней подряд!
                  </p>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">Новая функция</h5>
                    <span className="text-xs text-muted-foreground">2 дня назад</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Попробуйте новую функцию анализа приемов пищи с помощью AI.
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="my-2" />
              <Button variant="ghost" size="sm" className="w-full justify-center">
                Показать все
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Профиль</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
              <div className="flex flex-col items-center py-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-base">Александр</h4>
                <p className="text-sm text-muted-foreground">Бесплатный план</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Мой профиль
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Настройки
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Подписка
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

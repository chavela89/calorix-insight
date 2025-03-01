
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User2, BellIcon, ArrowLeft, Apple, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = ({ goBack }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Внесите приемы пищи",
      description: "Вы еще не добавили обед. Внесите данные, чтобы отслеживать прогресс.",
      date: "Сегодня"
    },
    {
      id: 2,
      title: "Поздравляем!",
      description: "Вы достигли своей цели по белку 7 дней подряд!",
      date: "Вчера"
    },
    {
      id: 3,
      title: "Новая функция",
      description: "Попробуйте новую функцию анализа приемов пищи с помощью AI.",
      date: "2 дня назад"
    }
  ]);

  const [themes] = useState([
    { id: 'light', name: 'Светлая' },
    { id: 'dark', name: 'Темная' },
    { id: 'system', name: 'Системная' }
  ]);

  const handleShowAllNotifications = () => {
    toast.info("Все уведомления", {
      description: "Открыта страница всех уведомлений"
    });
  };

  const handleThemeChange = (theme) => {
    toast.success(`Тема изменена: ${theme}`, {
      description: `Установлена ${theme} тема`
    });
  };

  const handleProfileOption = (option) => {
    if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'settings') {
      navigate('/settings');
    } else if (option === 'subscription') {
      toast.info("Подписка", {
        description: "Переход к странице подписки"
      });
    } else if (option === 'logout') {
      toast.info("Выход из аккаунта", {
        description: "Вы успешно вышли из своего аккаунта"
      });
    }
  };

  return (
    <header className="border-b flex justify-between items-center h-14 px-4 sticky top-0 bg-background z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">CaloriX</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 px-4 cursor-pointer">
                <div className="flex justify-between w-full">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center" onClick={handleShowAllNotifications}>
              Показать все
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Тема оформления</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map(theme => (
              <DropdownMenuItem key={theme.id} onClick={() => handleThemeChange(theme.name)}>
                {theme.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col items-center p-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <User2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">Александр</p>
              <p className="text-sm text-muted-foreground">Бесплатный план</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileOption('profile')}>
              Мой профиль
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileOption('settings')}>
              Настройки
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileOption('subscription')}>
              Подписка
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileOption('logout')} className="text-destructive">
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

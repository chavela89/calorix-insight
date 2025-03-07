
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User2, BellIcon, ArrowLeft, Apple, Palette, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useTheme } from "@/context/ThemeContext";
import { ThemeType } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const Header = ({ goBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, language } = useLanguage();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: language === 'ru' ? "Внесите приемы пищи" : 
             language === 'es' ? "Registre sus comidas" :
             "Log your meals",
      description: language === 'ru' ? "Вы еще не добавили обед. Внесите данные, чтобы отслеживать прогресс." : 
                   language === 'es' ? "Aún no ha añadido el almuerzo. Introduzca datos para seguir su progreso." :
                   "You haven't added lunch yet. Enter data to track your progress.",
      date: language === 'ru' ? "Сегодня" : 
            language === 'es' ? "Hoy" :
            "Today"
    },
    {
      id: 2,
      title: language === 'ru' ? "Поздравляем!" : 
             language === 'es' ? "¡Felicitaciones!" :
             "Congratulations!",
      description: language === 'ru' ? "Вы достигли своей цели по белку 7 дней подряд!" : 
                   language === 'es' ? "¡Ha alcanzado su objetivo de proteínas durante 7 días consecutivos!" :
                   "You've reached your protein goal 7 days in a row!",
      date: language === 'ru' ? "Вчера" : 
            language === 'es' ? "Ayer" :
            "Yesterday"
    },
    {
      id: 3,
      title: language === 'ru' ? "Новая функция" : 
             language === 'es' ? "Nueva función" :
             "New feature",
      description: language === 'ru' ? "Попробуйте новую функцию анализа приемов пищи с помощью AI." : 
                   language === 'es' ? "Pruebe la nueva función de análisis de comidas con IA." :
                   "Try the new meal analysis function using AI.",
      date: language === 'ru' ? "2 дня назад" : 
            language === 'es' ? "Hace 2 días" :
            "2 days ago"
    }
  ]);

  const [themes] = useState<{id: ThemeType, name: string}[]>([
    { id: 'light', name: language === 'ru' ? 'Светлая' : language === 'es' ? 'Claro' : 'Light' },
    { id: 'dark', name: language === 'ru' ? 'Темная' : language === 'es' ? 'Oscuro' : 'Dark' },
    { id: 'creamy', name: language === 'ru' ? 'Сливочная' : language === 'es' ? 'Crema' : 'Creamy' },
    { id: 'blue-gray', name: language === 'ru' ? 'Сине-серая' : language === 'es' ? 'Azul-gris' : 'Blue-gray' },
    { id: 'green', name: language === 'ru' ? 'Зеленая' : language === 'es' ? 'Verde' : 'Green' },
    { id: 'coral', name: language === 'ru' ? 'Коралловая' : language === 'es' ? 'Coral' : 'Coral' },
    { id: 'purple', name: language === 'ru' ? 'Фиолетовая' : language === 'es' ? 'Morado' : 'Purple' },
    { id: 'blue', name: language === 'ru' ? 'Синяя' : language === 'es' ? 'Azul' : 'Blue' },
    { id: 'yellow', name: language === 'ru' ? 'Желтая' : language === 'es' ? 'Amarillo' : 'Yellow' },
    { id: 'system', name: language === 'ru' ? 'Системная' : language === 'es' ? 'Sistema' : 'System' }
  ]);

  const handleShowAllNotifications = () => {
    toast.info(language === 'ru' ? "Все уведомления" : 
              language === 'es' ? "Todas las notificaciones" : 
              "All notifications", {
      description: language === 'ru' ? "Открыта страница всех уведомлений" : 
                  language === 'es' ? "Página de todas las notificaciones abierta" :
                  "All notifications page opened"
    });
  };

  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
    const themeName = themes.find(t => t.id === themeId)?.name || themeId;
    toast.success(language === 'ru' ? `Тема изменена: ${themeName}` : 
                language === 'es' ? `Tema cambiado: ${themeName}` : 
                `Theme changed: ${themeName}`, {
      description: language === 'ru' ? `Установлена ${themeName} тема` : 
                  language === 'es' ? `Tema ${themeName} establecido` :
                  `${themeName} theme set`
    });
  };

  const handleProfileOption = (option) => {
    if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'settings') {
      navigate('/settings');
    } else if (option === 'subscription') {
      toast.info(language === 'ru' ? "Подписка" : 
                language === 'es' ? "Suscripción" : 
                "Subscription", {
        description: language === 'ru' ? "Переход к странице подписки" : 
                    language === 'es' ? "Navegando a la página de suscripción" :
                    "Navigating to subscription page"
      });
    } else if (option === 'logout') {
      toast.info(language === 'ru' ? "Выход из аккаунта" : 
                language === 'es' ? "Cierre de sesión" : 
                "Logged out", {
        description: language === 'ru' ? "Вы успешно вышли из своего аккаунта" : 
                    language === 'es' ? "Ha cerrado sesión exitosamente" :
                    "You have successfully logged out of your account"
      });
    }
  };
  
  // Handle back button to go to home when on main routes
  const handleBackNavigation = () => {
    if (location.pathname === '/' || 
        location.pathname === '/nutrition' || 
        location.pathname === '/progress' ||
        location.pathname === '/statistics' ||
        location.pathname === '/planner' ||
        location.pathname === '/recommendations' ||
        location.pathname === '/achievements' ||
        location.pathname === '/health' ||
        location.pathname === '/profile' ||
        location.pathname === '/settings' ||
        location.pathname === '/recipe-calculator') {
      navigate('/');
    } else {
      goBack();
    }
  };

  return (
    <header className="border-b flex justify-between items-center h-14 px-4 sticky top-0 bg-background z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBackNavigation} className="mr-2" title={t.home}>
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
            <DropdownMenuLabel>{t.notifications}</DropdownMenuLabel>
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
              {language === 'ru' ? "Показать все" : language === 'es' ? "Mostrar todo" : "Show all"}
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
            <DropdownMenuLabel>{language === 'ru' ? "Тема оформления" : language === 'es' ? "Tema" : "Theme"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map(themeOption => (
              <DropdownMenuItem 
                key={themeOption.id} 
                onClick={() => handleThemeChange(themeOption.id)}
                className={theme === themeOption.id ? "bg-muted" : ""}
              >
                {themeOption.name} {theme === themeOption.id && "✓"}
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
              <p className="font-medium">{language === 'ru' ? "Александр" : language === 'es' ? "Alejandro" : "Alexander"}</p>
              <p className="text-sm text-muted-foreground">{t.freePlan}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileOption('profile')}>
              {t.myProfile}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileOption('settings')}>
              {t.settings}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileOption('subscription')}>
              {t.subscription}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileOption('logout')} className="text-destructive">
              {t.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => document.dispatchEvent(new Event('toggle-sidebar'))}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

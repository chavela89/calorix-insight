import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, CreditCard, Smartphone, Monitor, Globe, LogOut, HelpCircle, Languages, ChevronRight, Apple } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

// Language and region data
const languagesData = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "jv", name: "Basa Jawa", flag: "🇮🇩" },
  { code: "kk", name: "Қазақ", flag: "🇰🇿" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "be", name: "Беларуская", flag: "🇧🇾" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
  { code: "hy", name: "Հայերեն", flag: "🇦🇲" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ky", name: "Кыргызча", flag: "🇰🇬" },
  { code: "tk", name: "Türkmençe", flag: "🇹🇲" },
];

const regionsData = [
  { code: "ru", name: "Россия", currency: "RUB", symbol: "₽" },
  { code: "us", name: "United States", currency: "USD", symbol: "$" },
  { code: "eu", name: "European Union", currency: "EUR", symbol: "€" },
  { code: "gb", name: "United Kingdom", currency: "GBP", symbol: "£" },
  { code: "ca", name: "Canada", currency: "CAD", symbol: "CA$" },
  { code: "au", name: "Australia", currency: "AUD", symbol: "A$" },
  { code: "jp", name: "Japan", currency: "JPY", symbol: "¥" },
  { code: "cn", name: "China", currency: "CNY", symbol: "¥" },
  { code: "in", name: "India", currency: "INR", symbol: "₹" },
  { code: "br", name: "Brazil", currency: "BRL", symbol: "R$" },
  { code: "za", name: "South Africa", currency: "ZAR", symbol: "R" },
  { code: "mx", name: "Mexico", currency: "MXN", symbol: "Mex$" },
  { code: "kr", name: "South Korea", currency: "KRW", symbol: "₩" },
  { code: "sg", name: "Singapore", currency: "SGD", symbol: "S$" },
  { code: "tr", name: "Turkey", currency: "TRY", symbol: "₺" },
  { code: "ae", name: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
  { code: "sa", name: "Saudi Arabia", currency: "SAR", symbol: "﷼" },
  { code: "th", name: "Thailand", currency: "THB", symbol: "฿" },
  { code: "ua", name: "Ukraine", currency: "UAH", symbol: "₴" },
  { code: "kz", name: "Kazakhstan", currency: "KZT", symbol: "₸" },
  { code: "pl", name: "Poland", currency: "PLN", symbol: "zł" },
  { code: "se", name: "Sweden", currency: "SEK", symbol: "kr" },
  { code: "cz", name: "Czech Republic", currency: "CZK", symbol: "Kč" },
  { code: "hu", name: "Hungary", currency: "HUF", symbol: "Ft" },
  { code: "ro", name: "Romania", currency: "RON", symbol: "lei" },
];

const timezonesData = [
  { code: "gmt-12", name: "GMT-12:00", cities: "Международная линия смены дат" },
  { code: "gmt-11", name: "GMT-11:00", cities: "Самоа, Ниуэ" },
  { code: "gmt-10", name: "GMT-10:00", cities: "Гавайи" },
  { code: "gmt-9", name: "GMT-09:00", cities: "Аляска" },
  { code: "gmt-8", name: "GMT-08:00", cities: "Лос-Анджелес, Ванкувер" },
  { code: "gmt-7", name: "GMT-07:00", cities: "Денвер, Феникс" },
  { code: "gmt-6", name: "GMT-06:00", cities: "Чикаго, Мехико" },
  { code: "gmt-5", name: "GMT-05:00", cities: "Нью-Йорк, Торонто" },
  { code: "gmt-4", name: "GMT-04:00", cities: "Сантьяго, Каракас" },
  { code: "gmt-3", name: "GMT-03:00", cities: "Буэнос-Айрес, Сан-Паулу" },
  { code: "gmt-2", name: "GMT-02:00", cities: "Среднеатлантическое время" },
  { code: "gmt-1", name: "GMT-01:00", cities: "Азорские острова" },
  { code: "gmt0", name: "GMT+00:00", cities: "Лондон, Дублин, Лиссабон" },
  { code: "gmt+1", name: "GMT+01:00", cities: "Берлин, Париж, Рим" },
  { code: "gmt+2", name: "GMT+02:00", cities: "Афины, Каир, Киев" },
  { code: "gmt+3", name: "GMT+03:00", cities: "Москва, Минск" },
  { code: "gmt+4", name: "GMT+04:00", cities: "Баку, Тбилиси, Ереван" },
  { code: "gmt+5", name: "GMT+05:00", cities: "Екатеринбург, Ташкент" },
  { code: "gmt+6", name: "GMT+06:00", cities: "Алматы, Новосибирск" },
  { code: "gmt+7", name: "GMT+07:00", cities: "Красноярск, Бангкок" },
  { code: "gmt+8", name: "GMT+08:00", cities: "Гонконг, Пекин, Иркутск" },
  { code: "gmt+9", name: "GMT+09:00", cities: "Токио, Сеул, Якутск" },
  { code: "gmt+10", name: "GMT+10:00", cities: "Сидней, Владивосток" },
  { code: "gmt+11", name: "GMT+11:00", cities: "Магадан, Соломоновы Острова" },
  { code: "gmt+12", name: "GMT+12:00", cities: "Фиджи, Маршалловы Острова" },
  { code: "gmt+13", name: "GMT+13:00", cities: "Самоа, Тонга" },
  { code: "gmt+14", name: "GMT+14:00", cities: "Остров Рождества (Кирибати)" },
];

const exchangeRates = {
  RUB: 1,
  USD: 0.011,
  EUR: 0.01,
  GBP: 0.0086,
  CAD: 0.015,
  AUD: 0.016,
  JPY: 1.64,
  CNY: 0.079,
  INR: 0.91,
  BRL: 0.056,
  ZAR: 0.20,
  MXN: 0.18,
  KRW: 14.67,
  SGD: 0.015,
  TRY: 0.35,
  AED: 0.04,
  SAR: 0.041,
  THB: 0.39,
  UAH: 0.42,
  KZT: 4.92,
  PLN: 0.043,
  SEK: 0.11,
  CZK: 0.25,
  HUF: 3.93,
  RON: 0.05,
};

const Settings = () => {
  const { theme, setTheme } = useTheme();

  // Состояние для переключателей настроек
  const [notifications, setNotifications] = useState({
    email: true,
    sync: true,
    push: true,
    mealReminders: true,
    achievements: true,
    weeklyReports: true
  });

  // Состояние для темы
  const [interfaceSettings, setInterfaceSettings] = useState({
    compact: false,
    sidebar: true,
    animations: true
  });

  // Состояние для региональных настроек
  const [language, setLanguage] = useState("ru");
  const [region, setRegion] = useState("ru");
  const [timezone, setTimezone] = useState("gmt+3");

  // Состояние для текущей валюты
  const [currency, setCurrency] = useState({
    code: "RUB",
    symbol: "₽"
  });

  // Обновление валюты при смене региона
  useEffect(() => {
    const selectedRegion = regionsData.find(r => r.code === region);
    if (selectedRegion) {
      setCurrency({
        code: selectedRegion.currency,
        symbol: selectedRegion.symbol
      });
    }
  }, [region]);

  // Функция для пересчета стоимости
  const calculatePrice = (priceInRub: number) => {
    const rate = exchangeRates[currency.code] || 1;
    const convertedPrice = (priceInRub * rate).toFixed(2);
    // Форматирование цены в зависимости от валюты
    if (currency.code === "JPY" || currency.code === "KRW") {
      return Math.round(parseFloat(convertedPrice)); // Без копеек для иены и воны
    }
    return convertedPrice;
  };

  // Обработчики событий
  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => {
      const newValue = !prev[setting];
      toast.success(`${newValue ? "Включено" : "Отключено"}`, {
        description: `Настройка "${setting}" ${newValue ? "активирована" : "деактивирована"}`
      });
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  const handleInterfaceToggle = (setting: keyof typeof interfaceSettings) => {
    setInterfaceSettings(prev => {
      const newValue = !prev[setting];
      toast.success(`${newValue ? "Включено" : "Отключено"}`, {
        description: `Настройка "${setting}" ${newValue ? "активирована" : "деактивирована"}`
      });
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success("Тема изменена", {
      description: `Установлена ${
        newTheme === "light" 
          ? "светлая тема" 
          : newTheme === "dark" 
            ? "темная тема" 
            : "системная тема"
      }`
    });
    // Здесь можно добавить логику для реального изменения темы
  };

  const handleLogout = () => {
    toast.info("Выход из аккаунта", {
      description: "Вы успешно вышли из своего аккаунта"
    });
  };

  const handleSubscribe = (plan: string) => {
    toast.success("Подписка", {
      description: `Вы перешли к оформлению подписки "${plan}"`
    });
  };

  const handleSaveLanguage = () => {
    toast.success("Настройки сохранены", {
      description: "Изменения языка и региона применены"
    });
  };

  const handleSectionClick = (section: string) => {
    toast.info(`Переход к разделу "${section}"`, {
      description: `Выбра�� раздел "${section}" настроек`
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Настройки</h1>
        <p className="text-muted-foreground">Настройте приложение по своему усмотрению</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">Разделы настроек</h3>
            </div>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <a href="#account" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Аккаунт")}>
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    <span>Аккаунт</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#appearance" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Внешний вид")}>
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-primary" />
                    <span>Внешний вид</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#notifications" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Уведомления")}>
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Уведомления</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#billing" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Подписка")}>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Подписка</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#language" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Язык")}>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Язык</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#help" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick("Помощь")}>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>Помощь</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </nav>
            </CardContent>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full text-destructive justify-start" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="mb-6" id="account">
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
              <CardDescription>Управление настройками профиля и аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Статус аккаунта</h4>
                  <p className="text-xs text-muted-foreground">Ваш текущий план подписки</p>
                </div>
                <Badge variant="outline">Бесплатный план</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Email-уведомления</h4>
                  <p className="text-xs text-muted-foreground">Получать уведомления на почту</p>
                </div>
                <Switch checked={notifications.email} onCheckedChange={() => handleToggle('email')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Синхронизация данных</h4>
                  <p className="text-xs text-muted-foreground">Автоматически синхронизировать данные между устройствами</p>
                </div>
                <Switch checked={notifications.sync} onCheckedChange={() => handleToggle('sync')} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="appearance">
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройте внешний вид приложения</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="theme">
                <TabsList className="mb-4">
                  <TabsTrigger value="theme">Тема</TabsTrigger>
                  <TabsTrigger value="layout">Интерфейс</TabsTrigger>
                </TabsList>

                <TabsContent value="theme" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-white border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-black">Светлая</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="light" 
                          checked={theme === "light"}
                          onChange={() => handleThemeChange("light")}
                        />
                        <label htmlFor="light" className="text-sm">Светлая тема</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-white">Темная</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="dark" 
                          checked={theme === "dark"}
                          onChange={() => handleThemeChange("dark")}
                        />
                        <label htmlFor="dark" className="text-sm">Темная тема</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-gradient-to-b from-white to-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-black">Авто</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="system" 
                          checked={theme === "system"}
                          onChange={() => handleThemeChange("system")}
                        />
                        <label htmlFor="system" className="text-sm">Системная</label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Компактный режим</h4>
                      <p className="text-xs text-muted-foreground">Уменьшить отступы и размер элементов интерфейса</p>
                    </div>
                    <Switch 
                      checked={interfaceSettings.compact} 
                      onCheckedChange={() => handleInterfaceToggle('compact')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Боковая панель</h4>
                      <p className="text-xs text-muted-foreground">Показывать боковую панель по умолчанию</p>
                    </div>
                    <Switch 
                      checked={interfaceSettings.sidebar} 
                      onCheckedChange={() => handleInterfaceToggle('sidebar')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Анимации</h4>
                      <p className="text-xs text-muted-foreground">Включить анимации интерфейса</p>
                    </div>
                    <Switch 
                      checked={interfaceSettings.animations} 
                      onCheckedChange={() => handleInterfaceToggle('animations')}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mb-6" id="notifications">
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройте параметры уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Push-уведомления</h4>
                  <p className="text-xs text-muted-foreground">Получать уведомления в браузере</p>
                </div>
                <Switch checked={notifications.push} onCheckedChange={() => handleToggle('push')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Напоминания о питании</h4>
                  <p className="text-xs text-muted-foreground">Получать напоминания о приемах пищи</p>
                </div>
                <Switch checked={notifications.mealReminders} onCheckedChange={() => handleToggle('mealReminders')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Достижения</h4>
                  <p className="text-xs text-muted-foreground">Уведомления о полученных достижениях</p>
                </div>
                <Switch checked={notifications.achievements} onCheckedChange={() => handleToggle('achievements')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Еженедельные отчеты</h4>
                  <p className="text-xs text-muted-foreground">Получать еженедельные отчеты о прогрессе</p>
                </div>
                <Switch checked={notifications.weeklyReports} onCheckedChange={() => handleToggle('weeklyReports')} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="billing">
            <CardHeader>
              <CardTitle>Подписка и оплата</CardTitle>
              <CardDescription>Управление подпиской и платежной информацией</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 border rounded-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">Текущий план</h4>
                    <p className="text-sm text-muted-foreground">Бесплатный план</p>
                  </div>
                  <Badge variant="outline">Активен</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Базовое отслеживание калорий</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Ограниченная история приемов пищи</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">Основные отчеты</span>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-4">Доступные планы</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">Премиум</h5>
                  <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(299)}<span className="text-sm font-normal text-muted-foreground">/месяц</span></p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Расширенная аналитика</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Персональные рекомендации AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Неограниченная история</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Без рекламы</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => handleSubscribe("Премиум")}>Оформить подписку</Button>
                </div>

                <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">Годовой план</h5>
                  <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(2499)}<span className="text-sm font-normal text-muted-foreground">/год</span></p>
                  <Badge className="mb-2">Экономия 40%</Badge>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Все функции Премиум</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Приоритетная поддержка</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">Экспорт данных</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => handleSubscribe("Годовой план")}>Оформить подписку</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="language">
            <CardHeader>
              <CardTitle>Язык и регион</CardTitle>
              <CardDescription>Настройте язык и региональные параметры</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium">Язык приложения</label>
                <select 
                  id="language" 
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languagesData.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="region" className="text-sm font-medium">Регион</label>
                <select 
                  id="region" 
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regionsData.map((reg) => (
                    <option key={reg.code} value={reg.code}>
                      {reg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium">Часовой пояс</label>
                <select 
                  id="timezone" 
                  className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezonesData.map((tz) => (
                    <option key={tz.code} value={tz.code}>
                      {tz.name} ({tz.cities})
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveLanguage}>Сохранить настройки</Button>
            </CardFooter>
          </Card>

          <Card id="help">
            <CardHeader>
              <CardTitle>Помощь и поддержка</CardTitle>
              <CardDescription>Получите помощь по использованию приложения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick("Центр поддержки")}>
                <h4 className="font-medium mb-1">Центр поддержки</h4>
                <p className="text-sm text-muted-foreground">Ответы на часто задаваемые вопросы и инструкции</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick("Связь с поддержкой")}>
                <h4 className="font-medium mb-1">Свяжитесь с нами</h4>
                <p className="text-sm text-muted-foreground">Напишите в службу поддержки, если у вас возникли проблемы</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick("Обучение")}>
                <h4 className="font-medium mb-1">Обучающие материалы</h4>
                <p className="text-sm text-muted-foreground">Видеоуроки и инструкции по использованию приложения</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick("Сообщить о проблеме")}>
                <h4 className="font-medium mb-1">Сообщить о проблеме</h4>
                <p className="text-sm text-muted-foreground">Сообщите нам о найденных ошибках или проблемах</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>Версия приложения: 1.0.0</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

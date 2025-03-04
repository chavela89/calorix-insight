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
import { useLanguage } from "@/context/LanguageContext";
import { ThemeType } from "@/types";

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
  const { language, setLanguage, t } = useLanguage();
  const [region, setRegion] = useState(() => {
    return localStorage.getItem("region") || "ru";
  });
  const [timezone, setTimezone] = useState(() => {
    return localStorage.getItem("timezone") || "gmt+3";
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sync: true,
    push: true,
    mealReminders: true,
    achievements: true,
    weeklyReports: true
  });

  const [interfaceSettings, setInterfaceSettings] = useState({
    compact: false,
    sidebar: true,
    animations: true
  });

  const [currency, setCurrency] = useState({
    code: "RUB",
    symbol: "₽"
  });

  useEffect(() => {
    const selectedRegion = regionsData.find(r => r.code === region);
    if (selectedRegion) {
      setCurrency({
        code: selectedRegion.currency,
        symbol: selectedRegion.symbol
      });
    }
  }, [region]);

  const calculatePrice = (priceInRub: number) => {
    const rate = exchangeRates[currency.code as keyof typeof exchangeRates] || 1;
    const convertedPrice = (priceInRub * rate).toFixed(2);
    if (currency.code === "JPY" || currency.code === "KRW") {
      return Math.round(parseFloat(convertedPrice));
    }
    return convertedPrice;
  };

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

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    toast.success(t.theme + " " + t.active, {
      description: `${
        newTheme === "light" 
          ? t.light 
          : newTheme === "dark" 
            ? t.dark 
            : newTheme === "system"
              ? t.system
              : newTheme
      }`
    });
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
    setLanguage(language);
    localStorage.setItem("region", region);
    localStorage.setItem("timezone", timezone);
    
    toast.success(t.saveSettings, {
      description: t.customizeLanguage
    });
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSectionClick = (section: string) => {
    toast.info(`Переход к разделу "${section}"`, {
      description: `Выбран раздел "${section}" настроек`
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.settings}</h1>
        <p className="text-muted-foreground">{t.customize}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">{t.sections}</h3>
            </div>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <a href="#account" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.account)}>
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    <span>{t.account}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#appearance" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.appearance)}>
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-primary" />
                    <span>{t.appearance}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#notifications" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.notifications)}>
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>{t.notifications}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#billing" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.subscription)}>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>{t.subscription}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#language" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.language)}>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>{t.language}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#help" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.help)}>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{t.help}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </nav>
            </CardContent>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full text-destructive justify-start" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="mb-6" id="account">
            <CardHeader>
              <CardTitle>{t.accountSettings}</CardTitle>
              <CardDescription>{t.profileSettings}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.accountStatus}</h4>
                  <p className="text-xs text-muted-foreground">{t.currentPlan}</p>
                </div>
                <Badge variant="outline">{t.freePlan}</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.emailNotifications}</h4>
                  <p className="text-xs text-muted-foreground">{t.receiveEmails}</p>
                </div>
                <Switch checked={notifications.email} onCheckedChange={() => handleToggle('email')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.syncData}</h4>
                  <p className="text-xs text-muted-foreground">{t.autoSync}</p>
                </div>
                <Switch checked={notifications.sync} onCheckedChange={() => handleToggle('sync')} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="appearance">
            <CardHeader>
              <CardTitle>{t.appearance}</CardTitle>
              <CardDescription>{t.customizeAppearance}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="theme">
                <TabsList className="mb-4">
                  <TabsTrigger value="theme">{t.theme}</TabsTrigger>
                  <TabsTrigger value="layout">{t.layout}</TabsTrigger>
                </TabsList>

                <TabsContent value="theme" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-white border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-black">{t.light}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="light" 
                          checked={theme === "light"}
                          onChange={() => handleThemeChange("light")}
                        />
                        <label htmlFor="light" className="text-sm">{t.light}</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{t.dark}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="dark" 
                          checked={theme === "dark"}
                          onChange={() => handleThemeChange("dark")}
                        />
                        <label htmlFor="dark" className="text-sm">{t.dark}</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-gradient-to-b from-white to-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-black">{t.system}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input 
                          type="radio" 
                          name="theme" 
                          id="system" 
                          checked={theme === "system"}
                          onChange={() => handleThemeChange("system")}
                        />
                        <label htmlFor="system" className="text-sm">{t.system}</label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{t.compactMode}</h4>
                      <p className="text-xs text-muted-foreground">{t.reducePadding}</p>
                    </div>
                    <Switch 
                      checked={interfaceSettings.compact} 
                      onCheckedChange={() => handleInterfaceToggle('compact')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{t.sidebar}</h4>
                      <p className="text-xs text-muted-foreground">{t.showSidebar}</p>
                    </div>
                    <Switch 
                      checked={interfaceSettings.sidebar} 
                      onCheckedChange={() => handleInterfaceToggle('sidebar')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{t.animations}</h4>
                      <p className="text-xs text-muted-foreground">{t.enableAnimations}</p>
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
              <CardTitle>{t.notifications}</CardTitle>
              <CardDescription>{t.customizeNotifications}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.pushNotifications}</h4>
                  <p className="text-xs text-muted-foreground">{t.receivePush}</p>
                </div>
                <Switch checked={notifications.push} onCheckedChange={() => handleToggle('push')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.mealReminders}</h4>
                  <p className="text-xs text-muted-foreground">{t.getMealReminders}</p>
                </div>
                <Switch checked={notifications.mealReminders} onCheckedChange={() => handleToggle('mealReminders')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.achievements}</h4>
                  <p className="text-xs text-muted-foreground">{t.achievementNotifications}</p>
                </div>
                <Switch checked={notifications.achievements} onCheckedChange={() => handleToggle('achievements')} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{t.weeklyReports}</h4>
                  <p className="text-xs text-muted-foreground">{t.getWeeklyReports}</p>
                </div>
                <Switch checked={notifications.weeklyReports} onCheckedChange={() => handleToggle('weeklyReports')} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="billing">
            <CardHeader>
              <CardTitle>{t.subscriptionBilling}</CardTitle>
              <CardDescription>{t.manageSubscription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 border rounded-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{t.currentPlanTitle}</h4>
                    <p className="text-sm text-muted-foreground">{t.currentPlan}</p>
                  </div>
                  <Badge variant="outline">{t.active}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">{t.basicTracking}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">{t.limitedHistory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">{t.basicReports}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-4">{t.availablePlans}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">{t.premium}</h5>
                  <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(299)}<span className="text-sm font-normal text-muted-foreground">{t.month}</span></p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.advancedAnalytics}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.aiRecommendations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.unlimitedHistory}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.noAds}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => handleSubscribe("Премиум")}>{t.subscribe}</Button>
                </div>

                <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">{t.yearlyPlan}</h5>
                  <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(2499)}<span className="text-sm font-normal text-muted-foreground">{t.year}</span></p>
                  <Badge className="mb-2">{t.savings}</Badge>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.allPremiumFeatures}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.prioritySupport}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{t.dataExport}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => handleSubscribe("Годовой план")}>{t.subscribe}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6" id="language">
            <CardHeader>
              <CardTitle>{t.languageRegion}</CardTitle>
              <CardDescription>{t.customizeLanguage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium">{t.appLanguage}</label>
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
                <label htmlFor="region" className="text-sm font-medium">{t.region}</label>
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
                <label htmlFor="timezone" className="text-sm font-medium">{t.timezone}</label>
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
              <Button onClick={handleSaveLanguage}>{t.saveSettings}</Button>
            </CardFooter>
          </Card>

          <Card id="help">
            <CardHeader>
              <CardTitle>{t.helpSupport}</CardTitle>
              <CardDescription>{t.getHelp}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.supportCenter)}>
                <h4 className="font-medium mb-1">{t.supportCenter}</h4>
                <p className="text-sm text-muted-foreground">{t.faqInstructions}</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.contactUs)}>
                <h4 className="font-medium mb-1">{t.contactUs}</h4>
                <p className="text-sm text-muted-foreground">{t.contactSupport}</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.tutorials)}>
                <h4 className="font-medium mb-1">{t.tutorials}</h4>
                <p className="text-sm text-muted-foreground">{t.tutorialDescription}</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.reportProblem)}>
                <h4 className="font-medium mb-1">{t.reportProblem}</h4>
                <p className="text-sm text-muted-foreground">{t.reportBugs}</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                <p>{t.appVersion}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, CreditCard, Smartphone, Monitor, Globe, LogOut, HelpCircle, Languages, ChevronRight } from "lucide-react";

const Settings = () => {
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
                <a href="#account" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="h-5 w-5 text-primary" />
                    <span>Аккаунт</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#appearance" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <Monitor className="h-5 w-5 text-primary" />
                    <span>Внешний вид</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#notifications" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Уведомления</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#billing" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Подписка</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#language" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Язык</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href="#help" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>Помощь</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </nav>
            </CardContent>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full text-destructive justify-start">
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
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Синхронизация данных</h4>
                  <p className="text-xs text-muted-foreground">Автоматически синхронизировать данные между устройствами</p>
                </div>
                <Switch defaultChecked />
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
                        <input type="radio" name="theme" id="light" />
                        <label htmlFor="light" className="text-sm">Светлая тема</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-white">Темная</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="radio" name="theme" id="dark" />
                        <label htmlFor="dark" className="text-sm">Темная тема</label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-24 rounded-md bg-gradient-to-b from-white to-neutral-900 border border-border flex items-center justify-center">
                        <span className="text-sm font-medium text-black">Авто</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="radio" name="theme" id="system" defaultChecked />
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
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Боковая панель</h4>
                      <p className="text-xs text-muted-foreground">Показывать боковую панель по умолчанию</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Анимации</h4>
                      <p className="text-xs text-muted-foreground">Включить анимации интерфейса</p>
                    </div>
                    <Switch defaultChecked />
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
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Напоминания о питании</h4>
                  <p className="text-xs text-muted-foreground">Получать напоминания о приемах пищи</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Достижения</h4>
                  <p className="text-xs text-muted-foreground">Уведомления о полученных достижениях</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Еженедельные отчеты</h4>
                  <p className="text-xs text-muted-foreground">Получать еженедельные отчеты о прогрессе</p>
                </div>
                <Switch defaultChecked />
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
                  <p className="text-xl font-bold mb-2">299 ₽<span className="text-sm font-normal text-muted-foreground">/месяц</span></p>
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
                  <Button className="w-full">Оформить подписку</Button>
                </div>

                <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
                  <h5 className="font-medium mb-2">Годовой план</h5>
                  <p className="text-xl font-bold mb-2">2 499 ₽<span className="text-sm font-normal text-muted-foreground">/год</span></p>
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
                  <Button className="w-full">Оформить подписку</Button>
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
                <select id="language" className="w-full px-3 py-2 rounded-md border border-input bg-background">
                  <option value="ru" selected>Русский</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="region" className="text-sm font-medium">Регион</label>
                <select id="region" className="w-full px-3 py-2 rounded-md border border-input bg-background">
                  <option value="ru" selected>Россия</option>
                  <option value="us">United States</option>
                  <option value="eu">European Union</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium">Часовой пояс</label>
                <select id="timezone" className="w-full px-3 py-2 rounded-md border border-input bg-background">
                  <option value="msk" selected>Москва (GMT+3)</option>
                  <option value="etc">Екатеринбург (GMT+5)</option>
                  <option value="nsk">Новосибирск (GMT+7)</option>
                  <option value="vld">Владивосток (GMT+10)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить настройки</Button>
            </CardFooter>
          </Card>

          <Card id="help">
            <CardHeader>
              <CardTitle>Помощь и поддержка</CardTitle>
              <CardDescription>Получите помощь по использованию приложения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-medium mb-1">Центр поддержки</h4>
                <p className="text-sm text-muted-foreground">Ответы на часто задаваемые вопросы и инструкции</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-medium mb-1">Свяжитесь с нами</h4>
                <p className="text-sm text-muted-foreground">Напишите в службу поддержки, если у вас возникли проблемы</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                <h4 className="font-medium mb-1">Обучающие материалы</h4>
                <p className="text-sm text-muted-foreground">Видеоуроки и инструкции по использованию приложения</p>
              </div>

              <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
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

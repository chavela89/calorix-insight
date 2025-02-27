
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Weight, Plus, ArrowUp, ArrowDown, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Health = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Здоровье</h1>
        <p className="text-muted-foreground">Отслеживание показателей здоровья и физической активности</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Пульс
              </CardTitle>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">72</div>
              <div className="text-sm text-muted-foreground mb-4">уд/мин (в покое)</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                <span>3 уд/мин за неделю</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                Вес
              </CardTitle>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">75.2</div>
              <div className="text-sm text-muted-foreground mb-4">кг (утро 26.02)</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                <span>0.8 кг за неделю</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Активность
              </CardTitle>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">5,432</div>
              <div className="text-sm text-muted-foreground mb-4">шагов сегодня</div>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-sm">
                  <span>Цель</span>
                  <span>5,432 / 10,000</span>
                </div>
                <Progress value={54} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>История измерений</CardTitle>
            <CardDescription>Последние записи о вашем здоровье</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Weight className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Вес</h4>
                    <span className="text-sm text-muted-foreground">26.02.2025</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>75.2 кг</span>
                    <ArrowDown className="h-3 w-3 text-green-500" />
                    <span className="text-sm text-green-500">-0.3 кг</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Тренировка</h4>
                    <span className="text-sm text-muted-foreground">25.02.2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Кардио, 45 минут, 320 ккал</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Пульс</h4>
                    <span className="text-sm text-muted-foreground">24.02.2025</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span>72 уд/мин</span>
                    <ArrowDown className="h-3 w-3 text-green-500" />
                    <span className="text-sm text-green-500">-2 уд/мин</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Параметры здоровья</CardTitle>
            <CardDescription>Основные показатели организма</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Рост</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">178</div>
                  <div className="text-sm text-muted-foreground">см</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Индекс массы тела</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">23.7</div>
                  <div className="text-sm text-green-500">Норма</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Давление</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">120/80</div>
                  <div className="text-sm text-muted-foreground">мм рт.ст.</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">% жира</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">16.4%</div>
                  <History className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить показатель
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Health;

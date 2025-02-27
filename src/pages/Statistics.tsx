
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart2, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Statistics = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Статистика</h1>
        <p className="text-muted-foreground">Аналитика питания и активности</p>
      </div>

      <Tabs defaultValue="nutrition" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="weight">Вес</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Калории по дням
                </CardTitle>
                <CardDescription>За последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Данные будут доступны после внесения информации о питании</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Макронутриенты
                </CardTitle>
                <CardDescription>Среднее за неделю</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Данные будут доступны после внесения информации о питании</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChart className="h-5 w-5 text-primary" />
                  Тренды питания
                </CardTitle>
                <CardDescription>За последний месяц</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Данные будут доступны после внесения информации о питании</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Статистика активности</CardTitle>
              <CardDescription>Данные о ваших тренировках и шагах</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Данные будут доступны после внесения информации об активности</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Динамика веса</CardTitle>
              <CardDescription>Изменение веса с течением времени</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Данные будут доступны после внесения информации о весе</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Progress = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Прогресс</h1>
        <p className="text-muted-foreground">Отслеживайте свои достижения и динамику изменений</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Вес
            </CardTitle>
            <CardDescription>Динамика изменения веса за последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>График изменения веса будет доступен после внесения данных</p>
              <Button className="mt-4">Внести данные о весе</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Калории
            </CardTitle>
            <CardDescription>Потребление калорий по дням</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>График потребления калорий будет доступен после внесения данных о питании</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Распределение нутриентов
          </CardTitle>
          <CardDescription>Соотношение белков, жиров и углеводов</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>График распределения нутриентов будет доступен после внесения данных о питании</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;

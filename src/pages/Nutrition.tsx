
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Beef, Coffee, Egg } from "lucide-react";

const Nutrition = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Питание</h1>
        <p className="text-muted-foreground">Отслеживайте приемы пищи и контролируйте потребление нутриентов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Завтрак
            </CardTitle>
            <CardDescription>08:30 • 450 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Овсянка с ягодами</span>
                <span className="text-muted-foreground">320 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Зеленый чай</span>
                <span className="text-muted-foreground">0 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Грецкие орехи</span>
                <span className="text-muted-foreground">130 ккал</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-primary" />
              Обед
            </CardTitle>
            <CardDescription>13:00 • 680 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Куриный суп</span>
                <span className="text-muted-foreground">220 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Салат с тунцом</span>
                <span className="text-muted-foreground">310 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Ржаной хлеб</span>
                <span className="text-muted-foreground">150 ккал</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Beef className="h-5 w-5 text-primary" />
              Ужин
            </CardTitle>
            <CardDescription>19:30 • 520 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Запеченный лосось</span>
                <span className="text-muted-foreground">280 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Овощи гриль</span>
                <span className="text-muted-foreground">120 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Киноа</span>
                <span className="text-muted-foreground">120 ккал</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Добавить прием пищи</CardTitle>
          <CardDescription>Внесите данные о новом приеме пищи</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Функция добавления приемов пищи будет доступна в ближайшем обновлении
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Nutrition;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lightbulb, FileText, Sparkles, PieChart, Flame, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Recommendations = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Рекомендации</h1>
        <p className="text-muted-foreground">Персонализированные рекомендации на основе ваших данных</p>
      </div>

      <Card className="mb-8 border-primary/20">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Персональный AI-анализ</CardTitle>
          </div>
          <CardDescription>Чтобы получить персонализированные рекомендации, введите больше данных о своем питании и активности</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Ваши персональные рекомендации появятся здесь</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Чем больше данных вы внесете, тем точнее будут рекомендации нашего AI-ассистента
            </p>
            <Button>Начать вносить данные</Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Общие рекомендации</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <CardTitle>Балансировка питания</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Старайтесь соблюдать следующее распределение макронутриентов для поддержания здорового обмена веществ:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span>Белки: 25-30% от общего потребления калорий</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>Жиры: 20-35% от общего потребления калорий</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Углеводы: 45-55% от общего потребления калорий</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Подробнее</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <CardTitle>Режим питания</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Регулярное питание помогает поддерживать стабильный уровень энергии и предотвращает переедание:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Старайтесь питаться каждые 3-4 часа небольшими порциями</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Не пропускайте завтрак — он запускает метаболизм на весь день</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <span>Последний прием пищи должен быть за 2-3 часа до сна</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Подробнее</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Статьи по питанию</CardTitle>
          </div>
          <CardDescription>Полезные материалы для улучшения вашего питания</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-1">Как правильно считать калории?</h4>
              <p className="text-sm text-muted-foreground">Подробное руководство по подсчету калорий и определению своих потребностей</p>
            </div>
            
            <Separator />
            
            <div className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-1">10 продуктов с высоким содержанием белка</h4>
              <p className="text-sm text-muted-foreground">Список лучших источников белка для здорового питания</p>
            </div>
            
            <Separator />
            
            <div className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-1">Интервальное голодание: за и против</h4>
              <p className="text-sm text-muted-foreground">Научный взгляд на популярный метод питания</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Все статьи</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Recommendations;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, ChevronRight, Lightbulb, Sparkles, Plus, UserCog, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Recommendations = () => {
  const handleStartData = () => {
    toast.success("Начать вносить данные", {
      description: "Переход к форме внесения данных о питании"
    });
  };

  const handleMoreDetails = (topic: string) => {
    toast.info(`Подробнее о "${topic}"`, {
      description: `Открыта подробная информация о ${topic}`
    });
  };

  const handleViewAllArticles = () => {
    toast.info("Все статьи", {
      description: "Открыт список всех доступных статей по питанию"
    });
  };

  const handleReadArticle = (title: string) => {
    toast.info(`Чтение статьи "${title}"`, {
      description: `Открыта статья: ${title}`
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Рекомендации</h1>
        <p className="text-muted-foreground">Персонализированные советы на основе ваших данных</p>
      </div>

      <div className="mb-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Недостаточно данных для анализа</h3>
              <p className="text-muted-foreground mb-6">
                Чтобы получить персонализированные рекомендации, внесите данные о питании и активности за несколько дней
              </p>
              <Button onClick={handleStartData}>
                Начать вносить данные
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Общие рекомендации</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Балансировка питания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Старайтесь соблюдать следующее распределение макронутриентов для поддержания здорового обмена веществ:
            </p>
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />
                <div>
                  <p className="font-medium">Белки: 25-30% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Необходимы для восстановления тканей и мышц</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1.5" />
                <div>
                  <p className="font-medium">Жиры: 20-35% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Важны для работы гормональной системы</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                <div>
                  <p className="font-medium">Углеводы: 45-55% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Основной источник энергии для организма</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleMoreDetails("балансировка питания")}>
              Подробнее
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Режим питания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Регулярное питание помогает поддерживать стабильный уровень энергии и предотвращает переедание:
            </p>
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Старайтесь питаться каждые 3-4 часа небольшими порциями</p>
                  <p className="text-sm text-muted-foreground">Поддерживает стабильный уровень сахара в крови</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Не пропускайте завтрак — он запускает метаболизм на весь день</p>
                  <p className="text-sm text-muted-foreground">Помогает избежать переедания в течение дня</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Последний прием пищи должен быть за 2-3 часа до сна</p>
                  <p className="text-sm text-muted-foreground">Способствует лучшему пищеварению и сну</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleMoreDetails("режим питания")}>
              Подробнее
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Статьи по питанию</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Полезные материалы</CardTitle>
            <Button variant="ghost" className="text-sm" onClick={handleViewAllArticles}>
              Все статьи
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Подборка статей о правильном питании и здоровом образе жизни</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Важность завтрака")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Важность завтрака</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Почему завтрак считается самым важным приемом пищи</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Белки, жиры и углеводы")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Белки, жиры и углеводы</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Роль макронутриентов в здоровом питании</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Как пить больше воды")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Как пить больше воды</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Простые способы увеличить потребление воды в течение дня</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;

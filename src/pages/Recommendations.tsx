
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lightbulb, FileText, Sparkles, PieChart, Flame, AlertCircle, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Recommendations = () => {
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({ title: "", content: "" });
  
  const showArticle = (title: string, content: string) => {
    setCurrentArticle({ title, content });
    setOpenArticleDialog(true);
  };

  const startDataEntry = () => {
    toast.success("Переход к вводу данных", {
      description: "Вы будете перенаправлены на страницу ввода данных о питании",
    });
  };

  const showDetails = (topic: string) => {
    toast.success(`Подробная информация о "${topic}"`, {
      description: "Загружаем дополнительные сведения и рекомендации",
    });
  };

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
            <Button onClick={startDataEntry}>Начать вносить данные</Button>
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
            <Button variant="outline" className="w-full" onClick={() => showDetails("Балансировка питания")}>Подробнее</Button>
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
            <Button variant="outline" className="w-full" onClick={() => showDetails("Режим питания")}>Подробнее</Button>
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
            <div 
              className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => showArticle(
                "Как правильно считать калории?", 
                "Подсчет калорий - это основа контроля за своим питанием. Для начала определите свою базовую потребность в калориях с помощью формулы Миффлина-Сан Жеора, учитывающей ваш вес, рост, возраст и уровень активности. Затем ведите дневник питания, записывая все, что вы едите и пьете. Используйте пищевые весы для точного измерения порций. Помните, что для снижения веса нужно создать дефицит в 500-700 калорий в день, что даст потерю 0.5-1 кг в неделю - это здоровый темп."
              )}
            >
              <h4 className="font-medium mb-1">Как правильно считать калории?</h4>
              <p className="text-sm text-muted-foreground">Подробное руководство по подсчету калорий и определению своих потребностей</p>
            </div>
            
            <Separator />
            
            <div 
              className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => showArticle(
                "10 продуктов с высоким содержанием белка", 
                "1. Куриная грудка: 31г белка на 100г\n2. Яйца: 13г белка в 2 яйцах\n3. Греческий йогурт: 10г белка на 100г\n4. Творог: 18г белка на 100г\n5. Лосось: 25г белка на 100г\n6. Тунец: 30г белка на 100г\n7. Чечевица: 9г белка на 100г\n8. Тофу: 8г белка на 100г\n9. Киноа: 4г белка на 100г\n10. Миндаль: 21г белка на 100г\n\nРегулярное употребление этих продуктов поможет вам достигнуть суточной нормы потребления белка, что особенно важно при занятиях спортом и для поддержания мышечной массы."
              )}
            >
              <h4 className="font-medium mb-1">10 продуктов с высоким содержанием белка</h4>
              <p className="text-sm text-muted-foreground">Список лучших источников белка для здорового питания</p>
            </div>
            
            <Separator />
            
            <div 
              className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => showArticle(
                "Интервальное голодание: за и против", 
                "Интервальное голодание - это пищевой режим, при котором чередуются периоды приема пищи и голодания.\n\nПреимущества:\n- Снижение уровня инсулина и увеличение гормона роста\n- Ускорение метаболизма до 14%\n- Снижение воспаления и окислительного стресса\n- Улучшение работы мозга\n\nНедостатки:\n- Может вызывать чувство голода и раздражительность\n- Не подходит людям с определенными заболеваниями\n- Может привести к перееданию в разрешенные часы\n- Сложно поддерживать при социальной активности\n\nПеред началом проконсультируйтесь с врачом."
              )}
            >
              <h4 className="font-medium mb-1">Интервальное голодание: за и против</h4>
              <p className="text-sm text-muted-foreground">Научный взгляд на популярный метод питания</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => toast.success("Все статьи по питанию", {
            description: "Открываем полную библиотеку статей о здоровом питании"
          })}>Все статьи</Button>
        </CardFooter>
      </Card>

      {/* Article dialog */}
      <Dialog open={openArticleDialog} onOpenChange={setOpenArticleDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentArticle.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4 whitespace-pre-line">
            {currentArticle.content}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenArticleDialog(false)}>Закрыть</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recommendations;

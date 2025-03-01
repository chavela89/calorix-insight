
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Planner = () => {
  const handleAddMeal = () => {
    toast.success("Добавление приема пищи", {
      description: "Открыта форма добавления нового приема пищи"
    });
  };
  
  const handleCreateTemplate = () => {
    toast.success("Создание шаблона", {
      description: "Открыта форма создания нового шаблона питания"
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Планирование</h1>
        <p className="text-muted-foreground">Планируйте питание и активность на будущее</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Предыдущий день</span>
          </Button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span className="font-medium">Сегодня, 27 февраля 2025</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Следующий день</span>
          </Button>
        </div>
        <Button onClick={handleAddMeal}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>План питания</CardTitle>
              <CardDescription>Запланированные приемы пищи на сегодня</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Завтрак</h4>
                    <span className="text-sm text-muted-foreground">08:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Обед</h4>
                    <span className="text-sm text-muted-foreground">13:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Ужин</h4>
                    <span className="text-sm text-muted-foreground">19:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Календарь</CardTitle>
              <CardDescription>Февраль 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <p>Функция календаря будет доступна в ближайшем обновлении</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны питания</CardTitle>
              <CardDescription>Создавайте и используйте шаблоны питания</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground mb-4">
                <p>У вас еще нет созданных шаблонов</p>
              </div>
              <Button className="w-full" onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Создать шаблон
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Planner;

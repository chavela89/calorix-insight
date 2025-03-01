
import React, { useState } from "react";
import { Search, PlusCircle, Scan, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function QuickAdd() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [currentMeal, setCurrentMeal] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Поиск: ${searchQuery}`, {
      description: "Функция поиска продуктов будет доступна в следующем обновлении",
    });
    setSearchQuery("");
  };
  
  const handleQuickAdd = (meal: string) => {
    setCurrentMeal(meal);
    setOpenAddDialog(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Продукт добавлен в ${currentMeal}`, {
      description: "Данные успешно сохранены",
    });
    setOpenAddDialog(false);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Найти продукт..."
                className="pl-9 pr-16"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1.5 flex gap-1">
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info("Сканирование продукта", { description: "Функция будет доступна в следующем обновлении" })}>
                  <Scan className="h-4 w-4" />
                  <span className="sr-only">Сканировать</span>
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.info("Голосовой ввод", { description: "Функция будет доступна в следующем обновлении" })}>
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Голосовой ввод</span>
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd("Завтрак")}>
              <PlusCircle className="h-4 w-4" />
              Завтрак
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd("Обед")}>
              <PlusCircle className="h-4 w-4" />
              Обед
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd("Ужин")}>
              <PlusCircle className="h-4 w-4" />
              Ужин
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd("Перекус")}>
              <PlusCircle className="h-4 w-4" />
              Перекус
            </Button>
          </div>
          
          <h4 className="font-medium text-sm mt-2">Недавно добавленные</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Куриная грудка", "Гречка", "Творог 5%", "Яблоко"].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  toast.success(`${item} добавлен в дневник`, {
                    description: `${[120, 150, 90, 70][index]} ккал добавлено в ваш дневник питания`
                  });
                }}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm">{item}</span>
                  <span className="text-xs text-muted-foreground">
                    {[120, 150, 90, 70][index]} ккал
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      
      {/* Quick Add Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Быстрое добавление в {currentMeal}</DialogTitle>
            <DialogDescription>
              Укажите продукт и его количество для быстрого добавления
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quickAddProduct" className="text-right">
                  Продукт
                </Label>
                <Input
                  id="quickAddProduct"
                  placeholder="Например: Яблоко"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quickAddWeight" className="text-right">
                  Вес (г)
                </Label>
                <Input
                  id="quickAddWeight"
                  type="number"
                  placeholder="100"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Добавить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

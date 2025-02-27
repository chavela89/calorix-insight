
import React from "react";
import { Search, PlusCircle, Scan, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QuickAdd() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Найти продукт..."
              className="pl-9 pr-16"
            />
            <div className="absolute right-2 top-1.5 flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Scan className="h-4 w-4" />
                <span className="sr-only">Сканировать</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Голосовой ввод</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Завтрак
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Обед
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Ужин
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
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
    </Card>
  );
}

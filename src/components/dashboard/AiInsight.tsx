
import React from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AiInsight() {
  return (
    <Card className="shadow-sm border-none bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>
      <CardContent className="p-5 relative z-10">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-base">AI Инсайт дня</h3>
            <p className="text-sm text-muted-foreground">
              Основываясь на вашем питании за последнюю неделю, вам не хватает витамина D и Omega-3. Попробуйте добавить в рацион жирную рыбу и яйца.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button variant="outline" size="sm" className="bg-background">
                Предложить продукты
              </Button>
              <Button variant="ghost" size="sm">
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

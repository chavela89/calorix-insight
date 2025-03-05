
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

interface NutritionCardProps {
  ingredients: any[];
  calculateTotals: () => { calories: number; protein: number; carbs: number; fat: number; price: number; };
  calculatePerServing: (totals: any) => any;
  calculatePer100g: (totals: any) => any;
  formatNumber: (num: number) => number;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ 
  ingredients, 
  calculateTotals, 
  calculatePerServing, 
  calculatePer100g, 
  formatNumber 
}) => {
  const { t, language } = useLanguage();
  const totals = calculateTotals();
  
  const macroData = [
    { name: t.protein, value: totals.protein, color: "#3B82F6" },
    { name: t.carbs, value: totals.carbs, color: "#10B981" },
    { name: t.fat, value: totals.fat, color: "#F59E0B" }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.nutritionFacts}</CardTitle>
        <CardDescription>{t.perServing}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {ingredients.length > 0 ? (
          <>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="transparent" 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t.calories}:</span>
                <span className="font-medium">{formatNumber(totals.calories)} kcal</span>
              </div>
              <div className="flex justify-between">
                <span>{t.protein}:</span>
                <span className="font-medium">{formatNumber(totals.protein)} g</span>
              </div>
              <div className="flex justify-between">
                <span>{t.carbs}:</span>
                <span className="font-medium">{formatNumber(totals.carbs)} g</span>
              </div>
              <div className="flex justify-between">
                <span>{t.fat}:</span>
                <span className="font-medium">{formatNumber(totals.fat)} g</span>
              </div>
              
              <Separator className="my-2" />
              
              <Tabs defaultValue="per-serving">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="per-serving">{t.perServing}</TabsTrigger>
                  <TabsTrigger value="per-100g">{t.per100g}</TabsTrigger>
                </TabsList>
                <TabsContent value="per-serving" className="space-y-2 pt-2">
                  {Object.entries(calculatePerServing(totals)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{t[key as keyof typeof t] || key}:</span>
                      <span className="font-medium">
                        {formatNumber(value as number)} {key === 'price' ? '₽' : key === 'calories' ? 'kcal' : 'g'}
                      </span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="per-100g" className="space-y-2 pt-2">
                  {Object.entries(calculatePer100g(totals)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{t[key as keyof typeof t] || key}:</span>
                      <span className="font-medium">
                        {formatNumber(value as number)} {key === 'price' ? '₽' : key === 'calories' ? 'kcal' : 'g'}
                      </span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {language === 'ru' ? "Добавьте ингредиенты, чтобы увидеть пищевую ценность" : "Add ingredients to see nutrition information"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionCard;

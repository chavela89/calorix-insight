
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NutrientProgressBar } from "@/components/dashboard/NutrientProgressBar";
import { CalorieProgress } from "@/components/dashboard/CalorieProgress";
import { MacroDistribution } from "@/components/dashboard/MacroDistribution";
import { MealCard } from "@/components/dashboard/MealCard";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { AiInsight } from "@/components/dashboard/AiInsight";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { QuickAdd } from "@/components/dashboard/QuickAdd";
import { toast } from "sonner";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Sample data
const caloriesData = [1800, 2100, 1950, 2050, 1800, 1600, 1900];
const proteinData = [120, 140, 130, 145, 125, 110, 135];

// Sample meal data
const meals = {
  breakfast: [
    { name: "Овсянка на молоке", calories: 220, protein: 7, carbs: 40, fat: 4 },
    { name: "Банан", calories: 105, protein: 1, carbs: 27, fat: 0 },
  ],
  lunch: [
    { name: "Куриная грудка", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Гречка", calories: 130, protein: 4, carbs: 25, fat: 1 },
    { name: "Овощной салат", calories: 45, protein: 1, carbs: 10, fat: 0 },
  ],
  dinner: [
    { name: "Творог 5%", calories: 120, protein: 18, carbs: 3, fat: 5 },
    { name: "Мед", calories: 65, protein: 0, carbs: 17, fat: 0 },
  ],
  snack: [],
};

// Calculate totals
const calculateTotals = () => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  Object.values(meals).forEach(mealItems => {
    mealItems.forEach(item => {
      totalCalories += item.calories;
      totalProtein += item.protein;
      totalCarbs += item.carbs;
      totalFat += item.fat;
    });
  });

  return { totalCalories, totalProtein, totalCarbs, totalFat };
};

const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateTotals();

// User targets
const targets = {
  calories: 2200,
  protein: 150,
  carbs: 220,
  fat: 73,
};

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddMeal = (mealType: string) => {
    toast.success(`Добавление продуктов в ${mealType}`, {
      description: "Эта функция будет доступна в следующем обновлении",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col space-y-6">
        {/* Date navigation */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Дневник питания</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 px-3"
              onClick={goToToday}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{formatDate(currentDate)}</span>
              <span className="sm:hidden">Сегодня</span>
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <CalorieProgress 
                    consumed={totalCalories} 
                    target={targets.calories} 
                    remaining={Math.max(0, targets.calories - totalCalories)} 
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <NutrientProgressBar 
                    label="Белки" 
                    current={totalProtein} 
                    target={targets.protein} 
                    unit="г" 
                    color="bg-blue-500" 
                  />
                  <NutrientProgressBar 
                    label="Углеводы" 
                    current={totalCarbs} 
                    target={targets.carbs} 
                    unit="г" 
                    color="bg-green-500" 
                  />
                  <NutrientProgressBar 
                    label="Жиры" 
                    current={totalFat} 
                    target={targets.fat} 
                    unit="г" 
                    color="bg-amber-500" 
                  />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="meals" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="meals">Приемы пищи</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
              </TabsList>
              <TabsContent value="meals" className="space-y-4 mt-4 animate-in">
                <MealCard 
                  mealType="breakfast" 
                  title="Завтрак"
                  calories={meals.breakfast.reduce((sum, item) => sum + item.calories, 0)}
                  items={meals.breakfast}
                  onAddMeal={() => handleAddMeal("завтрак")}
                />
                <MealCard 
                  mealType="lunch" 
                  title="Обед"
                  calories={meals.lunch.reduce((sum, item) => sum + item.calories, 0)}
                  items={meals.lunch}
                  onAddMeal={() => handleAddMeal("обед")}
                />
                <MealCard 
                  mealType="dinner" 
                  title="Ужин"
                  calories={meals.dinner.reduce((sum, item) => sum + item.calories, 0)}
                  items={meals.dinner}
                  onAddMeal={() => handleAddMeal("ужин")}
                />
                <MealCard 
                  mealType="snack" 
                  title="Перекус"
                  calories={meals.snack.reduce((sum, item) => sum + item.calories, 0)}
                  items={meals.snack}
                  onAddMeal={() => handleAddMeal("перекус")}
                />
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4 mt-4 animate-in">
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <MacroDistribution 
                      protein={totalProtein}
                      carbs={totalCarbs}
                      fat={totalFat}
                    />
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardContent className="pt-6">
                    <WeeklyProgress 
                      caloriesData={caloriesData}
                      proteinData={proteinData}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <QuickAdd />
            <WaterTracker />
            <AiInsight />
            <StreakCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

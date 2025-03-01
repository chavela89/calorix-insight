
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart2, PieChart, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Statistics = () => {
  const [dataState, setDataState] = useState({
    nutrition: false,
    activity: false,
    weight: false
  });
  
  const generateData = (type: keyof typeof dataState) => {
    toast.success(`Данные для ${type === 'nutrition' ? 'питания' : type === 'activity' ? 'активности' : 'веса'} сгенерированы`, {
      description: "Теперь вы можете видеть визуализацию данных"
    });
    
    setDataState(prev => ({
      ...prev,
      [type]: true
    }));
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Статистика</h1>
        <p className="text-muted-foreground">Аналитика питания и активности</p>
      </div>

      <Tabs defaultValue="nutrition" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="weight">Вес</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nutrition">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Калории по дням
                </CardTitle>
                <CardDescription>За последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                {dataState.nutrition ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-full h-40 border border-border rounded-md p-4 flex items-center justify-center">
                      <div className="flex items-end h-full gap-2">
                        {[65, 90, 75, 80, 85, 60, 70].map((value, i) => (
                          <div 
                            key={i} 
                            className="w-8 bg-primary/80 rounded-t-md"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      График калорий за последние 7 дней
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Данные будут доступны после внесения информации о питании</p>
                    <Button onClick={() => generateData('nutrition')} className="mt-2">
                      Сгенерировать данные
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Макронутриенты
                </CardTitle>
                <CardDescription>Среднее за неделю</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                {dataState.nutrition ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-40 h-40 rounded-full border border-border p-4 relative">
                      <div className="absolute inset-0 m-4 rounded-full bg-blue-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
                      <div className="absolute inset-0 m-4 rounded-full bg-green-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 65%, 50% 65%)' }}></div>
                      <div className="absolute inset-0 m-4 rounded-full bg-amber-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 65%, 50% 65%)' }}></div>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span className="text-xs">Белки</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        <span className="text-xs">Углеводы</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
                        <span className="text-xs">Жиры</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Данные будут доступны после внесения информации о питании</p>
                    <Button onClick={() => generateData('nutrition')} className="mt-2">
                      Сгенерировать данные
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChart className="h-5 w-5 text-primary" />
                  Тренды питания
                </CardTitle>
                <CardDescription>За последний месяц</CardDescription>
              </CardHeader>
              <CardContent className="h-60 flex items-center justify-center">
                {dataState.nutrition ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-full h-40 border border-border rounded-md p-4 flex items-center justify-center">
                      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                        <path 
                          d="M0,40 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,30 90,25 L90,50 L0,50 Z" 
                          fill="rgba(var(--primary), 0.2)" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Тренд потребления калорий за месяц
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Данные будут доступны после внесения информации о питании</p>
                    <Button onClick={() => generateData('nutrition')} className="mt-2">
                      Сгенерировать данные
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Статистика активности</CardTitle>
              <CardDescription>Данные о ваших тренировках и шагах</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              {dataState.activity ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-full h-60 border border-border rounded-md p-4 flex items-center justify-center">
                    <div className="flex items-end h-full gap-3 w-full justify-center">
                      {[5000, 7500, 10000, 8000, 12000, 6000, 9000].map((value, i) => (
                        <div key={i} className="w-16 flex flex-col items-center">
                          <div 
                            className="w-full bg-primary/80 rounded-t-md"
                            style={{ height: `${(value / 12000) * 100}%` }}
                          />
                          <span className="text-xs mt-1">{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Количество шагов по дням недели
                  </p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Данные будут доступны после внесения информации об активности</p>
                  <Button onClick={() => generateData('activity')} className="mt-2">
                    Сгенерировать данные
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Динамика веса</CardTitle>
              <CardDescription>Изменение веса с течением времени</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              {dataState.weight ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-full h-60 border border-border rounded-md p-4 flex items-center justify-center">
                    <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                      <path 
                        d="M0,25 C10,24 20,23 30,22 C40,21 50,20 60,18 C70,16 80,14 90,12" 
                        fill="none" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="1"
                      />
                      {[25, 24, 23, 22, 21, 20, 18, 16, 14, 12].map((y, i) => (
                        <circle 
                          key={i} 
                          cx={i * 10} 
                          cy={y} 
                          r="1" 
                          fill="hsl(var(--primary))" 
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <span className="text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      1 мая
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      31 мая
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Данные будут доступны после внесения информации о весе</p>
                  <Button onClick={() => generateData('weight')} className="mt-2">
                    Сгенерировать данные
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;

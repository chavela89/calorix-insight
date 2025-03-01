
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Weight, Plus, ArrowUp, ArrowDown, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Health = () => {
  const [openPulseDialog, setOpenPulseDialog] = useState(false);
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [openHealthParamDialog, setOpenHealthParamDialog] = useState(false);
  
  const [pulseValue, setPulseValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [stepsValue, setStepsValue] = useState("");
  const [healthParamName, setHealthParamName] = useState("");
  const [healthParamValue, setHealthParamValue] = useState("");

  // Health data state
  const [healthData, setHealthData] = useState({
    pulse: { value: 72, trend: -3, date: "сегодня" },
    weight: { value: 75.2, trend: -0.8, date: "утро 26.02" },
    activity: { value: 5432, goal: 10000, date: "сегодня" },
    history: [
      { type: 'weight', value: 75.2, trend: -0.3, date: '26.02.2025' },
      { type: 'activity', description: 'Кардио, 45 минут, 320 ккал', date: '25.02.2025' },
      { type: 'pulse', value: 72, trend: -2, date: '24.02.2025' }
    ],
    params: {
      height: 178,
      bmi: 23.7,
      bmiStatus: 'Норма',
      pressure: '120/80',
      fatPercentage: 16.4
    }
  });

  const handlePulseSubmit = (e) => {
    e.preventDefault();
    
    const numericValue = Number(pulseValue);
    if (isNaN(numericValue)) {
      toast.error("Некорректное значение", {
        description: "Пожалуйста, введите числовое значение пульса"
      });
      return;
    }
    
    // Update health data
    const oldValue = healthData.pulse.value;
    const trend = numericValue - oldValue;
    
    setHealthData(prev => ({
      ...prev,
      pulse: { 
        value: numericValue, 
        trend: trend, 
        date: "сегодня" 
      },
      history: [
        { 
          type: 'pulse', 
          value: numericValue, 
          trend: trend, 
          date: new Date().toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '.') 
        },
        ...prev.history
      ]
    }));
    
    toast.success("Данные о пульсе сохранены", {
      description: `Текущий пульс: ${numericValue} уд/мин`,
    });
    
    setPulseValue("");
    setOpenPulseDialog(false);
  };

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    
    const numericValue = Number(weightValue);
    if (isNaN(numericValue)) {
      toast.error("Некорректное значение", {
        description: "Пожалуйста, введите числовое значение веса"
      });
      return;
    }
    
    // Update health data
    const oldValue = healthData.weight.value;
    const trend = +(numericValue - oldValue).toFixed(1);
    
    setHealthData(prev => ({
      ...prev,
      weight: { 
        value: numericValue, 
        trend: trend, 
        date: `утро ${new Date().toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'}).replace(/\//g, '.')}` 
      },
      history: [
        { 
          type: 'weight', 
          value: numericValue, 
          trend: trend, 
          date: new Date().toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '.') 
        },
        ...prev.history
      ],
      // Recalculate BMI
      params: {
        ...prev.params,
        bmi: +(numericValue / Math.pow(prev.params.height/100, 2)).toFixed(1)
      }
    }));
    
    toast.success("Данные о весе сохранены", {
      description: `Текущий вес: ${numericValue} кг`,
    });
    
    setWeightValue("");
    setOpenWeightDialog(false);
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();
    
    const numericValue = Number(stepsValue);
    if (isNaN(numericValue)) {
      toast.error("Некорректное значение", {
        description: "Пожалуйста, введите числовое значение шагов"
      });
      return;
    }
    
    // Update health data
    setHealthData(prev => ({
      ...prev,
      activity: { 
        value: numericValue, 
        goal: prev.activity.goal, 
        date: "сегодня" 
      }
    }));
    
    toast.success("Данные об активности сохранены", {
      description: `Текущее количество шагов: ${numericValue}`,
    });
    
    setStepsValue("");
    setOpenActivityDialog(false);
  };

  const handleHealthParamSubmit = (e) => {
    e.preventDefault();
    
    if (!healthParamName.trim() || !healthParamValue.trim()) {
      toast.error("Некорректные данные", {
        description: "Пожалуйста, заполните все поля"
      });
      return;
    }
    
    // Just show toast, no need to update any state since we don't display custom params
    toast.success("Показатель здоровья добавлен", {
      description: `${healthParamName}: ${healthParamValue}`,
    });
    
    setHealthParamName("");
    setHealthParamValue("");
    setOpenHealthParamDialog(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Здоровье</h1>
        <p className="text-muted-foreground">Отслеживание показателей здоровья и физической активности</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Пульс
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setOpenPulseDialog(true)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">{healthData.pulse.value}</div>
              <div className="text-sm text-muted-foreground mb-4">уд/мин (в покое)</div>
              <div className="flex items-center text-sm text-muted-foreground">
                {healthData.pulse.trend < 0 ? (
                  <>
                    <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                    <span>{Math.abs(healthData.pulse.trend)} уд/мин за неделю</span>
                  </>
                ) : healthData.pulse.trend > 0 ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                    <span>{healthData.pulse.trend} уд/мин за неделю</span>
                  </>
                ) : (
                  <span>Без изменений за неделю</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                Вес
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setOpenWeightDialog(true)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">{healthData.weight.value}</div>
              <div className="text-sm text-muted-foreground mb-4">кг ({healthData.weight.date})</div>
              <div className="flex items-center text-sm text-muted-foreground">
                {healthData.weight.trend < 0 ? (
                  <>
                    <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                    <span>{Math.abs(healthData.weight.trend)} кг за неделю</span>
                  </>
                ) : healthData.weight.trend > 0 ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                    <span>{healthData.weight.trend} кг за неделю</span>
                  </>
                ) : (
                  <span>Без изменений за неделю</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Активность
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setOpenActivityDialog(true)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Добавить данные</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-4xl font-bold mb-1">{healthData.activity.value.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mb-4">шагов сегодня</div>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-sm">
                  <span>Цель</span>
                  <span>{healthData.activity.value.toLocaleString()} / {healthData.activity.goal.toLocaleString()}</span>
                </div>
                <Progress value={(healthData.activity.value / healthData.activity.goal) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>История измерений</CardTitle>
            <CardDescription>Последние записи о вашем здоровье</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthData.history.map((record, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Separator />}
                  <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                      {record.type === 'weight' ? (
                        <Weight className="h-5 w-5" />
                      ) : record.type === 'pulse' ? (
                        <Heart className="h-5 w-5" />
                      ) : (
                        <Activity className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          {record.type === 'weight' 
                            ? 'Вес' 
                            : record.type === 'pulse' 
                            ? 'Пульс' 
                            : 'Тренировка'}
                        </h4>
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                      </div>
                      {record.type === 'weight' || record.type === 'pulse' ? (
                        <div className="flex items-center gap-2 mt-1">
                          <span>
                            {record.value} {record.type === 'weight' ? 'кг' : 'уд/мин'}
                          </span>
                          {record.trend && (
                            <>
                              {record.trend < 0 ? (
                                <ArrowDown className="h-3 w-3 text-green-500" />
                              ) : (
                                <ArrowUp className="h-3 w-3 text-red-500" />
                              )}
                              <span className={record.trend < 0 ? "text-sm text-green-500" : "text-sm text-red-500"}>
                                {record.trend < 0 ? `-${Math.abs(record.trend)}` : `+${record.trend}`} {record.type === 'weight' ? 'кг' : 'уд/мин'}
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{record.description}</p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Параметры здоровья</CardTitle>
            <CardDescription>Основные показатели организма</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Рост</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">{healthData.params.height}</div>
                  <div className="text-sm text-muted-foreground">см</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Индекс массы тела</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">{healthData.params.bmi}</div>
                  <div className="text-sm text-green-500">{healthData.params.bmiStatus}</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Давление</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">{healthData.params.pressure}</div>
                  <div className="text-sm text-muted-foreground">мм рт.ст.</div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="text-sm text-muted-foreground mb-1">% жира</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">{healthData.params.fatPercentage}%</div>
                  <History className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={() => setOpenHealthParamDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить показатель
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pulse input dialog */}
      <Dialog open={openPulseDialog} onOpenChange={setOpenPulseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Внесение данных о пульсе</DialogTitle>
            <DialogDescription>
              Введите ваш текущий пульс, чтобы отслеживать динамику
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePulseSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pulse" className="text-right">
                  Пульс
                </Label>
                <Input
                  id="pulse"
                  type="number"
                  placeholder="72"
                  value={pulseValue}
                  onChange={(e) => setPulseValue(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Weight input dialog */}
      <Dialog open={openWeightDialog} onOpenChange={setOpenWeightDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Внесение данных о весе</DialogTitle>
            <DialogDescription>
              Введите ваш текущий вес, чтобы отслеживать динамику изменений
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWeightSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Вес
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Activity input dialog */}
      <Dialog open={openActivityDialog} onOpenChange={setOpenActivityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Внесение данных об активности</DialogTitle>
            <DialogDescription>
              Введите количество шагов или другие данные об активности
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleActivitySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="steps" className="text-right">
                  Шаги
                </Label>
                <Input
                  id="steps"
                  type="number"
                  placeholder="5000"
                  value={stepsValue}
                  onChange={(e) => setStepsValue(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Health parameter input dialog */}
      <Dialog open={openHealthParamDialog} onOpenChange={setOpenHealthParamDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавление показателя здоровья</DialogTitle>
            <DialogDescription>
              Введите название и значение нового показателя здоровья
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleHealthParamSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paramName" className="text-right">
                  Название
                </Label>
                <Input
                  id="paramName"
                  type="text"
                  placeholder="Холестерин"
                  value={healthParamName}
                  onChange={(e) => setHealthParamName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paramValue" className="text-right">
                  Значение
                </Label>
                <Input
                  id="paramValue"
                  type="text"
                  placeholder="5.2 ммоль/л"
                  value={healthParamValue}
                  onChange={(e) => setHealthParamValue(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Health;

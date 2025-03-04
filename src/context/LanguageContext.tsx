
import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: Record<string, string>;
};

// Default translations for essential UI elements
const translations = {
  ru: {
    // Sidebar menu
    dashboard: "Панель управления",
    nutrition: "Питание",
    progress: "Прогресс",
    statistics: "Статистика",
    mealPlanner: "Планировщик питания",
    recommendations: "Рекомендации",
    achievements: "Достижения",
    health: "Здоровье",
    myProfile: "Мой профиль",
    settings: "Настройки",
    
    // Common UI elements
    save: "Сохранить",
    cancel: "Отмена",
    add: "Добавить",
    delete: "Удалить",
    edit: "Редактировать",
    back: "Назад",
    
    // Health page
    healthTitle: "Здоровье",
    healthDescription: "Отслеживание показателей здоровья и физической активности",
    pulse: "Пульс",
    weight: "Вес",
    activity: "Активность",
    stepsToday: "шагов сегодня",
    goal: "Цель",
    measurementHistory: "История измерений",
    lastRecords: "Последние записи о вашем здоровье",
    healthParams: "Параметры здоровья",
    mainIndicators: "Основные показатели организма",
    height: "Рост",
    bmi: "Индекс массы тела",
    normal: "Норма",
    pressure: "Давление",
    fatPercentage: "% жира",
    addIndicator: "Добавить показатель",
    enterPulseData: "Внесение данных о пульсе",
    enterCurrentPulse: "Введите ваш текущий пульс, чтобы отслеживать динамику",
    enterWeightData: "Внесение данных о весе",
    enterCurrentWeight: "Введите ваш текущий вес, чтобы отслеживать динамику изменений",
    enterActivityData: "Внесение данных об активности",
    enterStepsData: "Введите количество шагов или другие данные об активности",
    addHealthParam: "Добавление показателя здоровья",
    enterParamNameValue: "Введите название и значение нового показателя здоровья",
    paramName: "Название",
    paramValue: "Значение",
    workout: "Тренировка",
    beatsPerMin: "уд/мин (в покое)",
    weekChange: "за неделю",
    noChanges: "Без изменений за неделю",
    steps: "шагов",
    cm: "см",
    kg: "кг",
    mmHg: "мм рт.ст."
  },
  en: {
    // Sidebar menu
    dashboard: "Dashboard",
    nutrition: "Nutrition",
    progress: "Progress",
    statistics: "Statistics",
    mealPlanner: "Meal Planner",
    recommendations: "Recommendations",
    achievements: "Achievements",
    health: "Health",
    myProfile: "My Profile",
    settings: "Settings",
    
    // Common UI elements
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    
    // Health page
    healthTitle: "Health",
    healthDescription: "Track health indicators and physical activity",
    pulse: "Pulse",
    weight: "Weight",
    activity: "Activity",
    stepsToday: "steps today",
    goal: "Goal",
    measurementHistory: "Measurement History",
    lastRecords: "Latest records of your health",
    healthParams: "Health Parameters",
    mainIndicators: "Main body indicators",
    height: "Height",
    bmi: "BMI",
    normal: "Normal",
    pressure: "Blood Pressure",
    fatPercentage: "Body Fat %",
    addIndicator: "Add Indicator",
    enterPulseData: "Enter Pulse Data",
    enterCurrentPulse: "Enter your current pulse to track dynamics",
    enterWeightData: "Enter Weight Data",
    enterCurrentWeight: "Enter your current weight to track changes",
    enterActivityData: "Enter Activity Data",
    enterStepsData: "Enter steps count or other activity data",
    addHealthParam: "Add Health Parameter",
    enterParamNameValue: "Enter name and value of a new health parameter",
    paramName: "Name",
    paramValue: "Value",
    workout: "Workout",
    beatsPerMin: "bpm (resting)",
    weekChange: "for the week",
    noChanges: "No changes for the week",
    steps: "steps",
    cm: "cm",
    kg: "kg",
    mmHg: "mmHg"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("language") || "ru";
  });
  
  const [t, setT] = useState<Record<string, string>>(() => {
    const savedLanguage = localStorage.getItem("language") || "ru";
    return translations[savedLanguage as keyof typeof translations] || translations.ru;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    setT(translations[language as keyof typeof translations] || translations.en);
    document.documentElement.lang = language;
    
    // This will trigger the page reload when needed
    // We don't want to reload on initial render
    const prevLanguage = localStorage.getItem("prev-language");
    if (prevLanguage && prevLanguage !== language) {
      localStorage.setItem("prev-language", language);
    } else if (!prevLanguage) {
      localStorage.setItem("prev-language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}


import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: Record<string, string>;
};

// Comprehensive translations for the entire application
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
    recipeCalculator: "Калькулятор рецептов",
    
    // Common UI elements
    save: "Сохранить",
    cancel: "Отмена",
    add: "Добавить",
    delete: "Удалить",
    edit: "Редактировать",
    back: "Назад",
    
    // Settings page
    customize: "Настройте приложение в соответствии с вашими предпочтениями",
    accountSettings: "Настройки аккаунта",
    profileSettings: "Управление профилем и настройками аккаунта",
    accountStatus: "Статус аккаунта",
    currentPlan: "Ваш текущий план",
    freePlan: "Бесплатный",
    emailNotifications: "Уведомления по email",
    receiveEmails: "Получать уведомления по электронной почте",
    syncData: "Синхронизация данных",
    autoSync: "Автоматически синхронизировать данные между устройствами",
    appearance: "Внешний вид",
    customizeAppearance: "Настройте внешний вид приложения",
    theme: "Тема",
    chooseTheme: "Выберите тему оформления",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    active: "активна",
    compactMode: "Компактный режим",
    reduceDensity: "Уменьшить плотность элементов интерфейса",
    showSidebar: "Показывать боковую панель",
    alwaysVisible: "Всегда отображать боковую панель",
    enableAnimations: "Включить анимации",
    animateTransitions: "Анимировать переходы и эффекты",
    notifications: "Уведомления",
    manageNotifications: "Управляйте настройками уведомлений",
    pushNotifications: "Push-уведомления",
    receiveUpdates: "Получать обновления и уведомления",
    mealReminders: "Напоминания о приемах пищи",
    remindMeals: "Напоминать о запланированных приемах пищи",
    achievementAlerts: "Уведомления о достижениях",
    notifyAchievements: "Уведомлять о новых достижениях",
    weeklyReports: "Еженедельные отчеты",
    weeklyProgress: "Получать еженедельные отчеты о прогрессе",
    subscription: "Подписка",
    manageSubscription: "Управление подпиской и платежами",
    currentSubscription: "Текущая подписка",
    freeFeatures: "Доступны базовые функции",
    upgrade: "Улучшить",
    premiumPlan: "Премиум план",
    premiumFeatures: "Все функции без ограничений",
    proFeatures: "Профессиональный план",
    advancedFeatures: "Расширенная аналитика и персонализация",
    month: "мес",
    unlimitedAccess: "Неограниченный доступ ко всем функциям",
    advancedAnalytics: "Расширенная аналитика",
    personalCoaching: "Персональные рекомендации",
    noAds: "Без рекламы",
    subscribeTo: "Подписаться",
    languageRegion: "Язык и регион",
    customizeLanguage: "Настройте язык и региональные параметры",
    appLanguage: "Язык приложения",
    region: "Регион",
    timezone: "Часовой пояс",
    saveSettings: "Сохранить настройки",
    helpSupport: "Помощь и поддержка",
    getHelp: "Получите ответы на свои вопросы",
    supportCenter: "Центр поддержки",
    faqInstructions: "Частые вопросы и инструкции",
    contactUs: "Связаться с нами",
    contactSupport: "Связаться со службой поддержки",
    tutorials: "Обучающие материалы",
    tutorialDescription: "Как использовать приложение",
    reportProblem: "Сообщить о проблеме",
    reportBugs: "Сообщить об ошибке или проблеме",
    appVersion: "Версия приложения: 1.0.0",
    logout: "Выйти из аккаунта",
    removeAllData: "Это действие удалит все ваши данные",
    
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
    mmHg: "мм рт.ст.",
    
    // Dashboard and nutrition
    nutritionJournal: "Дневник питания",
    caloriesConsumed: "Потреблено калорий",
    caloriesRemaining: "Осталось калорий",
    caloriesTotal: "Всего калорий",
    meals: "Приемы пищи",
    analytics: "Аналитика",
    breakfast: "Завтрак",
    lunch: "Обед",
    dinner: "Ужин",
    snack: "Перекус",
    macroDistribution: "Распределение БЖУ",
    protein: "Белки",
    carbs: "Углеводы",
    fat: "Жиры",
    today: "Сегодня",
    
    // Mobile menu
    menu: "Меню",
    close: "Закрыть",
    home: "Главная",
    
    // Recipe calculator
    ingredients: "Ингредиенты",
    nutrition: "Пищевая ценность",
    servings: "Количество порций",
    recipeTitle: "Название рецепта",
    addIngredient: "Добавить ингредиент",
    ingredient: "Ингредиент",
    amount: "Количество",
    unit: "Единица измерения",
    price: "Цена",
    totalCalories: "Всего калорий",
    totalProtein: "Всего белков",
    totalCarbs: "Всего углеводов",
    totalFat: "Всего жиров",
    perServing: "На порцию",
    per100g: "На 100г",
    totalCost: "Общая стоимость",
    costPerServing: "Стоимость за порцию",
    saveRecipe: "Сохранить рецепт",
    loadRecipe: "Загрузить рецепт",
    scanIngredient: "Сканировать ингредиент",
    adjustRecipe: "Настроить рецепт",
    recalculate: "Пересчитать",
    alternativeIngredients: "Альтернативные ингредиенты",
    shoppingList: "Список покупок",
    addToMealPlan: "Добавить в план питания",
    recipeRecommendations: "Рекомендации по рецепту",
    nutritionTips: "Советы по питанию",
    myRecipes: "Мои рецепты",
    popularRecipes: "Популярные рецепты",
    newRecipe: "Новый рецепт",
    editRecipe: "Редактировать рецепт",
    gram: "грамм",
    ml: "мл",
    tbsp: "ст. ложка",
    tsp: "ч. ложка",
    cup: "чашка",
    piece: "шт",
    nutritionFacts: "Пищевая ценность",
    calories: "Калории",
    calculationBasis: "Основа для расчета",
    byServings: "По порциям",
    byWeight: "По весу",
    targetServings: "Целевое количество порций",
    targetWeight: "Целевой вес (г)",
    calculateBy: "Рассчитать по"
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
    recipeCalculator: "Recipe Calculator",
    
    // Common UI elements
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    
    // Settings page
    customize: "Customize the application according to your preferences",
    accountSettings: "Account Settings",
    profileSettings: "Manage profile and account settings",
    accountStatus: "Account Status",
    currentPlan: "Your current plan",
    freePlan: "Free",
    emailNotifications: "Email Notifications",
    receiveEmails: "Receive notifications via email",
    syncData: "Sync Data",
    autoSync: "Automatically sync data between devices",
    appearance: "Appearance",
    customizeAppearance: "Customize the app's appearance",
    theme: "Theme",
    chooseTheme: "Choose a theme for the interface",
    light: "Light",
    dark: "Dark",
    system: "System",
    active: "active",
    compactMode: "Compact Mode",
    reduceDensity: "Reduce interface element density",
    showSidebar: "Show Sidebar",
    alwaysVisible: "Always show the sidebar",
    enableAnimations: "Enable Animations",
    animateTransitions: "Animate transitions and effects",
    notifications: "Notifications",
    manageNotifications: "Manage notification settings",
    pushNotifications: "Push Notifications",
    receiveUpdates: "Receive updates and notifications",
    mealReminders: "Meal Reminders",
    remindMeals: "Remind about scheduled meals",
    achievementAlerts: "Achievement Alerts",
    notifyAchievements: "Notify about new achievements",
    weeklyReports: "Weekly Reports",
    weeklyProgress: "Receive weekly progress reports",
    subscription: "Subscription",
    manageSubscription: "Manage subscription and payments",
    currentSubscription: "Current Subscription",
    freeFeatures: "Basic features available",
    upgrade: "Upgrade",
    premiumPlan: "Premium Plan",
    premiumFeatures: "All features without limitations",
    proFeatures: "Professional Plan",
    advancedFeatures: "Advanced analytics and personalization",
    month: "month",
    unlimitedAccess: "Unlimited access to all features",
    advancedAnalytics: "Advanced analytics",
    personalCoaching: "Personal recommendations",
    noAds: "No ads",
    subscribeTo: "Subscribe to",
    languageRegion: "Language & Region",
    customizeLanguage: "Customize language and regional settings",
    appLanguage: "App Language",
    region: "Region",
    timezone: "Timezone",
    saveSettings: "Save Settings",
    helpSupport: "Help & Support",
    getHelp: "Get answers to your questions",
    supportCenter: "Support Center",
    faqInstructions: "FAQ and instructions",
    contactUs: "Contact Us",
    contactSupport: "Contact support service",
    tutorials: "Tutorials",
    tutorialDescription: "How to use the app",
    reportProblem: "Report a Problem",
    reportBugs: "Report a bug or issue",
    appVersion: "App version: 1.0.0",
    logout: "Logout",
    removeAllData: "This action will delete all your data",
    
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
    mmHg: "mmHg",
    
    // Dashboard and nutrition
    nutritionJournal: "Nutrition Journal",
    caloriesConsumed: "Calories Consumed",
    caloriesRemaining: "Calories Remaining",
    caloriesTotal: "Total Calories",
    meals: "Meals",
    analytics: "Analytics",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
    macroDistribution: "Macro Distribution",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    today: "Today",
    
    // Mobile menu
    menu: "Menu",
    close: "Close",
    home: "Home",
    
    // Recipe calculator
    ingredients: "Ingredients",
    nutrition: "Nutrition",
    servings: "Servings",
    weight: "Weight",
    recipeTitle: "Recipe Title",
    addIngredient: "Add Ingredient",
    ingredient: "Ingredient",
    amount: "Amount",
    unit: "Unit",
    price: "Price",
    totalCalories: "Total Calories",
    totalProtein: "Total Protein",
    totalCarbs: "Total Carbs",
    totalFat: "Total Fat",
    perServing: "Per Serving",
    per100g: "Per 100g",
    totalCost: "Total Cost",
    costPerServing: "Cost Per Serving",
    saveRecipe: "Save Recipe",
    loadRecipe: "Load Recipe",
    scanIngredient: "Scan Ingredient",
    adjustRecipe: "Adjust Recipe",
    recalculate: "Recalculate",
    alternativeIngredients: "Alternative Ingredients",
    shoppingList: "Shopping List",
    addToMealPlan: "Add to Meal Plan",
    recipeRecommendations: "Recipe Recommendations",
    nutritionTips: "Nutrition Tips",
    myRecipes: "My Recipes",
    popularRecipes: "Popular Recipes",
    newRecipe: "New Recipe",
    editRecipe: "Edit Recipe",
    gram: "gram",
    ml: "ml",
    tbsp: "tbsp",
    tsp: "tsp",
    cup: "cup",
    piece: "piece",
    nutritionFacts: "Nutrition Facts",
    calories: "Calories",
    calculationBasis: "Calculation Basis",
    byServings: "By Servings",
    byWeight: "By Weight",
    targetServings: "Target Servings",
    targetWeight: "Target Weight (g)",
    calculateBy: "Calculate By"
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
      // Force reload to apply translations everywhere
      window.location.reload();
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

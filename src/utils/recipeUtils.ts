
import { Ingredient } from "@/types/recipe";
import { useLanguage } from "@/context/LanguageContext";

export const formatNumber = (num: number) => {
  return Math.round(num * 10) / 10;
};

export const getIngredientDisplayName = (key: string, language: string) => {
  const translations: Record<string, Record<string, string>> = {
    ru: {
      "chicken_breast": "Куриная грудка",
      "rice": "Рис",
      "potato": "Картофель",
      "egg": "Яйцо",
      "milk": "Молоко",
      "flour": "Мука",
      "butter": "Масло",
      "sugar": "Сахар",
      "oil": "Масло растительное",
      "carrot": "Морковь",
      "onion": "Лук",
      "tomato": "Томаты",
      "cheese": "Сыр"
    },
    en: {
      "chicken_breast": "Chicken Breast",
      "rice": "Rice",
      "potato": "Potato",
      "egg": "Egg",
      "milk": "Milk",
      "flour": "Flour",
      "butter": "Butter",
      "sugar": "Sugar",
      "oil": "Oil",
      "carrot": "Carrot",
      "onion": "Onion",
      "tomato": "Tomato",
      "cheese": "Cheese"
    }
  };
  
  return language === 'ru' ? translations.ru[key] || key : translations.en[key] || key;
};

export const calculateTotals = (ingredients: Ingredient[]) => {
  return ingredients.reduce((acc, ingredient) => {
    const factor = ingredient.amount / 100;
    return {
      calories: acc.calories + ingredient.calories * factor,
      protein: acc.protein + ingredient.protein * factor,
      carbs: acc.carbs + ingredient.carbs * factor,
      fat: acc.fat + ingredient.fat * factor,
      price: acc.price + ingredient.price * factor
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, price: 0 });
};

export const calculatePerServing = (totals: { 
  calories: number; 
  protein: number; 
  carbs: number; 
  fat: number; 
  price: number;
}, servings: number) => {
  return {
    calories: totals.calories / servings,
    protein: totals.protein / servings,
    carbs: totals.carbs / servings,
    fat: totals.fat / servings,
    price: totals.price / servings
  };
};

export const calculatePer100g = (totals: { 
  calories: number; 
  protein: number; 
  carbs: number; 
  fat: number; 
  price: number;
}, recipeWeight: number) => {
  return {
    calories: (totals.calories / recipeWeight) * 100,
    protein: (totals.protein / recipeWeight) * 100,
    carbs: (totals.carbs / recipeWeight) * 100,
    fat: (totals.fat / recipeWeight) * 100,
    price: (totals.price / recipeWeight) * 100
  };
};

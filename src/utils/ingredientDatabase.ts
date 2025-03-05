
export const ingredientDatabase: Record<string, { 
  calories: number; 
  protein: number; 
  carbs: number; 
  fat: number; 
  price: number;
}> = {
  "chicken_breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6, price: 320 },
  "rice": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, price: 90 },
  "potato": { calories: 77, protein: 2, carbs: 17, fat: 0.1, price: 60 },
  "egg": { calories: 155, protein: 13, carbs: 1.1, fat: 11, price: 120 },
  "milk": { calories: 42, protein: 3.4, carbs: 5, fat: 1, price: 80 },
  "flour": { calories: 364, protein: 10, carbs: 76, fat: 1, price: 70 },
  "butter": { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, price: 560 },
  "sugar": { calories: 387, protein: 0, carbs: 100, fat: 0, price: 90 },
  "oil": { calories: 884, protein: 0, carbs: 0, fat: 100, price: 130 },
  "carrot": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, price: 60 },
  "onion": { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, price: 50 },
  "tomato": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, price: 150 },
  "cheese": { calories: 402, protein: 25, carbs: 1.3, fat: 33, price: 450 }
};

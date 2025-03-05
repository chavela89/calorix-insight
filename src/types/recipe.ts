
export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
}

export interface Recipe {
  id: number;
  name: string;
  servings: number;
  weight: number;
  ingredients: Ingredient[];
  date: string;
}

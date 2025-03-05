
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { Ingredient, Recipe } from "@/types/recipe";
import { ingredientDatabase } from "@/utils/ingredientDatabase";
import { formatNumber, getIngredientDisplayName, calculateTotals, calculatePerServing, calculatePer100g } from "@/utils/recipeUtils";

import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeForm from "@/components/recipe/RecipeForm";
import NutritionCard from "@/components/recipe/NutritionCard";
import RecipeAdjuster from "@/components/recipe/RecipeAdjuster";

const RecipeCalculator = () => {
  const { t, language } = useLanguage();
  const [recipeName, setRecipeName] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("servings");
  const [servings, setServings] = useState(4);
  const [recipeWeight, setRecipeWeight] = useState(1000);
  const [targetServings, setTargetServings] = useState(4);
  const [targetWeight, setTargetWeight] = useState(1000);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState("g");
  
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      try {
        const recipes = JSON.parse(savedRecipes);
        
        if (recipes.length > 0) {
          const lastRecipe = recipes[recipes.length - 1];
          loadRecipe(lastRecipe);
        } else {
          toast.info(t.loadRecipe, {
            description: t.language === 'ru' 
              ? 'У вас еще нет сохраненных рецептов' 
              : 'You don\'t have any saved recipes yet'
          });
        }
      } catch (e) {
        console.error('Error loading recipes:', e);
        toast.error(t.loadRecipe, {
          description: t.language === 'ru' 
            ? 'Ошибка при загрузке рецептов' 
            : 'Error loading recipes'
        });
      }
    } else {
      toast.info(t.loadRecipe, {
        description: t.language === 'ru' 
          ? 'У вас еще нет сохраненных рецептов' 
          : 'You don\'t have any saved recipes yet'
      });
    }
  }, [t]);
  
  const addIngredient = () => {
    if (!selectedIngredient) {
      toast.error(t.ingredient, {
        description: language === 'ru' ? "Пожалуйста, выберите ингредиент" : "Please select an ingredient"
      });
      return;
    }
    
    const ingredientData = ingredientDatabase[selectedIngredient];
    if (!ingredientData) return;
    
    const newIngredient: Ingredient = {
      id: `${selectedIngredient}_${Date.now()}`,
      name: getIngredientDisplayName(selectedIngredient, language),
      amount,
      unit,
      calories: ingredientData.calories,
      protein: ingredientData.protein,
      carbs: ingredientData.carbs,
      fat: ingredientData.fat,
      price: ingredientData.price
    };
    
    setIngredients([...ingredients, newIngredient]);
    
    setSelectedIngredient("");
    setAmount(100);
    setUnit("g");
    
    toast.success(t.addIngredient, {
      description: `${newIngredient.name} (${amount}${unit}) ${t.add}`
    });
  };
  
  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };
  
  const saveRecipe = () => {
    if (!recipeName) {
      toast.error(t.recipeTitle, {
        description: language === 'ru' ? "Пожалуйста, введите название рецепта" : "Please enter a recipe title"
      });
      return;
    }
    
    if (ingredients.length === 0) {
      toast.error(t.ingredients, {
        description: language === 'ru' ? "Добавьте хотя бы один ингредиент" : "Add at least one ingredient"
      });
      return;
    }
    
    const recipe: Recipe = {
      id: Date.now(),
      name: recipeName,
      servings,
      weight: recipeWeight,
      ingredients,
      date: new Date().toISOString()
    };
    
    const savedRecipes = localStorage.getItem('recipes');
    let recipes: Recipe[] = [];
    
    if (savedRecipes) {
      try {
        recipes = JSON.parse(savedRecipes);
      } catch (e) {
        console.error('Error parsing saved recipes:', e);
      }
    }
    
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    toast.success(t.saveRecipe, {
      description: `${recipeName} ${t.save}`
    });
  };
  
  const recalculateRecipe = () => {
    if (ingredients.length === 0) {
      toast.error(t.ingredients, {
        description: language === 'ru' ? "Добавьте хотя бы один ингредиент" : "Add at least one ingredient"
      });
      return;
    }
    
    let factor;
    if (calculationMethod === "servings") {
      factor = targetServings / servings;
      setServings(targetServings);
    } else {
      factor = targetWeight / recipeWeight;
      setRecipeWeight(targetWeight);
    }
    
    const newIngredients = ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount * factor
    }));
    
    setIngredients(newIngredients);
    
    toast.success(t.recalculate, {
      description: language === 'ru' ? "Рецепт успешно пересчитан" : "Recipe successfully recalculated"
    });
  };
  
  const handleLoadRecipe = () => {
    const savedRecipes = localStorage.getItem('recipes');
    
    if (savedRecipes) {
      try {
        const recipes = JSON.parse(savedRecipes);
        
        if (recipes.length > 0) {
          const lastRecipe = recipes[recipes.length - 1];
          loadRecipe(lastRecipe);
        } else {
          toast.info(t.loadRecipe, {
            description: t.language === 'ru' 
              ? 'У вас еще нет сохраненных рецептов' 
              : 'You don\'t have any saved recipes yet'
          });
        }
      } catch (e) {
        console.error('Error loading recipes:', e);
        toast.error(t.loadRecipe, {
          description: t.language === 'ru' 
            ? 'Ошибка при загрузке рецептов' 
            : 'Error loading recipes'
        });
      }
    } else {
      toast.info(t.loadRecipe, {
        description: t.language === 'ru' 
          ? 'У вас еще нет сохраненных рецептов' 
          : 'You don\'t have any saved recipes yet'
      });
    }
  };
  
  const loadRecipe = (recipe: Recipe) => {
    setRecipeName(recipe.name);
    setServings(recipe.servings);
    setRecipeWeight(recipe.weight);
    setIngredients(recipe.ingredients);
  };

  // Wrapper functions to pass to child components
  const calcTotals = () => calculateTotals(ingredients);
  const calcPerServing = (totals: any) => calculatePerServing(totals, servings);
  const calcPer100g = (totals: any) => calculatePer100g(totals, recipeWeight);
  const getIngredientName = (key: string) => getIngredientDisplayName(key, language);
  
  return (
    <div className="container max-w-7xl mx-auto py-6">
      <RecipeHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecipeForm 
            recipeName={recipeName}
            servings={servings}
            recipeWeight={recipeWeight}
            ingredients={ingredients}
            selectedIngredient={selectedIngredient}
            amount={amount}
            unit={unit}
            setRecipeName={setRecipeName}
            setServings={setServings}
            setRecipeWeight={setRecipeWeight}
            setSelectedIngredient={setSelectedIngredient}
            setAmount={setAmount}
            setUnit={setUnit}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            saveRecipe={saveRecipe}
            handleLoadRecipe={handleLoadRecipe}
            getIngredientDisplayName={getIngredientName}
            formatNumber={formatNumber}
            ingredientDatabase={ingredientDatabase}
          />
        </div>
        
        <div className="space-y-6">
          <NutritionCard 
            ingredients={ingredients}
            calculateTotals={calcTotals}
            calculatePerServing={calcPerServing}
            calculatePer100g={calcPer100g}
            formatNumber={formatNumber}
          />
          
          <RecipeAdjuster 
            calculationMethod={calculationMethod}
            targetServings={targetServings}
            targetWeight={targetWeight}
            setCalculationMethod={setCalculationMethod}
            setTargetServings={setTargetServings}
            setTargetWeight={setTargetWeight}
            recalculateRecipe={recalculateRecipe}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCalculator;

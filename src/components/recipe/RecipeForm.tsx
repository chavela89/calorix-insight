
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save, Upload, ScanBarcode, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { Ingredient } from "@/types/recipe";

interface RecipeFormProps {
  recipeName: string;
  servings: number;
  recipeWeight: number;
  ingredients: Ingredient[];
  selectedIngredient: string;
  amount: number;
  unit: string;
  setRecipeName: (name: string) => void;
  setServings: (servings: number) => void;
  setRecipeWeight: (weight: number) => void;
  setSelectedIngredient: (ingredient: string) => void;
  setAmount: (amount: number) => void;
  setUnit: (unit: string) => void;
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  saveRecipe: () => void;
  handleLoadRecipe: () => void;
  getIngredientDisplayName: (key: string) => string;
  formatNumber: (num: number) => number;
  ingredientDatabase: Record<string, any>;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeName,
  servings,
  recipeWeight,
  ingredients,
  selectedIngredient,
  amount,
  unit,
  setRecipeName,
  setServings,
  setRecipeWeight,
  setSelectedIngredient,
  setAmount,
  setUnit,
  addIngredient,
  removeIngredient,
  saveRecipe,
  handleLoadRecipe,
  getIngredientDisplayName,
  formatNumber,
  ingredientDatabase
}) => {
  const { t, language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.recipeTitle}</CardTitle>
        <CardDescription>{t.ingredients}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-4">
          <Label htmlFor="recipe-name">{t.recipeTitle}</Label>
          <Input 
            id="recipe-name" 
            value={recipeName} 
            onChange={(e) => setRecipeName(e.target.value)} 
            placeholder={language === 'ru' ? "Введите название рецепта" : "Enter recipe name"}
            className="mt-2"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="servings">{t.servings}</Label>
            <Input 
              id="servings" 
              type="number" 
              min="1" 
              value={servings} 
              onChange={(e) => setServings(parseInt(e.target.value) || 1)} 
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="weight">{t.weight} (g)</Label>
            <Input 
              id="weight" 
              type="number" 
              min="1" 
              value={recipeWeight} 
              onChange={(e) => setRecipeWeight(parseInt(e.target.value) || 1)} 
              className="mt-2"
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{t.ingredients}</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toast.info(t.scanIngredient, { description: language === 'ru' ? "Функция будет доступна в следующем обновлении" : "This feature will be available in the next update" })}
            >
              <ScanBarcode className="h-4 w-4 mr-2" />
              {t.scanIngredient}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="ingredient">{t.ingredient}</Label>
              <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                <SelectTrigger id="ingredient" className="mt-2">
                  <SelectValue placeholder={language === 'ru' ? "Выберите ингредиент" : "Select ingredient"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(ingredientDatabase).map(key => (
                    <SelectItem key={key} value={key}>
                      {getIngredientDisplayName(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">{t.amount}</Label>
              <Input 
                id="amount" 
                type="number" 
                min="1" 
                value={amount} 
                onChange={(e) => setAmount(parseInt(e.target.value) || 1)} 
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="unit">{t.unit}</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">{t.gram}</SelectItem>
                  <SelectItem value="ml">{t.ml}</SelectItem>
                  <SelectItem value="tbsp">{t.tbsp}</SelectItem>
                  <SelectItem value="tsp">{t.tsp}</SelectItem>
                  <SelectItem value="pcs">{t.piece}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={addIngredient}>
            <Plus className="h-4 w-4 mr-2" />
            {t.addIngredient}
          </Button>
          
          {ingredients.length > 0 && (
            <div className="mt-4">
              <div className="bg-muted p-2 rounded grid grid-cols-6 gap-2 text-sm font-medium">
                <div className="col-span-2">{t.ingredient}</div>
                <div>{t.amount}</div>
                <div>{t.calories}</div>
                <div>{t.protein}</div>
                <div></div>
              </div>
              {ingredients.map(ingredient => (
                <div key={ingredient.id} className="p-2 border-b grid grid-cols-6 gap-2 items-center">
                  <div className="col-span-2">{ingredient.name}</div>
                  <div>{formatNumber(ingredient.amount)} {ingredient.unit}</div>
                  <div>{formatNumber(ingredient.calories * ingredient.amount / 100)}</div>
                  <div>{formatNumber(ingredient.protein * ingredient.amount / 100)}g</div>
                  <div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeIngredient(ingredient.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleLoadRecipe}>
          <Upload className="h-4 w-4 mr-2" />
          {t.loadRecipe}
        </Button>
        <Button onClick={saveRecipe}>
          <Save className="h-4 w-4 mr-2" />
          {t.saveRecipe}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeForm;

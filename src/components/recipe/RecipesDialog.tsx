
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ArrowRightCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Recipe } from "@/types/recipe";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface RecipesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipesDialog: React.FC<RecipesDialogProps> = ({ open, onOpenChange, onSelectRecipe }) => {
  const { t } = useLanguage();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      loadRecipes();
    }
  }, [open]);

  const loadRecipes = () => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      try {
        const parsedRecipes = JSON.parse(savedRecipes);
        setRecipes(parsedRecipes);
      } catch (e) {
        console.error('Error parsing saved recipes:', e);
        toast.error(t.loadRecipe, {
          description: t.language === 'ru' 
            ? 'Ошибка при загрузке рецептов' 
            : 'Error loading recipes'
        });
      }
    }
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipeToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (recipeToDelete === null) return;

    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeToDelete);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
    
    toast.success(t.delete, {
      description: t.language === 'ru' 
        ? 'Рецепт успешно удален' 
        : 'Recipe successfully deleted'
    });
    
    setConfirmDeleteOpen(false);
    setRecipeToDelete(null);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    onSelectRecipe(recipe);
    onOpenChange(false);
    
    toast.success(t.loadRecipe, {
      description: t.language === 'ru' 
        ? 'Рецепт успешно загружен' 
        : 'Recipe successfully loaded'
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.savedRecipes}</DialogTitle>
            <DialogDescription>
              {t.language === 'ru' 
                ? 'Выберите рецепт для загрузки или удаления' 
                : 'Select a recipe to load or delete'}
            </DialogDescription>
          </DialogHeader>
          
          {recipes.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              {t.noSavedRecipes}
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              {recipes.map((recipe) => (
                <div 
                  key={recipe.id} 
                  className="mb-2 p-3 border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{recipe.name}</h4>
                      <div className="text-sm text-muted-foreground flex gap-2">
                        <span>{t.servings}: {recipe.servings}</span>
                        <span>•</span>
                        <span>{t.weight}: {recipe.weight}g</span>
                        <span>•</span>
                        <span>
                          {t.ingredients}: {recipe.ingredients.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      <Button
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSelectRecipe(recipe)}
                      >
                        <ArrowRightCircle className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirmDelete}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.language === 'ru' 
                ? 'Вы уверены, что хотите удалить этот рецепт? Это действие нельзя отменить.' 
                : 'Are you sure you want to delete this recipe? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RecipesDialog;

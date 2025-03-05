
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

interface RecipeAdjusterProps {
  calculationMethod: string;
  targetServings: number;
  targetWeight: number;
  setCalculationMethod: (method: string) => void;
  setTargetServings: (servings: number) => void;
  setTargetWeight: (weight: number) => void;
  recalculateRecipe: () => void;
}

const RecipeAdjuster: React.FC<RecipeAdjusterProps> = ({
  calculationMethod,
  targetServings,
  targetWeight,
  setCalculationMethod,
  setTargetServings,
  setTargetWeight,
  recalculateRecipe
}) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.adjustRecipe}</CardTitle>
        <CardDescription>{t.recalculate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>{t.calculationBasis}</Label>
            <Select 
              value={calculationMethod} 
              onValueChange={setCalculationMethod}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="servings">{t.byServings}</SelectItem>
                <SelectItem value="weight">{t.byWeight}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {calculationMethod === "servings" ? (
            <div>
              <Label htmlFor="target-servings">{t.targetServings}</Label>
              <Input 
                id="target-servings" 
                type="number" 
                min="1" 
                value={targetServings} 
                onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)} 
                className="mt-2"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="target-weight">{t.targetWeight}</Label>
              <Input 
                id="target-weight" 
                type="number" 
                min="1" 
                value={targetWeight} 
                onChange={(e) => setTargetWeight(parseInt(e.target.value) || 1)} 
                className="mt-2"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={recalculateRecipe}>
          <Calculator className="h-4 w-4 mr-2" />
          {t.recalculate}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeAdjuster;

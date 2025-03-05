
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const RecipeHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <h1 className="text-3xl font-bold mb-6">{t.recipeCalculator}</h1>
  );
};

export default RecipeHeader;

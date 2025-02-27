
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeType } from "@/types";

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Get theme from local storage or use default
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    return savedTheme || "light";
  });

  useEffect(() => {
    // Update local storage when theme changes
    localStorage.setItem("theme", theme);
    
    // Update document class
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "creamy", "blue-gray");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

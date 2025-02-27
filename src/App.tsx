
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import Statistics from "./pages/Statistics";
import Planner from "./pages/Planner";
import Recommendations from "./pages/Recommendations";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Health from "./pages/Health";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="nutrition" element={<Nutrition />} />
              <Route path="progress" element={<Progress />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="planner" element={<Planner />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="profile" element={<Profile />} />
              <Route path="health" element={<Health />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

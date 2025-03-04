
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, SettingsIcon, Monitor, Bell, CreditCard, Globe, HelpCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type SettingsSidebarProps = {
  handleSectionClick: (section: string) => void;
  handleLogout: () => void;
};

const SettingsSidebar = ({ handleSectionClick, handleLogout }: SettingsSidebarProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <div className="p-4 border-b">
        <h3 className="font-medium">{t.sections}</h3>
      </div>
      <CardContent className="p-0">
        <nav className="flex flex-col">
          <a href="#account" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.account)}>
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <span>{t.account}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
          <a href="#appearance" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.appearance)}>
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-primary" />
              <span>{t.appearance}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
          <a href="#notifications" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.notifications)}>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <span>{t.notifications}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
          <a href="#billing" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.subscription)}>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>{t.subscription}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
          <a href="#language" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.language)}>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <span>{t.language}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
          <a href="#help" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-md" onClick={() => handleSectionClick(t.help)}>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>{t.help}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
        </nav>
      </CardContent>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full text-destructive justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {t.logout}
        </Button>
      </div>
    </Card>
  );
};

export default SettingsSidebar;

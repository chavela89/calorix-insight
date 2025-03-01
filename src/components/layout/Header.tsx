
import React from "react";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react"; // Changed from UserButton to User2 icon
import { BellIcon, ArrowLeft, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="border-b flex justify-between items-center h-14 px-4 sticky top-0 bg-background z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">CaloriX</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User2 className="h-5 w-5" /> {/* Changed to use User2 icon directly */}
        </Button>
      </div>
    </header>
  );
}

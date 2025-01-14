"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const themes = [
    { name: "Light", value: "light", color: "bg-white" },
    { name: "Dark", value: "dark", color: "bg-black" },
    { name: "Solarized", value: "solarized-theme", color: "bg-yellow-200" },
    { name: "Vibrant", value: "vibrant-theme", color: "bg-rose-500" },
    { name: "Spotify", value: "spotify-theme", color: "bg-emerald-400" },
    { name: "System", value: "system", color: "bg-gray-500" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setTheme(theme.value)}
          >
            <span
              className={cn(
                "inline-block w-3 h-3 mr-2 rounded-full",
                theme.color
              )}
            ></span>
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

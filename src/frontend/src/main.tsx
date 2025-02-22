"use client";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

import "@/styles.css";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="text-foreground bg-background h-dvh w-full">
          <App />
        </div>
      </NextThemesProvider>
    </HeroUIProvider>
  </StrictMode>
);

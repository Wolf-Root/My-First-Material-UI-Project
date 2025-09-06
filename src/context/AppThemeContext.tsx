"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useContext } from "react";
import type {} from "@mui/material/themeCssVarsAugmentation";
import customTheme from "@/customTheme";

const AppThemeContext = createContext(null);

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppThemeContext.Provider value={null}>
      <ThemeProvider theme={customTheme} defaultMode="system">
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(AppThemeContext);

export default AppThemeProvider;

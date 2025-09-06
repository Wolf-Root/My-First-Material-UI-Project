import { createTheme, responsiveFontSizes } from "@mui/material";

const customTheme = responsiveFontSizes(
  createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
      disableCssColorScheme: true,
    },

    typography: {
      fontFamily: `'Inter', sans-serif`,
      h1: { fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2 },
      h2: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.3 },
      h3: { fontWeight: 500, fontSize: "1.75rem", lineHeight: 1.3 },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.5 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 12 },

    colorSchemes: {
      light: {
        palette: {
          primary: { main: "hsl(220, 80%, 45%)", contrastText: "#fff" },
          secondary: { main: "hsl(40, 85%, 50%)", contrastText: "#fff" },
          success: { main: "hsl(150, 60%, 35%)" },
          error: { main: "hsl(0, 75%, 50%)" },
          warning: { main: "hsl(40, 85%, 50%)" },
          info: { main: "hsl(200, 85%, 50%)" },
          background: {
            default: "#f7f8fa",
            paper: "#ffffff",
          },
          text: {
            primary: "#111827",
            secondary: "#4b5563",
          },
        },
      },

      dark: {
        palette: {
          primary: { main: "hsl(220, 80%, 60%)", contrastText: "#fff" },
          secondary: { main: "hsl(40, 85%, 55%)", contrastText: "#fff" },
          success: { main: "hsl(150, 60%, 45%)" },
          error: { main: "hsl(0, 75%, 55%)" },
          warning: { main: "hsl(40, 85%, 55%)" },
          info: { main: "hsl(200, 85%, 55%)" },
          background: {
            default: "#111827",
            paper: "#1f2937",
          },
          text: {
            primary: "#f9fafb",
            secondary: "#d1d5db",
          },
        },
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "8px 20px",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          },
        },
      },
    },
  })
);

export default customTheme;

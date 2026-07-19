import { createTheme } from "@mui/material/styles";

// Thème MUI global — couleurs alignées sur la charte existante (#f86c6b),
// introduit pour la carte produit (FoodItem) et destiné à être étendu au
// reste du site progressivement (voir CLAUDE.md).
export const theme = createTheme({
  palette: {
    primary: {
      main: "#f86c6b",
    },
    secondary: {
      main: "#2e7d32",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Open Sans', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

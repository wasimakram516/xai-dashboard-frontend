import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#128199" },
    secondary: { main: "#ffcc00" },
    background: { default: "#f9f9f9", paper: "#ffffff" },
    text: { primary: "#033649", secondary: "#555" },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
    htmlFontSize: 16,
    h1: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "2.75rem",
      fontWeight: "700",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "2.25rem",
      fontWeight: "700",
      lineHeight: 1.24,
    },
    h3: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "1.85rem",
      fontWeight: "700",
      lineHeight: 1.28,
    },
    h4: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "1.6rem",
      fontWeight: "700",
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "1.35rem",
      fontWeight: "700",
      lineHeight: 1.34,
    },
    h6: {
      fontFamily: "'Comfortaa', cursive",
      fontSize: "1.15rem",
      lineHeight: 1.38,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.65,
      fontFamily: "'Poppins', sans-serif",
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle1: { fontSize: "0.95rem", lineHeight: 1.5, fontWeight: 500 },
    subtitle2: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: 500 },
    caption: { fontSize: "0.82rem", lineHeight: 1.45 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },

  shape: { borderRadius: 12 },

  components: {
    // === Buttons ===
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          fontSize: "0.95rem",
          padding: "10px 18px",
          fontWeight: 600,
          textTransform: "none",
          lineHeight: 1.35,
          transition: "all 0.2s ease",
        },

        // === CONTAINED VARIANTS ===
        containedPrimary: {
          backgroundColor: "#0077b6",
          color: "#ffffff",
          boxShadow: "0px 10px 32px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
          },
        },
        containedSecondary: {
          backgroundColor: "#ffcc00",
          color: "#333333",
          boxShadow: "0px 10px 32px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
          },
        },
        containedError: {
          backgroundColor: "#d32f2f",
          color: "#ffffff",
          boxShadow: "0px 10px 32px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
          },
        },
        containedInfo: {
          backgroundColor: "#0288d1",
          color: "#ffffff",
          boxShadow: "0px 10px 32px rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: "#0277bd",
            transform: "scale(1.02)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
          },
        },

        // === OUTLINED VARIANTS ===
        outlinedPrimary: {
          color: "#0077b6",
          borderColor: "#0077b6",
          "&:hover": {
            backgroundColor: "rgba(0, 119, 182, 0.08)",
            transform: "scale(1.03)",
          },
        },
        outlinedSecondary: {
          color: "#ffcc00",
          borderColor: "#ffcc00",
          "&:hover": {
            backgroundColor: "rgba(255, 204, 0, 0.08)",
            transform: "scale(1.03)",
          },
        },
        outlinedError: {
          color: "#d32f2f",
          borderColor: "#d32f2f",
          "&:hover": {
            backgroundColor: "rgba(211, 47, 47, 0.08)",
            transform: "scale(1.03)",
          },
        },
        outlinedInfo: {
          color: "#0288d1",
          borderColor: "#0288d1",
          "&:hover": {
            backgroundColor: "rgba(2, 136, 209, 0.08)",
            transform: "scale(1.03)",
          },
        },
      },
    },

    // === Paper Variants ===
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 10,
          margin: "2px 6px",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "1.05rem",
          lineHeight: 1.35,
          fontWeight: 500,
        },
        secondary: {
          fontSize: "0.92rem",
          lineHeight: 1.4,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 28,
          borderRadius: 999,
          fontSize: "0.84rem",
          fontWeight: 500,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
        indicator: {
          height: 3,
          borderRadius: 3,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 44,
          paddingLeft: 14,
          paddingRight: 14,
          fontSize: "0.92rem",
          fontWeight: 600,
          textTransform: "none",
          letterSpacing: "0.01em",
        },
      },
    },

    // === Inputs Direction & Alignment ===
    MuiInputBase: {
      styleOverrides: {
        input: {
          lineHeight: 1.45,
          "&[dir='rtl'], [dir='rtl'] &": {
            textAlign: "right !important",
          },
          "&[dir='ltr'], [dir='ltr'] &": {
            textAlign: "left !important",
          },
        },
      },
    },

    // === Floating Label (RTL + Notched Outline Flip) ===
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&[dir='rtl'], [dir='rtl'] &": {
            right: 30,
            left: "auto",
            textAlign: "right",
            transformOrigin: "top right",
          },
          "&[dir='ltr'], [dir='ltr'] &": {
            right: "auto",
            textAlign: "left",
            transformOrigin: "top left",
          },
        },
      },
    },

    // === Outlined Input Fix for RTL Notch ===
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "30px",
          overflow: "hidden",
          "&&.MuiOutlinedInput-multiline": { borderRadius: "16px" },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#128199",
            borderRadius: "inherit",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0077b6",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0077b6",
          },
        },
        input: {
          paddingTop: 11,
          paddingBottom: 11,
        },
      },
    },

    // === Select Fields ===
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "30px",
          overflow: "hidden",
          "&:focus": { backgroundColor: "rgba(255,255,255,0.9)" },
        },
        icon: { color: "#128199", right: 16 },
      },
    },
  },
});

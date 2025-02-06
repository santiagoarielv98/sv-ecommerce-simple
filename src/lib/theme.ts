"use client";

import { createTheme } from "@mui/material/styles";

const ecommerceTheme = createTheme({
  defaultColorScheme: "dark",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2A5C8D", // Azul profesional
          light: "#5D8AB4",
          dark: "#1A3A5C",
        },
        secondary: {
          main: "#FF7F50", // Coral vibrante
          light: "#FFA07A",
          dark: "#CC6540",
        },
        error: {
          main: "#E74C3C",
        },
        success: {
          main: "#2ECC71", // Verde para indicar acciones positivas
        },
        background: {
          default: "#F8F9FA", // Fondo gris claro
          paper: "#FFFFFF", // Fondo para tarjetas y componentes
        },
        text: {
          primary: "#2C3E50", // Texto oscuro principal
          secondary: "#7F8C8D", // Texto secundario
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#90CAF9", // Azul más claro para modo oscuro
          light: "#B3E5FC",
          dark: "#42A5F5",
        },
        secondary: {
          main: "#FF9E80", // Coral más suave para modo oscuro
          light: "#FFAB91",
          dark: "#FF7043",
        },
        error: {
          main: "#EF5350",
        },
        success: {
          main: "#66BB6A",
        },
        background: {
          default: "#121212", // Fondo oscuro estándar de Material Design
          paper: "#1E1E1E", // Un poco más claro que el fondo para contraste
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0BEC5",
        },
        action: {
          active: "#FFFFFF",
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.16)",
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
        },
        divider: "rgba(255, 255, 255, 0.12)",
      },
    },
  },
  typography: (palette) => ({
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: palette.primary.main,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: palette.primary.main,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none", // Elimina mayúsculas automáticas en botones
      fontWeight: 600,
    },
  }),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "12px 24px",
        },
        containedPrimary: ({ theme }) => ({
          boxShadow: theme.shadows[1],
          "&:hover": {
            boxShadow: theme.shadows[2],
          },
        }),
        outlinedSecondary: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          boxShadow: theme.shadows[1],
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[3],
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.action.hover,
          borderRadius: "8px",
        }),
        rectangular: {
          borderRadius: "12px",
        },
      },
      defaultProps: {
        animation: "wave",
      },
    },
    // MuiSnackbar: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       "& .MuiAlert-root": {
    //         borderRadius: "12px",
    //         alignItems: "center",
    //       },
    //       "& .MuiAlert-filledSuccess": {
    //         backgroundColor: theme.palette.success.main,
    //       },
    //       "& .MuiAlert-filledError": {
    //         backgroundColor: theme.palette.error.main,
    //       },
    //     }),
    //   },
    // },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.light,
              borderWidth: "2px",
            },
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTableCell-root": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiTableRow-root:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
  },
});

export default ecommerceTheme;

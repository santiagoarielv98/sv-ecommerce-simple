"use client";

import { createTheme } from "@mui/material/styles";

const ecommerceTheme = createTheme({
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
  typography: {
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
      color: "#2C3E50",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2A5C8D",
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "12px 24px",
        },
        containedPrimary: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        },
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
        root: {
          backgroundColor: "#FFFFFF",
          color: "#2C3E50",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#2A5C8D",
          fontWeight: 500,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },

    // 3. Loading Skeletons
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
        },
        rectangular: {
          borderRadius: "12px",
        },
      },
      defaultProps: {
        animation: "wave",
      },
    },

    // 4. Notificaciones/Snackbars
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiAlert-root": {
            borderRadius: "12px",
            alignItems: "center",
          },
          "& .MuiAlert-filledSuccess": {
            backgroundColor: theme.palette.success.main,
          },
          "& .MuiAlert-filledError": {
            backgroundColor: theme.palette.error.main,
          },
        }),
      },
    },

    // 5. Formularios y Inputs
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.light,
              borderWidth: "2px",
            },
          },
        }),
      },
    },

    // 6. Botones Específicos

    // 7. Paginación
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

    // 8. Tablas de Pedidos
    MuiTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTableCell-root": {
            boderBottom: `1px solid ${theme.palette.background.default}`,
          },
          "& .MuiTableRow-root:hover": {
            backgroundColor: theme.palette.background.default,
          },
        }),
      },
    },
  },
  custom: {
    spacing: {
      sectionPadding: "80px 0",
    },
    shadows: {
      productCard: "0 4px 12px rgba(0,0,0,0.1)",
    },
    maxContainerWidth: 1440,
  },
});

export default ecommerceTheme;

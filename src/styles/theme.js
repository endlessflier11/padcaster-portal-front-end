import { createTheme } from "@mui/material";

export const padTheme = createTheme({
  palette: {
    primary: {
      main: "#ff671b"
    },
    secondary: {
      main: "#333333"
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          borderRadius: 4,
          fontWeight: "bold",
        },
        containedPrimary: {
          color: 'white',
        }
      },
      defaultProps: {
        variant: "text",
        disableRipple: true,
        disableElevation: true,
      }
    },
    TextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        variant: "outlined",
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // backgroundColor: '#F4F5F7'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          // border: '1px solid #DFE1E6',
          '@media screen and (max-width: 600px)': {
            margin: '1rem !important',
          },
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '1.5rem 3rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          background: '#f4f4f4',

          '@media screen and (max-width: 600px)': {
            padding: '1.5rem !important',
          },

          '@media screen and (min-width: 600px)': {
            padding: '1.5rem 3rem !important',
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          // background: 'white'
        },
        notchedOutline: {
          // border: 0
        }
      }
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          color: 'white'
        }
      }
    }
  },
  spacing: 8,
});

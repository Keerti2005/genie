import { PaletteMode, alpha, createTheme, Components, Theme } from '@mui/material';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

const defaultTheme = createTheme();
const customShadows = [...defaultTheme.shadows];

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px'
      : 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: green[300],
        main: green[500],
        dark: green[700],
        contrastText: '#fff',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: green[800],
        secondary: green[600],
      },
      divider: green[100],
      grey: { ...gray },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  };
};

export const inputsCustomizations: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
      containedPrimary: {
        backgroundColor: green[500],
        color: '#fff',
        '&:hover': {
          backgroundColor: green[600],
        },
        '&:active': {
          backgroundColor: green[700],
        },
      },
      outlined: {
        color: green[700],
        borderColor: green[300],
        '&:hover': {
          backgroundColor: green[50],
          borderColor: green[400],
        },
        '&:active': {
          backgroundColor: green[100],
        },
      },
      text: {
        color: green[700],
        '&:hover': {
          backgroundColor: green[50],
        },
        '&:active': {
          backgroundColor: green[100],
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: '#fff',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          borderColor: green[300],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          borderColor: green[500],
          boxShadow: `0 0 0 2px ${alpha(green[500], 0.2)}`,
        },
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'transparent' }} />,
      checkedIcon: <CheckRoundedIcon sx={{ height: 18, width: 18 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 18, width: 18 }} />,
    },
    styleOverrides: {
      root: {
        color: green[500],
        '&.Mui-checked': {
          color: green[500],
        },
      },
    },
  },
};

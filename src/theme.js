import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a custom Material-UI theme
let  theme = createTheme({
  palette: {
    primary: {
      main: "#d0312d", // Adjust the primary color
    },
    secondary: {
      main: "#ff4081", // Adjust the secondary color
    },
  },
  typography: {
    fontFamily: 'Pokemon Solid', 
    fontSize: 16,
    marginBlock: 0,
    h1: {
        fontFamily: 'Pokemon Hollow',
      fontSize: '4rem',
      fontWeight: 600,
      lineHeight: 1,
        letterSpacing: '0.00735em',
        marginBottom: '0.5em',
        textAlign: 'center',
    },
    h2: {
      fontSize: '2rem', 
      fontWeight: 300, 
      lineHeight: 2,
      letterSpacing: "0.01em",
    },
    // Add more typography styles as needed
  },
});
theme = responsiveFontSizes(theme);
export default theme;
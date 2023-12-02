import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a custom Material-UI theme
let theme = createTheme({
  
  palette: {
    mode: "dark",
    primary: {
      main: "#388e3c", // Adjust the primary color
    },
    secondary: {
      main: "#ff4081", // Adjust the secondary color
    },
  },
  typography: {
    fontFamily: "Pokemon Solid",
    fontWeight: 100,
    h1: {
      fontFamily: "Pokemon Hollow",
      fontSize: "4rem",
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "0.00735em",
      marginBottom: "0.5em",
      textAlign: "center",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
      lineHeight: 2,
      letterSpacing: "0.1em",
    },
    h3: {
      fontSize: "1.5rem",
      lineHeight: 1,
      letterSpacing: "0.1em",
    },
    h5: {
      fontSize: "1rem",
      lineHeight: 1,
      letterSpacing: "0.1em",
    },
    // Add more typography styles as needed
    body1: {
      fontSize: "1rem",
      letterSpacing: "0.2em",
      marginBlock: "10px",
    },
    body2: {
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
      marginBlock: "5px",
      textAlign: "center",
    },
    button: {
      color: "white",
      letterSpacing: "0.15em",
    },
    caption: {
      color: "yellow",
    },
  },
  

  components: {
    MuiLinearProgress: {
      styleOverrides: {

        root: {
          borderRadius: "10px",
          height: "10px",
          width: "100%",
        },
        bar: {
          borderRadius: "10px",
          backgroundColor: "green",
        },
      },
    },
  },

});
theme = responsiveFontSizes(theme);
export default theme;

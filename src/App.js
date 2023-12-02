import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import pokedex from "./images/pokedex.png";
import "./App.css";
import PokemonList from "./Pokemon/PokemonList";
import PokemonDetails from "./Pokemon/PokemonDetails";
import { HashRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import { Typography } from "@mui/material";

function App() {
  const titlefontSize = theme.typography.h1.fontSize; // Access the fontSize from the theme
  console.log(titlefontSize);
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <div className="background">
          <div className="background-image"></div>
        </div>
        <div className="App">
          <div className="App-header">
            <img
              src={pokedex}
              alt="pokedex"
              className="pokedex"
            />
            <Typography variant="h1" component="h1">
              The Great Pokedex
            </Typography>
            <img
              src={pokedex}
              alt="pokedex"
              className="pokedex"
              
            />
          </div>
          <div className="App-body">
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon" element={<PokemonDetails />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

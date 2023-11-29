import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./PokemonDetails.css";
function PokemonDetails() {
  const { state } = useLocation();
  console.log(state);
  if (!state || !state.pokemonData) {
    // Handle the case where state or pokemon is missing
    return <div>No Pokemon data found.</div>;
  }

  const pokemon  = state.pokemonData;
  console.log(pokemon);

  return (
    <div className="details">
      <div className="header">
        <h1>Pokemon Details</h1>
      </div>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />
        <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
        <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        <p>Abilities:</p>
        <ul>
          {pokemon.abilities.map((ability) => {
            return <li>{ability.ability.name}</li>;
          })}
        </ul>
        <p>Types:</p>
        <ul>
          {pokemon.types.map((type) => {
            return <li>{type.type.name}</li>;
          })}
        </ul>
        <p>Stats:</p>
        <ul>
          {pokemon.stats.map((stat) => {
            return (
              <li>
                {stat.stat.name}: {stat.base_stat}
              </li>
            );
          })}
        </ul>
        
    </div>

  );
}

export default PokemonDetails;

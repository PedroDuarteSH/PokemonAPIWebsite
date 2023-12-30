import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PokemonDetails.css";
import { Card, Typography } from "@mui/material";
import Helpers from "../Helpers";
import Table from "@mui/material/Table";
import LinearProgress from "@mui/material/LinearProgress";

function PokemonDetails() {
  const { state } = useLocation();
  const [images, setImages] = useState(null);
  if (!state || !state.pokemonData) {
    return <div>No Pokemon data found.</div>;
  }

  const pokemon = state.pokemonData;

  console.log(pokemon);

  return (
    <div className="details">
      <Card className="details-card details-header">
        <Typography variant="h2" component="h2">
          {Helpers.capitalizeFirstLetter(pokemon.name)}
        </Typography>
      </Card>

      <Card className="details-images">
        {pokemon.sprites.other["home"].front_default && (
          <img
            src={pokemon.sprites.other["home"].front_default}
            alt={pokemon.name}
          />
        )}
        {pokemon.sprites.other["official-artwork"].front_default && (
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        )}
        {pokemon.sprites.other["official-artwork"].front_shiny && (
          <img
            src={pokemon.sprites.other["official-artwork"].front_shiny}
            alt={pokemon.name}
          />
        )}

        {pokemon.sprites.other["home"].front_shiny && (
          <img
            src={pokemon.sprites.other["home"].front_shiny}
            alt={pokemon.name}
          />
        )}
      </Card>

      <Card className="details-card">
        <Typography variant="h3" component="h3" sx={{ paddingBottom: "20px" }}>
          Stats
        </Typography>
        <div className="details-stats-body">
          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            HP
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[0].base_stat}
            sx={{ width: "100px" }}
          />

          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            Attack
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[1].base_stat}
            sx={{ width: "100px" }}
          />

          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            Defense
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[2].base_stat}
            sx={{ width: "100px" }}
          />

          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            Special Attack
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[3].base_stat}
            sx={{ width: "100px" }}
          />

          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            Special Defense
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[4].base_stat}
            sx={{ width: "100px" }}
          />

          <Typography variant="body2" sx={{ justifySelf: "end" }}>
            Speed
          </Typography>
          <LinearProgress
            variant="determinate"
            value={pokemon.stats[5].base_stat}
            sx={{ width: "100px" }}
          />
        </div>
      </Card>
      <Card className="details-card">
        <Typography variant="h3" component="h3" sx={{ paddingBottom: "20px" }}>
          Abilities
        </Typography>
        <div className="details-abilities-body">
          {pokemon.abilities.map((ability) => (
            <Typography variant="body2" sx={{ justifySelf: "center"}}>
              {Helpers.capitalizeFirstLetter(ability.ability.name)}
            </Typography>
          ))}
        </div>
      </Card>

      <Card className="details-card">
        <Typography variant="h3" component="h3" sx={{ paddingBottom: "20px" }}>
          Moves
        </Typography>
        <div className="details-moves-body">
          {pokemon.moves.map((move) => (
            <Typography variant="body2" sx={{ justifySelf: "center" }}>
              {Helpers.capitalizeFirstLetter(move.move.name)}
            </Typography>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default PokemonDetails;

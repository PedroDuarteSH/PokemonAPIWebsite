import React, { useState, useEffect } from "react";
import PokemonAPI from "./PokemonAPI";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Helpers from "../Helpers";
import { useNavigate, Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (pokemon !== null) {
      PokemonAPI.fetchUrl(pokemon.url)
        .then((result) => {
          setPokemonData(result);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [pokemon]);

  if (loading) return <div>Loading...</div>;

  return (
    <Card
      sx={{  borderRadius: 10 }}
      onClick={() => navigate("/pokemon/", { state: { pokemonData } })}
    >
      <CardMedia
        component="img"
        alt={pokemonData.name}
        
        image={pokemonData.sprites.front_default}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Helpers.capitalizeFirstLetter(pokemonData.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {pokemonData.height}
          <br />
          Weight: {pokemonData.weight}
          <br />
          Base Experience: {pokemonData.base_experience}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center", border: '1px solid #e0e0e0', borderRadius: '5px' }}>
        <Button size="large" centerRipple>
          <Link
            to="/pokemon"
            style={{ color: "inherit"}}
            state={{ pokemonData }}
          >
            See More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default PokemonCard;

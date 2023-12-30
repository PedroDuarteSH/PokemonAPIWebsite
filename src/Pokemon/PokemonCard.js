import React, { useState, useEffect } from "react";
import PokemonAPI from "./PokemonAPI";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Helpers from "../Helpers";
import { useNavigate, Link } from "react-router-dom";
function PokemonCard({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
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
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt={pokemonData.name}
        image={pokemonData.sprites.other["official-artwork"].front_default}
        sx={{ objectFit: "cover" }}
      />
      <CardContent component="div">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {Helpers.capitalizeFirstLetter(pokemonData.name)}
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          {pokemonData.types.map((type) => {
            return (
              <img
                height={"20px"}
                style={{ padding: "10px" }}
                src={
                  "https://www.serebii.net/pokedex-bw/type/" +
                  type.type.name +
                  ".gif"
                }
                alt={
                  "https://www.serebii.net/pokedex-bw/type/" +
                  type.type.name +
                  ".gif"
                }
              />
            );
          })}
        </Box>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid #e0e0e0",
          width: "100%",
          padding: 0
        }}
      >
        <Button centerRipple sx={{ width: "100%", height: "100%", padding: "10px" }} onClick={() => navigate("/pokemon", { state: { pokemonData } })}>
          
            See More
          
        </Button>
      </CardActions>
    </Card>
  );
}

export default PokemonCard;

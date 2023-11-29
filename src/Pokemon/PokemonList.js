import React, { useState, useEffect } from "react";
import PokemonAPI from "./PokemonAPI";
import "./PokemonList.css";
import PokemonCard from "./PokemonCard";
import Helpers from "../Helpers";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Icon,
  InputAdornment,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

function PokemonList() {
  const [types, setTypes] = useState(null);
  const [limit] = useState(20);

  const [numPages, setNumPages] = useState(null);

  const [renderPokemonList, setRenderPokemonList] = useState(null);
  const [tempList, setTempList] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState(null);

  useEffect(() => {
    getPokemonTypesList();
    getAllPokemons();
  }, []);

  function getPokemonTypesList() {
    PokemonAPI.getTypesList().then((result) => {
      setTypes(result);
    });
  }

  function getPokemonsByType() {
    PokemonAPI.getPokemonsByType(type).then((result) => {
      setNumPages(Math.ceil(result.numPokemons / limit));
      setRenderPokemonList(result.pokemons);
      setTempList(result.pokemons);
      setData(result.pokemons.slice(0, limit));
      setLoading(false);
    });
  }

  function getAllPokemons() {
    PokemonAPI.getPokemons(0, 1).then((result) => {
      PokemonAPI.getPokemons(result.numPokemons, 1).then((result) => {
        setNumPages(Math.ceil(result.numPokemons / limit));
        setRenderPokemonList(result.pokemons);
        setTempList(result.pokemons);
        setData(result.pokemons.slice(0, limit));
        setLoading(false);
      });
    });
  }

  function getData() {
    if (type === null) {
      getAllPokemons();
    } else {
      getPokemonsByType();
    }
  }

  useEffect(() => {
    console.log("HERE");
    if (renderPokemonList) {
      const offset = (currentPage - 1) * limit;
      setData(renderPokemonList.slice(offset, offset + limit));
    } else {
      getData();
    }
  }, [currentPage, renderPokemonList]);

  useEffect(() => {
    setRenderPokemonList(null);
    setCurrentPage(1);
  }, [type]);

  const fetchMoreData = (page) => {
    setCurrentPage(page);
  };

  const filterByType = (type) => {
    setType(type);
    setCurrentPage(1);
  };

  const filterByName = (name) => {
    var filteredList = tempList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(name.toLowerCase());
    });
    console.log(filteredList.length);
    setNumPages(Math.ceil(filteredList.length / limit));
    setCurrentPage(1);
    setRenderPokemonList(filteredList);
    console.log(name);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="list">
      <Card className="header" sx={{ borderRadius: 10 }}>
        <Typography variant="h2" component="div" paddingLeft={"30px"}>
          Pokemon List
        </Typography>

        <div className="list-header-filter">
          <FormControl style={{ width: "50%" }} size="small">
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label="Type"
              displayEmpty={true}
              onChange={(event) => filterByType(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon />
                </InputAdornment>
              }
            >
              <MenuItem key={-1} value={null} selected={type === null}>
                {"All"}
              </MenuItem>

              {types &&
                types.map((type, index) => {
                  return (
                    <MenuItem key={index} value={type.url}>
                      {Helpers.capitalizeFirstLetter(type.name)}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(event) => filterByName(event.target.value)}
            style={{ width: "50%" }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Card>

      <div className="list-content">
        {data &&
          data.map((pokemon, index) => {
            return <PokemonCard key={index} pokemon={pokemon} />;
          })}
      </div>
      <div className="list-pagination">
        <Pagination
          count={numPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          size="large"
          onChange={(event, page) => fetchMoreData(page)}
        />
      </div>
    </div>
  );
}

export default PokemonList;

import React, { useState, useEffect } from "react";
import PokemonAPI from "./PokemonAPI";
import "./PokemonList.css";
import PokemonCard from "./PokemonCard";
import Helpers from "../Helpers";

import {
  Autocomplete,
  TextField,
  InputAdornment,
  Card,
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
      <Card className="list-header">
        <Typography variant="h2" component="div" sx={{ paddingLeft: "10px" }}>
          Pokemon List
        </Typography>

        <div className="list-header-filter">
          <Autocomplete
            sx={{ width: "50%", maxWidth: "20rem", paddingRight: "10px" }}
            options={types}
            getOptionLabel={(option) =>
              Helpers.capitalizeFirstLetter(option.name)
            }
            onChange={(event, newValue) =>
              filterByType(newValue ? newValue.url : null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <TextField
            label="Search"
            variant="outlined"
            onChange={(event) => filterByName(event.target.value)}
            sx={{ width: "50%", maxWidth: "20rem", }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
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

      {data.length !== 0 ? (
        numPages > 1 ? (
          <Card className="list-pagination">
            <Pagination
              count={numPages}
              page={currentPage}
              variant="outlined"
              color="primary"
              size="large"
              onChange={(_event, page) => fetchMoreData(page)}
            />
          </Card>
        ) : null
      ) : (
        <Typography variant="h2" component="div" sx={{ padding: "20px" }}>
          No Pokemons Found
        </Typography>
      )}
    </div>
  );
}

export default PokemonList;

const BASE_URL = "https://pokeapi.co/api/v2";
const PokemonAPI = {
  fetchUrl: async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  },
  fetchData: async (endpoint, queryString = "", options = {}) => {
    const response = await fetch(
      `${BASE_URL}/${endpoint}${queryString}`,
      options
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  },
  getPokemons: async (limit, currentPage) => {
    try {
      const offset = (currentPage-1) * limit;
      const result = await PokemonAPI.fetchData(
        "pokemon",
        "?limit=" + limit + "&offset=" + offset
      );
      console.log(result);
      return { pokemons: result.results, numPokemons: result.count };
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  },
  getPokemonsByType: async (url) => {
    try {
      const result = await PokemonAPI.fetchUrl(url);
      var pokemonArray = result.pokemon;
      for (var i = 0; i < pokemonArray.length; i++) {
        pokemonArray[i] = pokemonArray[i].pokemon;
      }
      console.log(result);
      return { pokemons: pokemonArray, numPokemons: pokemonArray.length };
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  },
  getTypesList: async () => {
    try {
      const result = await PokemonAPI.fetchData("type");
      return result.results;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  },
};

export default PokemonAPI;

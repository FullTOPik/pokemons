import { IAbilities, IPokemon } from './pokemonsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IResponcePokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface IQuery {
  rowsPerPage: number;
  page: number;
}

export interface IPokemonEvolution {
  chain: {
    species: { name: string };
    evolves_to: [
      {
        species: { name: string };
        evolves_to: [{ species: { name: string } }];
      },
    ];
  };
}

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchAll',
  async (query: IQuery, thunkApi) => {
    try {
      const pokemonsList = await axios.get<IResponcePokemons>(
        `https://pokeapi.co/api/v2/pokemon?limit=${query.rowsPerPage}&offset=${
          query.rowsPerPage * query.page
        }`,
      );

      const promiseArray = pokemonsList.data.results.map(pokemon =>
        axios.get<IPokemon>(pokemon.url),
      );

      const responses = await Promise.all(promiseArray);

      const pokemons = responses.map(response => response.data);

      return {
        pokemons,
        count: pokemonsList.data.count,
        next: pokemonsList.data.next,
        previous: pokemonsList.data.previous,
      };
    } catch (error) {
      return;
    }
  },
);

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetch',
  async (id: string, thunkApi) => {
    try {
      const pokemon = await axios.get<IPokemon>(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );

      const promisesAbility = pokemon.data.abilities.map(ability =>
        axios.get<{
          effect_entries: Array<{ effect: string; language: { name: string } }>;
        }>(ability.ability.url),
      );

      const pokemonAbilities = await Promise.all(promisesAbility);

      pokemonAbilities.forEach((ability, index) => {
        pokemon.data.abilities[index].ability.detail = ability.data;
      });

      return pokemon.data;
    } catch (error) {
      return;
    }
  },
);

export const fetchPokemonEvolutions = createAsyncThunk(
  'pokemonEvolution/fetch',
  async (url: string, thunkApi) => {
    try {
      const pokeSpecies = await axios.get<{ evolution_chain: { url: string } }>(
        url,
      );

      const pokemonEvolution = await axios.get<IPokemonEvolution>(
        pokeSpecies.data.evolution_chain.url,
      );

      let pokemonEvolutionList: Array<IPokemon> = [];

      const firstPokemon = await axios.get<IPokemon>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonEvolution.data.chain.species.name}`,
      );

      pokemonEvolutionList.push(firstPokemon.data);

      for (
        let index = 0;
        index < pokemonEvolution.data.chain.evolves_to.length;
        index++
      ) {
        const response = await axios.get<IPokemon>(
          `https://pokeapi.co/api/v2/pokemon/${pokemonEvolution.data.chain.evolves_to[index].species.name}`,
        );

        pokemonEvolutionList.push(response.data);

        for (
          let j = 0;
          j < pokemonEvolution.data.chain.evolves_to[index].evolves_to.length;
          j++
        ) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonEvolution.data.chain.evolves_to[index].evolves_to[j].species.name}`,
          );

          pokemonEvolutionList.push(response.data);
        }
      }

      return pokemonEvolutionList;
    } catch (error) {
      console.log(error);
      return;
    }
  },
);

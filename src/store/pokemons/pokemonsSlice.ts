import {
  fetchPokemon,
  fetchPokemonEvolutions,
  fetchPokemons,
} from './actionCreators';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStats {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IAbilities {
  ability: {
    name?: string;
    url: string;

    detail: {
      effect_entries?: Array<{ effect: string; language: { name: string } }>;
    };
  };
}

export interface IPokemon {
  id: string;
  abilities: Array<IAbilities>;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      home: { front_default: string; front_shiny: string };
      dream_world: { front_default: string };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
  stats: Array<IStats>;
  evolutions: { isLoading: boolean; evolutionList: IPokemon[] | null };
  weight: number;
  height: number;
  species: {
    url: string;
  };
}

interface IPokemonsState {
  pokemons: {
    count: number;
    next: string;
    previous: string;
    pokemons: IPokemon[] | [];
    loading: boolean;
  };
  currentPokemon: {
    pokemon: IPokemon;
    isLoading: boolean;
  };
}

const initialState: IPokemonsState = {
  pokemons: {
    count: 0,
    next: '',
    previous: '',
    pokemons: [],
    loading: false,
  },
  currentPokemon: {
    pokemon: {
      id: '',
      abilities: [],
      name: '',
      sprites: {
        front_default: '',
        back_default: '',
        back_shiny: '',
        front_shiny: '',
        other: {
          home: { front_default: '', front_shiny: '' },
          dream_world: { front_default: '' },
        },
      },
      types: [
        {
          type: {
            name: '',
          },
        },
      ],
      stats: [],
      weight: 0,
      height: 0,
      species: {
        url: '',
      },
      evolutions: { isLoading: false, evolutionList: null },
    },

    isLoading: false,
  },
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemons.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.pokemons.loading = false;
      state.pokemons.count = action.payload.count;
      state.pokemons.pokemons = action.payload.pokemons;
    },
    [fetchPokemons.pending.type]: state => {
      state.pokemons.loading = true;
    },
    [fetchPokemons.rejected.type]: state => {
      state.pokemons.loading = false;
    },

    [fetchPokemon.fulfilled.type]: (state, action: PayloadAction<IPokemon>) => {
      state.currentPokemon.isLoading = false;
      state.currentPokemon.pokemon = {
        ...action.payload,
        evolutions: { isLoading: false, evolutionList: null },
      };
    },
    [fetchPokemon.pending.type]: state => {
      state.currentPokemon.pokemon = {} as IPokemon;
      state.currentPokemon.isLoading = true;
    },
    [fetchPokemon.rejected.type]: state => {
      state.currentPokemon.isLoading = false;
    },

    [fetchPokemonEvolutions.pending.type]: state => {
      state.currentPokemon.pokemon.evolutions.evolutionList = null;
      state.currentPokemon.pokemon.evolutions.isLoading = true;
    },
    [fetchPokemonEvolutions.fulfilled.type]: (
      state,
      action: PayloadAction<IPokemon[]>,
    ) => {
      state.currentPokemon.pokemon.evolutions.evolutionList = action.payload;
      state.currentPokemon.pokemon.evolutions.isLoading = false;
    },
    [fetchPokemonEvolutions.rejected.type]: state => {
      state.currentPokemon.pokemon.evolutions.evolutionList = null;
      state.currentPokemon.pokemon.evolutions.isLoading = false;
    },
  },
});

export default pokemonsSlice.reducer;

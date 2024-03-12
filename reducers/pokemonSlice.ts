// features/pokemonSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

interface Pokemon {
  id: number;
  name: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPokemonsSuccess(state, action: PayloadAction<Pokemon[]>) {
      state.loading = false;
      state.pokemons = action.payload;
    },
    fetchPokemonsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPokemonsStart, fetchPokemonsSuccess, fetchPokemonsFailure } = pokemonSlice.actions;

export const fetchPokemons = (): AppThunk => async (dispatch) => {
  dispatch(fetchPokemonsStart());
  try {
    // Simulate API call
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    const pokemons = data.results.map((pokemon: { name: string }, index: number) => ({
      id: index + 1,
      name: pokemon.name,
    }));
    dispatch(fetchPokemonsSuccess(pokemons));
  } catch (error:any) {
    dispatch(fetchPokemonsFailure(error.message));
  }
};

export default pokemonSlice.reducer;

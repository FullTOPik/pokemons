import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './game/gameSlice';
import pokemonsReducer from './pokemons/pokemonsSlice';

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    game: gameSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

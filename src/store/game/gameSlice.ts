import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFromLocale, saveInLocal } from '../../helper';

const NAME_FOR_LOCAL = 'game';

const initialState: { countGuessed: Array<Number> } = {
  countGuessed: getFromLocale(NAME_FOR_LOCAL) ?? [],
};

const gameSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    addGuessed: (state, action: PayloadAction<number>) => {
      state.countGuessed = [...state.countGuessed, action.payload];
      saveInLocal(NAME_FOR_LOCAL, [...state.countGuessed, action.payload]);
    },

    deleteGuessed: (state, action: PayloadAction<number>) => {
      state.countGuessed = state.countGuessed.filter(
        guessed => guessed === action.payload,
      );
      saveInLocal(
        NAME_FOR_LOCAL,
        state.countGuessed.filter(guessed => guessed === action.payload),
      );
    },

    clearAllGuessed: state => {
      state.countGuessed = [];
      saveInLocal(NAME_FOR_LOCAL, []);
    },
  },
});

export const { addGuessed, deleteGuessed, clearAllGuessed } = gameSlice.actions;

export default gameSlice.reducer;

// store.ts

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    // Include the lazy-loaded slice in your store
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;

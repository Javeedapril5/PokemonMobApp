// reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of objects {pokemon: {...}, quantity: number}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { pokemon, quantity } = action.payload;
      const existingItem = state.items.find(item => item.pokemon.name === pokemon.name);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ pokemon, quantity });
      }
    },
    removeFromCart(state, action) {
      const { pokemonName } = action.payload;
      state.items = state.items.filter(item => item.pokemon.name !== pokemonName);
    },
    adjustQuantity(state, action) {
      const { pokemonName, quantity } = action.payload;
      const item = state.items.find(item => item.pokemon.name === pokemonName);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

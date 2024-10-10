import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Initial state as empty array
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        // Increment quantity if already in cart
        existingProduct.quantity += action.payload.quantity;
      } else {
        // Add new product with specified quantity
        state.push({ ...action.payload });
      }
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const existingProduct = state.find(item => item.id === id);
      if (existingProduct) {
        if (quantity <= 0) {
          // Remove product if quantity is zero or negative
          state.splice(state.indexOf(existingProduct), 1);
        } else {
          existingProduct.quantity = quantity; // Update quantity
        }
      }
    },
    removeFromCart(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        const removedItem = state[index];
        const updatedItem = { ...removedItem, quantity: 0 }; // Set quantity to zero
        state.splice(index, 1); // Remove product from the cart
        state.push(updatedItem); // Push updated item with zero quantity
      }
    },
    clearCart(state) {
      state.length = 0; // Clear the cart
    },

    // New action for handling 404 or other errors
    fetchCartError(state, action) {
      state.error = action.payload; // Set error message
    },
    clearCartError(state) {
      state.error = null; // Clear error message
    },
  },
});

// Export actions and reducer
export const { addToCart, updateCartItem, removeFromCart, clearCart  , fetchCartError ,clearCartError} = cartSlice.actions;
export default cartSlice.reducer;

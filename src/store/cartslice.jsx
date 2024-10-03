import { createSlice } from '@reduxjs/toolkit';

// Utility function to get initial cart state from local storage
const getInitialCartState = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialCartState(), // Initialize from local storage
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        // Increment quantity if already in cart
        existingProduct.quantity += 1; 
      } else {
        // If the product was previously removed, add it back with quantity 1
        state.push({ ...action.payload, quantity: 1 }); // Start with quantity of 1
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Update local storage
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
      localStorage.setItem('cart', JSON.stringify(state)); // Update local storage
    },
    removeFromCart(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        // Set quantity to zero in local storage instead of removing
        const removedItem = state[index];
        const updatedItem = { ...removedItem, quantity: 0 }; // Set quantity to zero
        state.splice(index, 1); // Remove product from the cart
        state.push(updatedItem); // Push updated item with zero quantity
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Update local storage
    },
    clearCart(state) {
      state.length = 0; // Clear the cart
      localStorage.removeItem('cart'); // Remove from local storage
    },
  },
});

// Export actions and reducer
export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

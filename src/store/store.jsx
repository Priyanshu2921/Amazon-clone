import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartslice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist the cart slice
};

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if necessary
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

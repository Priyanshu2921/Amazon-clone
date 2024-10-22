import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartslice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import of thunk

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

// Configure store with thunk middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionPaths: ['register', 'rehydrate'],
        ignoredPaths: ['_persist'],
      },
    }).concat(thunk), // Adding thunk as a function directly
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
